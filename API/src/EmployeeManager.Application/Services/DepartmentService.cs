using EmployeeManager.Application.DTOs.Department.Request;
using EmployeeManager.Application.DTOs.Department.Response;
using EmployeeManager.Application.Interfaces;
using EmployeeManager.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentService(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }


        public async Task<List<DepartmentResponseDto>> GetAllAsync()
        {
            var departments = await _departmentRepository.GetAllAsync();

            return departments
                .Select(MapToResponseDto)
                .ToList();
        }


        public async Task<DepartmentResponseDto?> GetByIdAsync(int id)
        {
            var department = await _departmentRepository.GetByIdAsync(id);

            if (department == null)
            {
                return null;
            }

            return MapToResponseDto(department);
        }


        public async Task<DepartmentResponseDto> CreateAsync(
            DepartmentRequestDto request)
        {
            var department = new Department
            {
                Name = request.Name
            };

            var createdDepartment =
                await _departmentRepository.CreateAsync(department);

            return MapToResponseDto(createdDepartment);
        }


        public async Task<bool> UpdateAsync(
            int id,
            DepartmentRequestDto request)
        {
            var department = await _departmentRepository.GetByIdAsync(id);

            if (department == null)
            {
                return false;
            }

            department.Name = request.Name;

            await _departmentRepository.UpdateAsync(department);

            return true;
        }


        public async Task<bool> DeleteAsync(int id)
        {
            var department = await _departmentRepository.GetByIdAsync(id);

            if (department == null)
            {
                return false;
            }

            await _departmentRepository.DeleteAsync(department);

            return true;
        }


        private static DepartmentResponseDto MapToResponseDto(
            Department department)
        {
            return new DepartmentResponseDto
            {
                Id = department.Id,
                Name = department.Name
            };
        }
    }
}
