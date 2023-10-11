using Microsoft.AspNetCore.Mvc;
using WebNoteApp.DataBase;
using WebNoteApp.Models;
using WebNoteApp.Models.Enums;

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
        public IActionResult Index()
        {
            ViewBag.NotesCategoryList = Enum.GetValues(typeof(NotesCategory));

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
            if (ModelState.IsValid)
            {
                await _crud.CreateAsync(note);

                return Ok("Заметка создана");
            }
            else
            {
                return BadRequest(note);
            }
            
        }

        /// <summary>
        /// Обрабатывает GET-запросы.
        /// Возвращает запись по ее id.
        /// </summary>
        /// <param name="id">id записи.</param>
        /// <returns>Запись в формате json.</returns>
        [HttpGet]
        public IActionResult GetNote(int id)
        {
            var note = _crud.ReadNote(id);

            if (note != null)
            {
                return Ok(note);
            }

            return Json(new { message = "Запись не найдена." });
        }

        /// <summary>
        /// Обрабатывает GET-запросы.
        /// Возвращает список записок в формате json.
        /// </summary>
        /// <param name="category">категория записи.</param>
        /// <returns>Список записок определенной категории в формате json.</returns>
        [HttpGet]
        public IActionResult GetNotes(string category)
        {
            var notes = _crud.ReadNotes(category);

            if (notes != null)
            {
                return Ok(notes);
            }

            return Json(new { message = "Записи не найдены." });
        }

        /// <summary>
        /// Обрабатывает POST-запросы.
        /// Возвращает измененную запись.
        /// </summary>
        /// <param name="note">Запись с новыми данными.</param>
        /// <returns>Измененная запись.</returns>
        [HttpPut]
        public IActionResult UpdateNote([FromBody] Note note)
        {
            var modifiedNote = _crud.UpdateNote(note);

            if (modifiedNote != null)
            {
                return Ok(modifiedNote);
            }

            return Json(new { message = "Ошибка изменения." });
        }

        /// <summary>
        /// Обрабатывает DELETE-запросы.
        /// Удаляет запись по id.
        /// </summary>
        /// <param name="id">id удаляемой записи.</param>
        /// <returns>Ответ сервера 200.</returns>
        [HttpDelete]
        public IActionResult DeleteNote(int id)
        {
            _crud.DeleteNote(id);

            return Ok();
        }
    }
}
