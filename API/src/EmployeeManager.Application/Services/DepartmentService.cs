
using EmployeeManager.Application.DTOs.Department.Request;
using EmployeeManager.Application.DTOs.Department.Response;
using EmployeeManager.Application.Exceptions;
using EmployeeManager.Application.Interfaces;
using EmployeeManager.Domain.Entities;

namespace EmployeeManager.Application.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly ICurrentOrganization _currentOrganization;

        public DepartmentService(
            IDepartmentRepository departmentRepository,
            ICurrentOrganization currentOrganization)
        {
            _departmentRepository = departmentRepository;
            _currentOrganization = currentOrganization;
        }

        public async Task<List<DepartmentResponseDto>> GetAllAsync()
        {
            var organizationId = await _currentOrganization.GetOrganizationIdAsync();
            var departments = await _departmentRepository.GetAllAsync(organizationId);

            return departments.Select(MapToResponseDto).ToList();
        }

        public async Task<DepartmentResponseDto?> GetByIdAsync(int id)
        {
            var organizationId = await _currentOrganization.GetOrganizationIdAsync();
            var department = await _departmentRepository.GetByIdAsync(id, organizationId);

            if (department == null)
            {
                return null;
            }

            return MapToResponseDto(department);
        }

        public async Task<DepartmentResponseDto> CreateAsync(DepartmentRequestDto request)
        {
            var organizationId = await _currentOrganization.GetOrganizationIdAsync();
            var nameExists = await _departmentRepository.NameExistsAsync(request.Name, organizationId);

            if (nameExists)
            {
                throw new ConflictException("A department with this name already exists.");
            }

            var department = new Department
            {
                Name = request.Name,
                OrganizationId = organizationId
            };

            var createdDepartment = await _departmentRepository.CreateAsync(department);

            return MapToResponseDto(createdDepartment);
        }

        public async Task<bool> UpdateAsync(int id, DepartmentRequestDto request)
        {
            var organizationId = await _currentOrganization.GetOrganizationIdAsync();
            var department = await _departmentRepository.GetByIdAsync(id, organizationId);

            if (department == null)
            {
                return false;
            }

            var nameExists = await _departmentRepository.NameExistsAsync(request.Name, organizationId, id);

            if (nameExists)
            {
                throw new ConflictException("A department with this name already exists.");
            }

            department.Name = request.Name;

            await _departmentRepository.UpdateAsync(department);

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var organizationId = await _currentOrganization.GetOrganizationIdAsync();
            var department = await _departmentRepository.GetByIdAsync(id, organizationId);

            if (department == null)
            {
                return false;
            }

            var hasEmployees = await _departmentRepository.HasEmployeesAsync(id, organizationId);

            if (hasEmployees)
            {
                throw new ConflictException("The department cannot be deleted because employees are assigned to it.");
            }

            await _departmentRepository.DeleteAsync(department);

            return true;
        }

        private static DepartmentResponseDto MapToResponseDto(Department department)
        {
            return new DepartmentResponseDto
            {
                Id = department.Id,
                Name = department.Name
            };
        }
    }
}
