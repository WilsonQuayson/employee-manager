using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.DTOs.Auth
{
    public class UpdateOrganizationRequest
    {
        [Required]
        [StringLength(100)]
        public string OrganizationName { get; set; } = string.Empty;
    }
}
