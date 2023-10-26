using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.ComponentModel.DataAnnotations;
using WebNoteApp.Models.Enums;

namespace WebNoteApp.Models
{
    /// <summary>
    /// Хранит информацию, описывающую записки.
    /// </summary>
    public class Note
    {
        /// <summary>
        /// Категория.
        /// </summary>
        private string _category;

        /// <summary>
        /// Id.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Название.
        /// </summary>
        [MaxLength(50)]
        public string Title { get; set; }

        /// <summary>
        /// Описание.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Категория.
        /// </summary>
        public string Category
        {
            set => _category = value;

            get
            {
                if (Enum.TryParse<NotesCategory>(_category, true, out _))
                {
                    return _category;
                }
                else
                {
                    return NotesCategory.Other.ToString();
                }
            }
        }

        /// <summary>
        /// Дата создания.
        /// </summary>
        public DateTime Created { get; set; }

        /// <summary>
        /// Дата изменения.
        /// </summary>
        public DateTime Modified { get; set; }    
    }
}
