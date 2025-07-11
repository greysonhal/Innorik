// Models/Book.cs
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreApi.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; }= string.Empty;

        [Column(TypeName="decimal(18,2)")]
        public decimal Price { get; set; }
        public string Description { get; set; }= string.Empty;
    }
}
