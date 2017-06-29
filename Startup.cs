using System;
using System.IO;
using System.Linq;
using CommicDB.Controllers;
using CommicDB.DB;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using System.Threading;
using System.Threading.Tasks;

namespace CommicDB
{
    public class Startup
    {
        /// <summary>
        /// Scant einmal am Tag nach neuen Ausgabe
        /// </summary>
        public static Timer DataTimer { get; private set; }

        /// <summary>
        /// API Daten
        /// </summary>
        public static string APIKEY = "f65041c032be86da24e07882e341c3c2363bed7a";
        public static string FULLAPIKEY = "?api_key=" + APIKEY;

        public Startup(IHostingEnvironment env)
        {
            env.EnvironmentName = "Development";
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            }); ;
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.Providers.Add<BrotliCompressionProvider>();
            });

            var connString = Configuration.GetConnectionString("DefaultConnection")
                .Replace("D:\\Visual Studio\\ComicDB\\CommicDB\\CommicDB.mdf", Path.Combine(Directory.GetCurrentDirectory(), "CommicDB.mdf"));
            services.AddDbContext<ComicDBContext>(options => options.UseSqlServer(connString));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, ComicDBContext comicDB)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseResponseCompression();
            comicDB.Database.Migrate();

            //CheckService
            var state = new object();
            Startup.DataTimer = new Timer((s) =>
            {
                CheckNewIssues(comicDB);
            }, state, 24 * 60 * 60 * 1000, 24 * 60 * 60 * 1000);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                // Für Debug caches deaktivieren
                app.UseStaticFiles(new StaticFileOptions()
                {
                    OnPrepareResponse = context =>
                    {
                        context.Context.Response.Headers.Add("Cache-Control", "no-cache, no-store");
                        context.Context.Response.Headers.Add("Expires", "-1");
                    }
                });

                // node_modules verfügbar machen
                app.UseStaticFiles(new StaticFileOptions()
                {
                    FileProvider = new PhysicalFileProvider(
                        Path.Combine(Directory.GetCurrentDirectory(), @"node_modules")),
                    RequestPath = new PathString("/node_modules"),
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");

                // Live mit richtigen Caches
                app.UseStaticFiles(new StaticFileOptions()
                {
                    OnPrepareResponse = context =>
                    {
                        if (!StringValues.IsNullOrEmpty(context.Context.Response.Headers[HeaderNames.AcceptEncoding]))
                            context.Context.Response.Headers.Append(HeaderNames.Vary, HeaderNames.AcceptEncoding);

                        context.Context.Response.Headers.Add("Cache-Control", "public,max-age=" + 60 * 60 * 24);
                    }
                });

                // Dist verfügbar machen
                app.UseStaticFiles(new StaticFileOptions()
                {
                    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"dist")),
                    RequestPath = new PathString("/dist"),
                    OnPrepareResponse = context =>
                    {
                        if (!StringValues.IsNullOrEmpty(context.Context.Response.Headers[HeaderNames.AcceptEncoding]))
                            context.Context.Response.Headers.Append(HeaderNames.Vary, HeaderNames.AcceptEncoding);

                        context.Context.Response.Headers.Add("Cache-Control", "public,max-age=" + 60 * 60 * 24);
                    }
                });
            }

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
                routes.MapRoute(
                    name: "angular",
                    template: "{action=Index}",
                    defaults: new { controller = "Home"});
            
            });
        }

        /// <summary>
        /// Sucht nach neuen Ausgaben
        /// Und löscht den Cache
        /// </summary>
        /// <returns></returns>
        private async void CheckNewIssues(ComicDBContext comicDB)
        {
            try
            {
                var checkData = comicDB.CheckData.ToList();
                var controller = new DataController(comicDB);

                foreach(var check in checkData)
                {
                    var volume = await controller.GetVolume(check.VolumeId);

                    if(check.LastCount != volume.IssueCount)
                    {
                        check.LastCount = volume.IssueCount;
                        check.HasNew = true;
                    }
                }

                comicDB.SaveChanges();

                //Cache aufräumen
                foreach(var file in Directory.GetFiles("Cache"))
                {
                    File.Delete(file);
                }
            }
            catch(Exception ex)
            {

            }            
        }
    }
}