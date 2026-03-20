using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Peck.API.Data;

namespace Mission11_Peck.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : Controller
    {
        private BookstoreDbContext _bookContext;
        
        public BookController(BookstoreDbContext temp) => _bookContext = temp; //returns what would normally be in braces

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageLength = 5, int pageNum = 1, string sortBy = "title")
        {
            var query = _bookContext.Books.AsQueryable();

            // Apply sorting
            if (sortBy == "title")
            {
                query = query.OrderBy(b => b.Title);
            }
            else if (sortBy == "title_desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }
            
           var something = query
               .Skip((pageNum - 1) * pageLength)
               .Take(pageLength)
               .ToList();

           var totalNumBooks = query.Count();

           var someObject = new
           {
               books = something,
               totalNumBooks = totalNumBooks
           };
           
           return Ok(someObject);
        } 
    }
}