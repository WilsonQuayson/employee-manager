using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeManager.Domain.Entities;

namespace EmployeeManager.Application.DTOs.Department.Response
{
    public class DepartmentResponseDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

    }
}
