using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace EmployeeManager.Application.DTOs.JobPosition.Request
{
    public class JobPositionRequestDto
    {
        [Required]
        [MaxLength(35)]
        public string Title { get; set; } = string.Empty;

        public decimal? MinimumSalary { get; set; }
        public decimal? MaximumSalary { get; set; }
    }
}
