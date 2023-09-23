using System.ComponentModel;
using WebNoteApp.Models.Enums;

namespace WebNoteApp.Models
{
    public class Note
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string category { get; set; }

        public string Created { get; set; }

        public string Modified { get; set; }
    }
}
