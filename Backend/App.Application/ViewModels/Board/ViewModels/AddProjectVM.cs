using System.ComponentModel.DataAnnotations;

namespace App.Application.ViewModels.Board.ViewModels
{

    public class AddBoardVM
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public Guid ProjectId { get; set; }

    }
    public class UpdateBoardVM
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public Guid Id { get; set; }
    }

    public class GetBoardVM
    {
        public string Name { get; set; }
        public Guid ProjectId { get; set; }
        public string _id { get; set; }
    }
}
