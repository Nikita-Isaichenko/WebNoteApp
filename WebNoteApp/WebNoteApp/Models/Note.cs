using System.ComponentModel.DataAnnotations;

namespace WebNoteApp.Models
{
    /// <summary>
    /// Хранит информацию, описывающую записки.
    /// </summary>
    public class Note
    {
        /// <summary>
        /// Id.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Название.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Описание.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Категория.
        /// </summary>
        public string Category { get; set; }

        /// <summary>
        /// Дата создания.
        /// </summary>
        public string Created { get; set; }

        /// <summary>
        /// Дата изменения.
        /// </summary>
        public string Modified { get; set; }    
    }
}
