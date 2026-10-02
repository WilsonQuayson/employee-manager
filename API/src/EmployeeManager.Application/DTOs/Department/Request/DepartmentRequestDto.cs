using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.DTOs.Department.Request
{
    public class DepartmentRequestDto
    {
        [Required]
        [MaxLength(35)]
        public string Name { get; set; } = string.Empty;

    }
}
