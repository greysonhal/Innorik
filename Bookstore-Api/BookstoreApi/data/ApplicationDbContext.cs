// Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using BookstoreApi.Models;


namespace BookstoreApi.Data
{
    public class ApplicationDbContext : DbContext //inherits DBcontext from EF Core
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions)  //Constructor 
            : base(dbContextOptions)
        { }

        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
