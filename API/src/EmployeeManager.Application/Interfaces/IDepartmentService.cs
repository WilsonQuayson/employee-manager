using EmployeeManager.Application.DTOs.Department.Request;
using EmployeeManager.Application.DTOs.Department.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.Interfaces
{
    public interface IDepartmentService
    {
        Task<List<DepartmentResponseDto>> GetAllAsync();

        Task<DepartmentResponseDto?> GetByIdAsync(int id);

        Task<DepartmentResponseDto> CreateAsync(DepartmentRequestDto request);

        Task<bool> UpdateAsync(int id, DepartmentRequestDto request);

        Task<bool> DeleteAsync(int id);
    }
}
