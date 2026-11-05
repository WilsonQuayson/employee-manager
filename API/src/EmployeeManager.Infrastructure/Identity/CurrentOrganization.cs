
using System.Security.Claims;
using EmployeeManager.Application.Interfaces;
using EmployeeManager.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Infrastructure.Identity
{
    public class CurrentOrganization(IHttpContextAccessor httpContextAccessor, AppDbContext context) : ICurrentOrganization
    {

        public async Task<int> GetOrganizationIdAsync()
        {
            var userId = httpContextAccessor.HttpContext?
                .User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedAccessException("User is not authenticated.");
            }

            var organizationId = await context.Organizations
                .AsNoTracking()
                .Where(o => o.OwnerId == userId)
                .Select(o => (int?)o.Id)
                .FirstOrDefaultAsync();

            if (organizationId == null)
            {
                throw new InvalidOperationException("No organization found for the authenticated user.");
            }

            return organizationId.Value;
        }
    }
}
