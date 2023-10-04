using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using WebNoteApp.Models;

namespace WebNoteApp.DataBase
{
    /// <summary>
    /// Хранит контекст данных для базы данных.
    /// </summary>
    public class AppDbContext : DbContext
    {
        /// <summary>
        /// Инициализирует объект <see cref="AppDbContext"/>.
        /// </summary>
        /// <param name="options">Настройки для контекста данных.</param>
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

            var facade = new DatabaseFacade(this);

            facade.EnsureCreated();
        }

        /// <summary>
        /// Возвращает и задает список,
        /// представляющий объекты класса <see cref="Note"/>,
        /// которые хранятся в базе данных.
        /// </summary>
        public DbSet<Note> Notes { get; set; }
    }
}
