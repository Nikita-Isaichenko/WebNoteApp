using Microsoft.EntityFrameworkCore.Infrastructure;
using WebNoteApp.Models;

namespace WebNoteApp.DataBase
{
    /// <summary>
    /// Хранит четыре основные операции над сущностью.
    /// </summary>
    public class CRUD
    {
        /// <summary>
        /// Экземпляр контекста данных для базы данных.
        /// </summary>
        private readonly AppDbContext _db;

        /// <summary>
        /// Инициализирует экземпляр класса <see cref="CRUD"/>.
        /// </summary>
        /// <param name="db">Экземпляр контекста данных для базы данных.</param>
        public CRUD(AppDbContext db) 
        {
            _db = db;

            Console.WriteLine("Конструктор CRUD");
        }

        /// <summary>
        /// Создает и добавляет новую записку в базу данных.
        /// </summary>
        /// <param name="note">Записка для добавления в базу данных.</param>
        public async Task CreateAsync(Note note)
        {
            note.Created = DateTime.Now;
            note.Modified = DateTime.Now;

            _db.Notes.Add(note);
            await _db.SaveChangesAsync();
        }

        /// <summary>
        /// Возвращает все записки из базы данных
        /// </summary>
        /// <returns></returns>
        public List<Note> ReadNotes()
        {
            return _db.Notes.ToList();
        }

        /// <summary>
        /// Возвращает запись по id.
        /// </summary>
        /// <param name="id">id искомой записи.</param>
        /// <returns>Запись.</returns>
        public Note ReadNote(int id)
        {
            return _db.Notes.FirstOrDefault(x => x.Id == id);
        }
    }
}
