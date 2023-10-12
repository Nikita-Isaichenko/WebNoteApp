using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Newtonsoft.Json.Bson;
using WebNoteApp.Models;
using WebNoteApp.Models.Enums;

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
        /// <param name="category">Категория записок.</param>
        /// <returns>Список записок определенной категории.</returns>
        public List<Note> ReadNotes(string category)
        {
            if (category == NotesCategory.All.ToString())
            {
                return _db.Notes.OrderByDescending(c => c.Modified).ToList();
            }
            else
            {
                return _db.Notes
                    .OrderByDescending(c => c.Modified)
                    .Where(a => a.Category == category)             
                    .ToList();
            }
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

        /// <summary>
        /// Изменяет и сохраняет запись в базу данных.
        /// </summary>
        /// <param name="note">Редактируемая запись.</param>
        /// <returns>Отредактированную запись</returns>
        public async Task<Note> UpdateNote(Note note)
        {
            var noteBuffer = _db.Notes.Find(note.Id);

            noteBuffer.Title = note.Title;
            noteBuffer.Description = note.Description;
            noteBuffer.Category = note.Category;
            noteBuffer.Modified = DateTime.Now;

            await _db.SaveChangesAsync();

            return _db.Notes.Find(note.Id);
        }

        /// <summary>
        /// Удаляет запись из базы данных.
        /// </summary>
        /// <param name="id">Id удаляемой записи.</param>
        public async Task DeleteNote(int id)
        {
            _db.Notes.Remove(ReadNote(id));
            await _db.SaveChangesAsync();
        }
    }
}
