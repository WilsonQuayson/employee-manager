using EmployeeManager.Application.DTOs.Department;
using EmployeeManager.Application.DTOs.Department.Request;
using EmployeeManager.Application.DTOs.Department.Response;
using EmployeeManager.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManager.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DepartmentsController : ControllerBase
{
    private readonly IDepartmentService _departmentService;

    public DepartmentsController(IDepartmentService departmentService)
    {
        _departmentService = departmentService;
    }


    // GET: api/departments
    [HttpGet]
    public async Task<ActionResult<List<DepartmentResponseDto>>> GetAll()
    {
        var departments = await _departmentService.GetAllAsync();

        return Ok(departments);
    }


    // GET: api/departments/5
    [HttpGet("{id}")]
    public async Task<ActionResult<DepartmentResponseDto>> GetById(int id)
    {
        var department = await _departmentService.GetByIdAsync(id);

        if (department == null)
        {
            return NotFound();
        }

        return Ok(department);
    }


    // POST: api/departments
    [HttpPost]
    public async Task<ActionResult<DepartmentResponseDto>> Create(
        DepartmentRequestDto request)
    {
        var department = await _departmentService.CreateAsync(request);

        return CreatedAtAction(
            nameof(GetById),
            new { id = department.Id },
            department);
    }


    // PUT: api/departments/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        DepartmentRequestDto request)
    {
        var updated = await _departmentService.UpdateAsync(id, request);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }


    // DELETE: api/departments/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _departmentService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}