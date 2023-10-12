using WebNoteApp.DataBase;
using Microsoft.EntityFrameworkCore;

namespace WebNoteApp
{
    /// <summary>
    /// ������ ���������� � ���������.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// ����� ����� � ����������.
        /// </summary>
        /// <param name="args">��������� �� �������.</param>
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();

            builder.Services.AddDbContext<AppDbContext>(options 
                => options.UseSqlite("Data Source = Notes.db")
                );

            builder.Services.AddScoped<CRUD>();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=index}/{id?}"
                );

            app.Run();
        }
    }
}