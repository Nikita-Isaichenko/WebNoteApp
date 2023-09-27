using Microsoft.AspNetCore.Mvc;
using WebNoteApp.Models;
using WebNoteApp.Services;
using WebNoteApp.Services.Api;

namespace WebNoteApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApiMethods _api;

        public HomeController(ApiMethods api)
        {
            _api = api;
            Console.WriteLine(_api);
        }

        [HttpGet]
        public  IActionResult Index()
        {
            var notes = _api.GetNotes();
            return View(notes);
        }

        [HttpPost]
        public IActionResult CreateNote([FromBody] Note note)
        {
            _api.CreateUser(note);

            return Ok(new {message = "User created"});
        }        
    }
}
