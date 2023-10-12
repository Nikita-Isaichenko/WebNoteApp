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
        /// Создает и добавляет новый экземпляр в базу данных.
        /// </summary>
        /// <param name="note">Экземпляр для добавления в базу данных.</param>
        public async Task CreateAsync(Note note)
        {          
            _db.Notes.Add(note);
            await _db.SaveChangesAsync();
        }
    }
}
