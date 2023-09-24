using WebNoteApp.Models;
using WebNoteApp.Services.Api;

namespace WebNoteApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var app = builder.Build();
            var notes = new List<Note>();

            app.UseDefaultFiles();
            app.UseStaticFiles();

                 

            app.Run(async (context) =>
            {
                var response = context.Response;
                var request = context.Request;
                var path = request.Path;

                if (path == "/note" && request.Method == "GET")
                {
                    await response.WriteAsJsonAsync(notes);
                }
                else if (path == "/note" && request.Method == "POST")
                {
                    

                   ApiMethods.CreateUserAsync(response, request, notes);
                   /* try
                    {
                        var json = await request.ReadFromJsonAsync<Note>();
                        Console.WriteLine(json.Title + " : " + json.Description + " : " + json.Created);
                    }
                    catch (Exception ex)
                    {
                        response.StatusCode = 500;
                        await response.WriteAsJsonAsync(new {message = $"{ex.Message}"});
                    }  */
                }
            });

            app.Run();
        }
    }
}