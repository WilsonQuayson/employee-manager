using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Domain.Entities
{
    public class JobPosition
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public decimal? MinimumSalary { get; set; }
        public decimal? MaximumSalary { get; set; }

        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}
