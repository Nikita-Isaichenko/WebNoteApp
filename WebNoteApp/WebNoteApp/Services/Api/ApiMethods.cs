using WebNoteApp.Models;

namespace WebNoteApp.Services.Api
{
    public static class ApiMethods
    { 

        public static async void CreateUserAsync(
            HttpResponse response,
            HttpRequest request,
            List<Note> notes
            )
        {
            try
            {
                var note = await request.ReadFromJsonAsync<Note>();
                notes.Add(note);
                Console.WriteLine(note.Title);
                Serializer.SaveToFile(notes);
                Console.WriteLine("Сериализация прошла успешно");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
