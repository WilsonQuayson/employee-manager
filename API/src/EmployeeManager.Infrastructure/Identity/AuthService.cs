
using EmployeeManager.Application.DTOs.Auth;
using EmployeeManager.Application.Interfaces;
using EmployeeManager.Domain.Entities;
using EmployeeManager.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Infrastructure.Identity
{
    public class AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, AppDbContext context) : IAuthService
    {

        public async Task<RegisterResult> RegisterAsync(RegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.DisplayName) || string.IsNullOrWhiteSpace(request.OrganizationName))
            {
                return new RegisterResult
                {
                    Succeeded = false,
                    Errors = ["Display name and organization name are required."]
                };
            }

            await using var transaction = await context.Database.BeginTransactionAsync();

            var user = new ApplicationUser
            {
                UserName = request.Email,
                Email = request.Email,
                DisplayName = request.DisplayName.Trim()
            };

            var result = await userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                return new RegisterResult
                {
                    Succeeded = false,
                    Errors = result.Errors.Select(error => error.Description).ToList()
                };
            }

            var organization = new Organization
            {
                Name = request.OrganizationName.Trim(),
                OwnerId = user.Id
            };

            context.Organizations.Add(organization);
            await context.SaveChangesAsync();
            await transaction.CommitAsync();

            return new RegisterResult { Succeeded = true };
        }

        public async Task<LoginResult> LoginAsync(LoginRequest request)
        {
            var user = await userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return new LoginResult { Succeeded = false };
            }

            var result = await signInManager.PasswordSignInAsync(
                user,
                request.Password,
                isPersistent: false,
                lockoutOnFailure: true
            );

            return new LoginResult
            {
                Succeeded = result.Succeeded,
                IsLockedOut = result.IsLockedOut,
                RequiresTwoFactor = result.RequiresTwoFactor
            };
        }


        public async Task LogoutAsync()
        {
            await signInManager.SignOutAsync();
        }

        public async Task<CurrentUserResponse?> GetCurrentUserAsync(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return null;
            }

            var organization = await context.Organizations
                .AsNoTracking()
                .FirstOrDefaultAsync(o => o.OwnerId == userId);

            if (organization == null)
            {
                return null;
            }

            return new CurrentUserResponse
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Email = user.Email ?? "",
                OrganizationId = organization.Id,
                OrganizationName = organization.Name
            };
        }
    }
}
