using EmployeeManager.Domain.Entities;
using EmployeeManager.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.DTOs.Employee.Request
{
    public class EmployeeRequestDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }

        public DateTime DateOfBirth { get; set; }
        public DateTime HireDate { get; set; }

        public EmployeeStatus Status { get; set; }

        public decimal Salary { get; set; }

        public int DepartmentId { get; set; }

        public int JobPositionId { get; set; }

    }
}
