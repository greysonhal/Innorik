using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookstoreApi.Data;
using BookstoreApi.Models;
using Microsoft.AspNetCore.Authorization;


namespace BookstoreApi.Controllers
{

         [Authorize]

    // Marks this class as an API controller
    [ApiController]

    // Sets the base route of this controller to: /api/books
    [Route("api/[controller]")] // [controller] becomes "books" from "BooksController"
    public class BooksController : ControllerBase
    {
        // Injecting the database context to interact with the database
        private readonly ApplicationDbContext _context;

        // Constructor - gives this controller access to the database
        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ======================================
        // GET: api/books
        // Purpose: Return a list of all books
        // Method: GET
        // ======================================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            // Asynchronously fetch all books from the database
            return await _context.Books.ToListAsync();
        }

        // ======================================
        // POST: api/books
        // Purpose: Add a new book to the database
        // Method: POST
        // ======================================
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            // Add the new book to the database context
            _context.Books.Add(book);

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return the newly created book with a 201 Created status
            return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, book);
        }

        // ======================================
        // PUT: api/books/{id}
        // Purpose: Update an existing book using its ID
        // Method: PUT
        // ======================================
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            // Ensure the route ID matches the book object's ID
            if (id != book.Id)
                return BadRequest(); // If not, return 400 Bad Request

            // Mark this entity as modified
            _context.Entry(book).State = EntityState.Modified;

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return 204 No Content to indicate success
            return NoContent();
        }

        // ======================================
        // DELETE: api/books/{id}
        // Purpose: Delete a book by ID
        // Method: DELETE
        // ======================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            // Find the book by ID
            var book = await _context.Books.FindAsync(id);

            // If not found, return 404 Not Found
            if (book == null)
                return NotFound();

            // Remove the book from the database
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            // Return 204 No Content to indicate successful deletion
            return NoContent();
        }
    }
}
