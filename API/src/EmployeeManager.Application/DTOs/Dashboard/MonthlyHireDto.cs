using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.DTOs.Dashboard
{
    public class MonthlyHireDto
    {
        public string Month { get; set; } = string.Empty;
        public int Count { get; set; }
    }
}
