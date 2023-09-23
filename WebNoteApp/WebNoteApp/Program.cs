using WebNoteApp.Models;

namespace WebNoteApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            var notes = new List<Note>()
            { 
                new Note { Title="test title1", Description="test description"},
                new Note { Title = "test title2", Description="test descriprion2"}
            };

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
                    try
                    {
                        var json = await request.ReadFromJsonAsync<Note>();
                        Console.WriteLine(json.Title + " : " + json.Description + " : " + json.Created);
                    }
                    catch (Exception ex)
                    {
                        response.StatusCode = 500;
                        await response.WriteAsJsonAsync(new {message = $"{ex.Message}"});
                    }  
                }
            });

            app.Run();
        }
    }
}