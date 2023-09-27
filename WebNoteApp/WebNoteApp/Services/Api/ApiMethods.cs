using WebNoteApp.Models;

namespace WebNoteApp.Services.Api
{
    public class ApiMethods
    {
        private List<Note> notes = new List<Note>();

        public void CreateUser(Note note)
        {
            try
            {
                notes.Add(note);

                Console.WriteLine(notes.Count);

                Serializer.SaveToFile(notes);

                Console.WriteLine("Сериализация прошла успешно");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public List<Note> GetNotes()
        {
            notes = Serializer.LoadFromFile();

            return notes;
        }
    }
}
