using WebNoteApp.Models;
using WebNoteApp.Services.Api;

namespace WebNoteApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            
            builder.Services.AddControllersWithViews();
            builder.Services.AddSingleton<ApiMethods>();          

            var app = builder.Build();           

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}"
                );


            app.Run();
        }
    }
}