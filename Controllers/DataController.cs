﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using System.Xml.Linq;
using CommicDB.DB;
using CommicDB.DB.Models;
using CommicDB.Utility;
using CommicDB.Utility.API;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CommicDB.Controllers
{
    public class DataController : Controller
    {
        private readonly ComicDBContext _comicDB;

        public DataController(ComicDBContext comicDB)
        {
            this._comicDB = comicDB;
        }

        [HttpGet]
        public String ExampleGet()
        {
            return "Get";
        }

        [HttpPost]
        public String ExamplePost()
        {
            return "Post";
        }

        #region Get

        [HttpGet]
        public List<Tag> GetAllTags()
        {
            return this._comicDB.Tags
                .Include(t => t.Comics).ThenInclude(c => c.Comic)
                .Include(t => t.Lists).ThenInclude(l => l.List)
                .ToList();
        }

        [HttpGet]
        public List<User> GetUsers()
        {
            return this._comicDB.Users
                .ToList();
        }

        [HttpGet]
        public User GetUserByName(string userName)
        {
            return this._comicDB.Users
                .Include(u => u.Lists).ThenInclude(l => l.SubLists)
                .FirstOrDefault(u => u.Username == userName);
        }

        [HttpGet]
        public List GetListWithDataById(int id)
        {
            return this._comicDB.Lists
                .Include(l => l.User)
                .Include(l => l.Tags).ThenInclude(t => t.Tag)
                .Include(l=> l.SubLists)
                .Include(l => l.Parent)
                .Include(l => l.Comics).ThenInclude(c => c.Comic).ThenInclude(l => l.Tags).ThenInclude(t => t.Tag)
                .FirstOrDefault(l => l.Id == id);
        }

        [HttpGet]
        public Comic GetComicById(int id)
        {
            return this._comicDB.Comics
                .Include(c => c.Lists).ThenInclude(c => c.List)
                .Include(c=> c.Tags)
                .FirstOrDefault(c => c.Id == id);
        }

        #endregion


        #region Add

        [HttpPost]
        public User AddOrUpdateUser([FromBody]User newUser)
        {
            try
            {
                this.TryUpdate<User>(newUser);                
                return this.GetUserByName(newUser.Username);
            }
            catch (Exception ex)
            {
                return ClientException<User>.Show(ex, this.Response, newUser);
            }
        }

        [HttpPost]
        public List AddOrUpdateList([FromBody]List newList)
        {
            try
            {
                this.TryUpdate<List>(newList);
                return this.GetListWithDataById(newList.Id);
            }
            catch (Exception ex)
            {
                return ClientException<List>.Show(ex, this.Response, newList);
            }
        }

        [HttpPost]
        public Comic AddOrUpdateComic([FromBody]Comic newComic)
        {
            try
            {
                this.TryUpdate<Comic>(newComic);                
                return this.GetComicById(newComic.Id);
            }
            catch (Exception ex)
            {
                return ClientException<Comic>.Show(ex, this.Response, newComic);
            }
        }

        [HttpPost]
        public bool AddTagToList([FromBody]TagListRelation rel)
        {
            try
            {
                this.TryUpdate<TagListRelation>(rel);
                return true;
            }
            catch (Exception ex)
            {
                return ClientException<bool>.Show(ex, this.Response, rel);
            }
        }

        [HttpPost]
        public bool AddTagToComic([FromBody]TagComicRelation rel)
        {
            try
            {
                this.TryUpdate<TagComicRelation>(rel);
                return true;
            }
            catch (Exception ex)
            {
                return ClientException<bool>.Show(ex, this.Response, rel);
            }
        }

        #endregion


        #region Remove

        [HttpGet]
        public bool RemoveComic(int id)
        {
            try
            {
                this._comicDB.Comics.Remove(this._comicDB.Comics.First(c => c.Id == id));
                this._comicDB.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return ClientException<bool>.Show(ex, this.Response, id);
            }
        }

        [HttpGet]
        public bool RemoveList(int id)
        {
            try
            {
                this._comicDB.Lists.Remove(this._comicDB.Lists.First(l => l.Id == id));
                this._comicDB.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return ClientException<bool>.Show(ex, this.Response, id);
            }
        }

        [HttpGet]
        public bool RemoveUser(string name)
        {
            try
            {
                this._comicDB.Users.Remove(this._comicDB.Users.First(u => u.Username == name));
                this._comicDB.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return ClientException<bool>.Show(ex, this.Response, name);
            }
        }

        [HttpPost]
        public bool RemoveTagFromList([FromBody]TagListRelation rel)
        {
            try
            {
                return this._comicDB.ListTags.Remove(rel) != null;
            }
            catch (Exception ex)
            {
                return ClientException<bool>.Show(ex, this.Response, rel);
            }
        }

        [HttpPost]
        public bool RemoveTagFromComic([FromBody]TagComicRelation rel)
        {
            try
            {
                return this._comicDB.ComicTags.Remove(rel) != null;
            }
            catch (Exception ex)
            {
                return ClientException<bool>.Show(ex, this.Response, rel);
            }
        }

        #endregion

        /// <summary>
        /// Ein generisches AddOrUpdate
        /// Warum? Weil's geht.
        /// </summary>
        /// <typeparam name="T">Der EntityType</typeparam>
        /// <param name="entity">Das Entity</param>
        public void TryUpdate<T>(T entity) where T : class
        {
            // Init
            var data = this._comicDB.GetType().GetProperties()
                .First(p => p.PropertyType.GenericTypeArguments.FirstOrDefault().Name.Equals(typeof(T).Name))
                .GetValue(this._comicDB) as DbSet<T>;
            var props = typeof(T).GetProperties();
            var keyAttr = props.FirstOrDefault(p => p.GetCustomAttribute<KeyAttribute>() != null);
            var key = keyAttr?.GetValue(entity);

            // Update
            T other;
            if ((other = data.FirstOrDefault(d => keyAttr.GetValue(d).Equals(key))) != null)
            {
                foreach(var prop in props.Where(p => p.GetCustomAttribute<NavigationPropertyAttribute>() == null))
                {
                    prop.SetValue(other, prop.GetValue(entity));
                }
                data.Update(other);
            }
            // Add
            else
            {
                keyAttr.SetValue(entity, null);
                foreach (var prop in props.Where(p => p.GetCustomAttribute<NavigationPropertyAttribute>() != null))
                {
                    prop.SetValue(entity, null);
                }
                data.Add(entity);
            }

            this._comicDB.SaveChanges();
        }

        /// <summary>
        /// Liefert die 10 besten Suchergebnisse zurück
        /// </summary>
        /// <param name="text">Suchtext</param>
        /// <returns></returns>
        public async Task<SearchResult> Search(string text)
        {
            var searchResult = new SearchResult();

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

                var query = "https://comicvine.gamespot.com/api/search/?api_key=" + Startup.APIKEY + "&query=" + text;
                var result = await client.GetAsync(query);
                var xml = await result.Content.ReadAsStringAsync();
                XDocument doc = XDocument.Parse(xml);
                searchResult.Issues = doc.Root.Element("results").Elements("issue").Select(e => new Issue(e)).ToList();
                searchResult.Volumes = doc.Root.Element("results").Elements("volume").Select(e => new Volume(e)).ToList();
            }

            return searchResult;
        }

        /// <summary>
        /// Liefert die 10 besten Suchergebnisse zurück
        /// </summary>
        /// <param name="text">Suchtext</param>
        /// <returns></returns>
        public async Task<Issue> GetIssue(int id)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

                var query = "https://comicvine.gamespot.com/api/issue/4000-" + id + "?api_key=" + Startup.APIKEY;
                var result = await client.GetAsync(query);
                var xml = await result.Content.ReadAsStringAsync();
                XDocument doc = XDocument.Parse(xml);
                return new Issue(doc.Root.Element("results"));
            }
        }

        /// <summary>
        /// Liefert die 10 besten Suchergebnisse zurück
        /// </summary>
        /// <param name="text">Suchtext</param>
        /// <returns></returns>
        public async Task<Volume> GetVolume(int id)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

                var query = "https://comicvine.gamespot.com/api/volume/4050-" + id + "?api_key=" + Startup.APIKEY;
                var result = await client.GetAsync(query);
                var xml = await result.Content.ReadAsStringAsync();
                XDocument doc = XDocument.Parse(xml);
                return new Volume(doc.Root.Element("results"));
            }
        }
    }
}
