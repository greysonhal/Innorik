// Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using BookstoreApi.Models;


namespace BookstoreApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions)
            : base(dbContextOptions)
        { }

        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
