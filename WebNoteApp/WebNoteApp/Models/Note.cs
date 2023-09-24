using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using WebNoteApp.Models.Enums;

namespace WebNoteApp.Models
{
    public class Note
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string Created { get; set; }

        public string Modified { get; set; }
    }
}
