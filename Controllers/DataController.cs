using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using CommicDB.DB;
using CommicDB.DB.Models;
using CommicDB.Utility;
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
        public List<string> GetTags()
        {
            return this._comicDB.Tags.Select(t => t.Name).ToList();
        }

        [HttpGet]
        public List<User> GetUsers()
        {
            return this._comicDB.Users.ToList();
        }

        [HttpGet]
        public User GetUserByName(string userName)
        {
            return this._comicDB.Users.Include(u => u.Lists).FirstOrDefault(u => u.Username == userName);
        }

        [HttpGet]
        public List GetListById(int id)
        {
            return this._comicDB.Lists
                .Include(l => l.User).Include(l => l.Tags).Include(l=> l.SubLists).Include(l => l.Parent).Include(l => l.Comics).ThenInclude(c => c.Comic)
                .FirstOrDefault(l => l.Id == id);
        }

        [HttpGet]
        public Comic GetComicById(int id)
        {
            return this._comicDB.Comics.Include(c => c.Lists).ThenInclude(c => c.List).Include(c=> c.Tags).FirstOrDefault(c => c.Id == id);
        }

        #endregion

        #region Add

        [HttpPost]
        public User AddUser([FromBody]User newUser)
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
        public List AddList([FromBody]List newList)
        {
            try
            {
                this.TryUpdate<List>(newList);
                return this.GetListById(newList.Id);
            }
            catch (Exception ex)
            {
                return ClientException<List>.Show(ex, this.Response, newList);
            }
        }

        [HttpPost]
        public Comic AddComic([FromBody]Comic newComic)
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
    }
}
