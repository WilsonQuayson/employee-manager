using EmployeeManager.Application.DTOs.Employee.Request;
using EmployeeManager.Application.DTOs.Employee.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.Interfaces
{
    public interface IEmployeeService
    {
        Task<List<EmployeeResponseDto>> GetAllAsync();

        Task<EmployeeResponseDto?> GetByIdAsync(int id);

        Task<EmployeeResponseDto> CreateAsync(EmployeeRequestDto request);

        Task<bool> UpdateAsync(int id, EmployeeRequestDto request);

        Task<bool> DeleteAsync(int id);
    }
}
