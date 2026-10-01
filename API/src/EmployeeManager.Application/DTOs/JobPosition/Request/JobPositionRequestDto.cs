using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.DTOs.JobPosition.Request
{
    public class JobPositionRequestDto
    {
        public string Title { get; set; } = string.Empty;

        public decimal? MinimumSalary { get; set; }
        public decimal? MaximumSalary { get; set; }
    }
}
