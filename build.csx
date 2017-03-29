//Ahead-of-time compiler + Tree Shaking
string aot = "\"" + Path.Combine(Directory.GetCurrentDirectory(),"node_modules\\.bin\\ngc") + "\" -p tsconfig-aot.json";
var process = Process.Start(@"cmd", @"/k " + aot);
process.WaitForExit();

//2nd Pass
process = Process.Start(@"cmd", @"/k " + aot);
process.WaitForExit();

//Rollup, Bundling, uglyfy und minify
string rollupBundle = "\"" + Path.Combine(Directory.GetCurrentDirectory(), "node_modules\\.bin\\rollup") + "\" -c rollup-config.js";
var process2 = Process.Start(@"cmd", @"/k " + rollupBundle);
process2.WaitForExit();

//Aufräumen, sonst will VS diese auch kompilieren
if (System.IO.Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "aot")))
{
    Directory.Delete("aot", true);
}

//Version anpassen
var path = Path.Combine(Directory.GetCurrentDirectory(), "Views\\Home\\Index.cshtml");
if (System.IO.File.Exists(path))
{
    var content = System.IO.File.ReadAllText(path);
    var startV = content.IndexOf("app-version=\"") + "app-version=\"".Length;
    var endV = content.IndexOf("\"", startV + 1);
    var version = content.Substring(startV, endV - startV);
    var lastDot = version.LastIndexOf('.');
    var newVersion = version.Substring(0, lastDot) + "." + (int.Parse(version.Substring(lastDot + 1, version.Length - lastDot - 1)) + 1);

    var startB = content.IndexOf("app-build=\"") + "app-build=\"".Length;
    var endB = content.IndexOf("\"", startB + 1);
    var build = content.Substring(startB, endB - startB);

    content = content.Replace(version, newVersion);
    content = content.Replace(build, DateTime.Now.ToString());
    System.IO.File.WriteAllText(path, content);
    Console.WriteLine("Aktuelle Version:" + newVersion);
}