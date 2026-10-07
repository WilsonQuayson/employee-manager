using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.DTOs.Dashboard
{
    public class DashboardResponseDto
    {
        public int TotalEmployees { get; set; }
        public decimal AverageSalary { get; set; }
        public int TotalDepartments { get; set; }
        public int NewHiresThisMonth { get; set; }

        public List<EmployeeGrowthDto> EmployeeGrowth { get; set; } = [];
        public List<DepartmentCountDto> EmployeesByDepartment { get; set; } = [];
        public List<StatusCountDto> EmployeesByStatus { get; set; } = [];
        public List<MonthlyHireDto> MonthlyHires { get; set; } = [];
    }
}
