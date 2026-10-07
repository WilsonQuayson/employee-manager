using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.DTOs.Dashboard
{
    public class DepartmentCountDto
    {
        public string Department { get; set; } = string.Empty;
        public int Count { get; set; }
    }
}
