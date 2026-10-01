using EmployeeManager.Application.DTOs.Employee;
using EmployeeManager.Application.DTOs.Employee.Request;
using EmployeeManager.Application.DTOs.Employee.Response;
using EmployeeManager.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManager.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    public EmployeesController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }


    // GET: api/employees
    [HttpGet]
    public async Task<ActionResult<List<EmployeeResponseDto>>> GetAll()
    {
        var employees = await _employeeService.GetAllAsync();

        return Ok(employees);
    }


    // GET: api/employees/5
    [HttpGet("{id}")]
    public async Task<ActionResult<EmployeeResponseDto>> GetById(int id)
    {
        var employee = await _employeeService.GetByIdAsync(id);

        if (employee == null)
        {
            return NotFound();
        }

        return Ok(employee);
    }


    // POST: api/employees
    [HttpPost]
    public async Task<ActionResult<EmployeeResponseDto>> Create(
        EmployeeRequestDto request)
    {
        var employee = await _employeeService.CreateAsync(request);

        return CreatedAtAction(
            nameof(GetById),
            new { id = employee.Id },
            employee);
    }


    // PUT: api/employees/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        EmployeeRequestDto request)
    {
        var updated = await _employeeService.UpdateAsync(id, request);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }


    // DELETE: api/employees/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _employeeService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}