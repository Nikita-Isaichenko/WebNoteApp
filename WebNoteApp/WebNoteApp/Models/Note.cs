using System.ComponentModel;
using WebNoteApp.Models.Enums;

namespace WebNoteApp.Models
{
    public class Note
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public Category category { get; set; }

        public DateTime Created { get; set; }

        public DateTime Modified { get; set; }
    }
}
