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
        public IEnumerable<Book> GetBooks() => _bookContext.Books.ToList();
    }
}