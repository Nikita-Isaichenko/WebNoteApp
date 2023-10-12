using Microsoft.AspNetCore.Mvc;
using WebNoteApp.DataBase;
using WebNoteApp.Models;


namespace WebNoteApp.Controllers
{
    /// <summary>
    /// Хранит методы для обработки запросов к главной странице.
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// Объект класса <see cref="CRUD"/>.
        /// </summary>
        private readonly CRUD _crud;

        /// <summary>
        /// Инициализирует объект класса <see cref="HomeController"/>.
        /// </summary>
        /// <param name="crud">Объект класса <see cref="CRUD"/>.</param>
        public HomeController(CRUD crud)
        {
            _crud = crud;
        }

        /// <summary>
        /// Обрабатывает get-запросы.
        /// </summary>
        /// <returns>Возвращает представление для контроллера <see cref="HomeController"/>.</returns>
        [HttpGet]
        public  IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Обрабатывает post-запросы.
        /// Создает и сохраняет в базе данных объект класса <see cref="Note"/>.
        /// </summary>
        /// <param name="note">Объект класса <see cref="Note"/>.</param>
        /// <returns>Возвращает объекты дочерних классов для класса <see cref="ObjectResult"/></returns>
        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] Note note)
        {
            try
            {
                await _crud.CreateAsync(note);

                return Ok(new {message = "Заметка создана."});
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /*[HttpGet]
        public IActionResult GetNote(long id)
        {

        }

        [HttpGet]
        public IActionResult GetNotes()
        {

        }

        [HttpPut]
        public IActionResult UpdateNote(Note note)
        {

        }*/
    }
}
