using Newtonsoft.Json;
using WebNoteApp.Models;
using static System.Environment;

namespace WebNoteApp.Services
{
    /// <summary>
    /// Предоставляет методы для сериализации и десериализации данных
    /// </summary>
    public static class Serializer
    {
        /// <summary>
        /// Создает экземпляр класса <see cref="Serializer"/>
        /// </summary>
        static Serializer()
        {
            Path = $@"{Environment.CurrentDirectory}" + "/Data/";

            FileName = "data.json";

            if (!File.Exists(Path))
            {
                DirectoryInfo directory = Directory.CreateDirectory(Path);
            }
        }
        /// <summary>
        /// Возвращает и задает путь куда будут сериализоватся данные.
        /// </summary>
        public static string Path { get; set; }

        /// <summary>
        /// Возвращает и задает имя файла.
        /// </summary>
        public static string FileName { get; set; }

        /// <summary>
        /// Сохраняет данные из списка в формате JSON.
        /// </summary>
        /// <param name="notes">Список студентов.</param>
        public static async void SaveToFile(List<Note> notes)
        {
            using (StreamWriter writer = new StreamWriter(Path + FileName))
            {
                await writer.WriteAsync(JsonConvert.SerializeObject(notes));
            }
        }

        /// <summary>
        /// Загружает данные в формате JSON и десериализует их в список.
        /// </summary>
        /// <returns>Список объектов <see cref="Note"/>.</returns>
        public static List<Note> LoadFromFile()
        {
            {
                var notes = new List<Note>();

                try
                {
                    using (StreamReader reader = new StreamReader(Path + FileName))
                    {
                        notes = JsonConvert.DeserializeObject<List<Note>>(reader.ReadToEnd());
                    }

                    if (notes == null) notes = new List<Note>();
                }
                catch
                {
                    return notes;
                }

                return notes;
            }
        }
    }
}
