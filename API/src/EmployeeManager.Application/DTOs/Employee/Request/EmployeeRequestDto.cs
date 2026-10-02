using EmployeeManager.Domain.Entities;
using EmployeeManager.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.DTOs.Employee.Request
{
    public class EmployeeRequestDto
    {
        [Required]
        [MaxLength(35)]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        [MaxLength(35)]
        public string LastName { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Phone]
        public string? PhoneNumber { get; set; }

        public DateTime DateOfBirth { get; set; }
        public DateTime HireDate { get; set; }

        public EmployeeStatus Status { get; set; }
        [Range(0, double.MaxValue)]
        public decimal Salary { get; set; }
        [Range(0, int.MaxValue)]
        public int DepartmentId { get; set; }
        [Range(0, int.MaxValue)]
        public int JobPositionId { get; set; }

    }
}
