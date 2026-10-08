using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.DTOs.Dashboard
{
    public class SalaryBandDto
    {
        public string Position { get; set; } = string.Empty;
        public decimal? MinimumSalary { get; set; }
        public decimal? MaximumSalary { get; set; }
        public decimal? AverageSalary { get; set; }
    }
}
