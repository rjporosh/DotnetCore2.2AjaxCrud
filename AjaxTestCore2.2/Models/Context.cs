using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AjaxTestCore2._2.Models
{
    public class Context :DbContext
    {
        public Context(DbContextOptions<Context> option):base(option)
        {

        }
        public virtual DbSet<Student> Students { get; set; }
    }
}
