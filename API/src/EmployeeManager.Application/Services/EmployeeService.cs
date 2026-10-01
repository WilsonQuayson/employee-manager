using EmployeeManager.Application.DTOs.Employee.Request;
using EmployeeManager.Application.DTOs.Employee.Response;
using EmployeeManager.Application.Interfaces;
using EmployeeManager.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }


        public async Task<List<EmployeeResponseDto>> GetAllAsync()
        {
            var employees = await _employeeRepository.GetAllAsync();

            return employees
                .Select(MapToResponseDto)
                .ToList();
        }


        public async Task<EmployeeResponseDto?> GetByIdAsync(int id)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);

            if (employee == null)
            {
                return null;
            }

            return MapToResponseDto(employee);
        }


        public async Task<EmployeeResponseDto> CreateAsync(
            EmployeeRequestDto request)
        {
            var employee = new Employee
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,

                DateOfBirth = request.DateOfBirth,
                HireDate = request.HireDate,

                Status = request.Status,
                Salary = request.Salary,

                DepartmentId = request.DepartmentId,
                JobPositionId = request.JobPositionId
            };

            var createdEmployee =
                await _employeeRepository.CreateAsync(employee);

            return MapToResponseDto(createdEmployee);
        }


        public async Task<bool> UpdateAsync(
            int id,
            EmployeeRequestDto request)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);

            if (employee == null)
            {
                return false;
            }

            employee.FirstName = request.FirstName;
            employee.LastName = request.LastName;
            employee.Email = request.Email;
            employee.PhoneNumber = request.PhoneNumber;

            employee.DateOfBirth = request.DateOfBirth;
            employee.HireDate = request.HireDate;

            employee.Status = request.Status;
            employee.Salary = request.Salary;

            employee.DepartmentId = request.DepartmentId;
            employee.JobPositionId = request.JobPositionId;

            await _employeeRepository.UpdateAsync(employee);

            return true;
        }


        public async Task<bool> DeleteAsync(int id)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);

            if (employee == null)
            {
                return false;
            }

            await _employeeRepository.DeleteAsync(employee);

            return true;
        }


        private static EmployeeResponseDto MapToResponseDto(Employee employee)
        {
            return new EmployeeResponseDto
            {
                Id = employee.Id,

                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = employee.Email,
                PhoneNumber = employee.PhoneNumber,

                DateOfBirth = employee.DateOfBirth,
                HireDate = employee.HireDate,

                Status = employee.Status,
                Salary = employee.Salary,

                DepartmentId = employee.DepartmentId,
                DepartmentName = employee.Department.Name,

                JobPositionId = employee.JobPositionId,
                JobPositionTitle = employee.JobPosition.Title
            };
        }
    }
}
