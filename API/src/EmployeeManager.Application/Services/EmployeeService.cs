using EmployeeManager.Application.DTOs.Employee.Request;
using EmployeeManager.Application.DTOs.Employee.Response;
using EmployeeManager.Application.Exceptions;
using EmployeeManager.Application.Interfaces;
using EmployeeManager.Domain.Entities;

namespace EmployeeManager.Application.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IJobPositionRepository _jobPositionRepository;
        private readonly ICurrentOrganization _currentOrganization;

        public EmployeeService(IEmployeeRepository employeeRepository, IDepartmentRepository departmentRepository, IJobPositionRepository jobPositionRepository, ICurrentOrganization currentOrganization)
        {
            _employeeRepository = employeeRepository;
            _departmentRepository = departmentRepository;
            _jobPositionRepository = jobPositionRepository;
            _currentOrganization = currentOrganization;
        }

        public async Task<List<EmployeeResponseDto>> GetAllAsync()
        {
            var organizationId = await _currentOrganization.GetOrganizationIdAsync();
            var employees = await _employeeRepository.GetAllAsync(organizationId);

            return employees.Select(MapToResponseDto).ToList();
        }


        public async Task<EmployeeResponseDto?> GetByIdAsync(int id)
        {
            var organizationId = await _currentOrganization.GetOrganizationIdAsync();
            var employee = await _employeeRepository.GetByIdAsync(id, organizationId);

            if (employee == null)
            {
                return null;
            }

            return MapToResponseDto(employee);
        }

        public async Task<EmployeeResponseDto> CreateAsync(EmployeeRequestDto request)
        {
            var organizationId = await _currentOrganization.GetOrganizationIdAsync();

            var department = await _departmentRepository.GetByIdAsync(request.DepartmentId, organizationId);

            if (department == null)
            {
                throw new BadRequestException("Invalid department.");
            }

            var jobPosition = await _jobPositionRepository.GetByIdAsync(request.JobPositionId, organizationId);

            if (jobPosition == null)
            {
                throw new BadRequestException("Invalid job position.");
            }

            var emailExists = await _employeeRepository.EmailExistsAsync(request.Email, organizationId);

            if (emailExists)
            {
                throw new ConflictException("An employee with this email already exists.");
            }

            if (!string.IsNullOrWhiteSpace(request.PhoneNumber))
            {
                var phoneNumberExists = await _employeeRepository.PhoneNumberExistsAsync(request.PhoneNumber, organizationId);

                if (phoneNumberExists)
                {
                    throw new ConflictException("An employee with this phone number already exists.");
                }
            }

            var employee = new Employee
            {
                OrganizationId = organizationId,

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

            var createdEmployee = await _employeeRepository.CreateAsync(employee);

            return MapToResponseDto(createdEmployee);
        }

        public async Task<bool> UpdateAsync(int id, EmployeeRequestDto request)
        {
            var organizationId = await _currentOrganization.GetOrganizationIdAsync();
            var employee = await _employeeRepository.GetByIdAsync(id, organizationId);

            if (employee == null)
            {
                return false;
            }

            var department = await _departmentRepository.GetByIdAsync(request.DepartmentId, organizationId);

            if (department == null)
            {
                throw new BadRequestException("Invalid department.");
            }

            var jobPosition = await _jobPositionRepository.GetByIdAsync(request.JobPositionId, organizationId);

            if (jobPosition == null)
            {
                throw new BadRequestException("Invalid job position.");
            }

            var emailExists = await _employeeRepository.EmailExistsAsync(request.Email, organizationId, id);

            if (emailExists)
            {
                throw new ConflictException("An employee with this email already exists.");
            }

            if (!string.IsNullOrWhiteSpace(request.PhoneNumber))
            {
                var phoneNumberExists = await _employeeRepository.PhoneNumberExistsAsync(request.PhoneNumber, organizationId, id);

                if (phoneNumberExists)
                {
                    throw new ConflictException("An employee with this phone number already exists.");
                }
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
            var organizationId = await _currentOrganization.GetOrganizationIdAsync();
            var employee = await _employeeRepository.GetByIdAsync(id, organizationId);

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
