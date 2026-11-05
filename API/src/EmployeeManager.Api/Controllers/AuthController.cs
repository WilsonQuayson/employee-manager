using EmployeeManager.Application.DTOs.Auth;
using EmployeeManager.Application.Interfaces;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EmployeeManager.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController(IAuthService authService) : ControllerBase
    {

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var result = await authService.RegisterAsync(request);

            if (!result.Succeeded)
            {
                return BadRequest(new { errors = result.Errors });
            }

            return Ok(new { message = "Account registered successfully." });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var result = await authService.LoginAsync(request);

            if (result.IsLockedOut)
            {
                return StatusCode(429, new { message = "Too many failed login attempts. Please try again later." });
            }

            if (result.RequiresTwoFactor)
            {
                return StatusCode(403, new { message = "Two-factor authentication is required." });
            }

            if (!result.Succeeded)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            return Ok(new { message = "Logged in successfully." });
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await authService.LogoutAsync();

            return NoContent();
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<CurrentUserResponse>> GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var user = await authService.GetCurrentUserAsync(userId);

            if (user == null)
            {
                return NotFound(new { message = "User profile or organization not found." });
            }

            return Ok(user);
        }

        [HttpGet("csrf-token")]
        [AllowAnonymous]
        public IActionResult GetCsrfToken([FromServices] IAntiforgery antiforgery)
        {
            var tokens = antiforgery.GetAndStoreTokens(HttpContext);

            Response.Headers.CacheControl = "no-store";

            return Ok(new { token = tokens.RequestToken });
        }
    }
}
