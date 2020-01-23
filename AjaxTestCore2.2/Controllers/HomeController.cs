using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AjaxTestCore2._2.Models;

namespace AjaxTestCore2._2.Controllers
{
    public class HomeController : Controller
    {
        private Context _context;
        public HomeController(Context context)
        {
            _context =  context;
        }
        public ActionResult getUser()
        {
            //DatabaseEntities db = new DatabaseEntities();
            return Json(_context.Students.Select(x => new
            {
                Id = x.Id,
                Name = x.Name
            }).ToList());
        }
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(_context.Students.ToList());
        }
        public JsonResult Add(Student user)
        {
            _context.Students.Add(user);
            _context.SaveChanges();
            return Json(user);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(_context.Students.FirstOrDefault(x => x.Id == ID));
        }
        public JsonResult Update(Student user)
        {
            var data = _context.Students.FirstOrDefault(x => x.Id == user.Id);
            if (data != null)
            {
                data.Name = user.Name;
               
                _context.SaveChanges();
            }
            return Json(user);
        }
        public JsonResult Delete(int ID)
        {
            var data = _context.Students.FirstOrDefault(x => x.Id == ID);
            _context.Students.Remove(data);
            _context.SaveChanges();
            return Json(data);
        }
    }
}
