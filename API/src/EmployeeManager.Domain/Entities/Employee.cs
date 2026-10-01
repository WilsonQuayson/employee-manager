using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeManager.Domain.Enums;

namespace EmployeeManager.Domain.Entities
{
    public class Employee
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }

        public DateTime DateOfBirth { get; set; }
        public DateTime HireDate { get; set; }

        public EmployeeStatus Status { get; set; }

        public decimal Salary { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; } = null!;

        public int JobPositionId { get; set; }
        public JobPosition JobPosition { get; set; } = null!;

    }
}
