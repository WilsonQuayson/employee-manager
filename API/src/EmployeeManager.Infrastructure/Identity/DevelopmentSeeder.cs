using EmployeeManager.Domain.Entities;
using EmployeeManager.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EmployeeManager.Infrastructure.Identity;

public static class DevelopmentSeeder
{
    public static async Task SeedAsync(IServiceProvider services, IConfiguration configuration)
    {
        var context = services.GetRequiredService<AppDbContext>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var email = "demo@example.com";

        await using var transaction = await context.Database.BeginTransactionAsync();

        var user = await userManager.FindByEmailAsync(email);

        if (user == null)
        {
            var password = configuration["Seed:Password"]
                ?? throw new InvalidOperationException("Development seed password is missing.");

            user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                DisplayName = "Demo User"
            };

            var result = await userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                throw new InvalidOperationException(
                    string.Join(", ", result.Errors.Select(e => e.Description)));
            }
        }

        var organization = await context.Organizations
            .FirstOrDefaultAsync(o => o.OwnerId == user.Id);

        if (organization == null)
        {
            organization = new Organization
            {
                Name = "Demo Organization",
                OwnerId = user.Id
            };

            context.Organizations.Add(organization);
            await context.SaveChangesAsync();
        }

        var departmentNames = new[]
        {
            "Engineering",
            "Human Resources",
            "Marketing",
            "Finance",
            "Operations"
        };

        foreach (var name in departmentNames)
        {
            if (!await context.Departments.AnyAsync(d =>
                d.OrganizationId == organization.Id && d.Name == name))
            {
                context.Departments.Add(new Department
                {
                    Name = name,
                    OrganizationId = organization.Id
                });
            }
        }

        await context.SaveChangesAsync();

        var positions = new (string Title, decimal Min, decimal Max)[]
        {
            ("Software Developer", 3000m, 5500m),
            ("Senior Developer", 4500m, 7500m),
            ("QA Engineer", 2800m, 4800m),
            ("HR Specialist", 2700m, 4500m),
            ("Marketing Specialist", 2600m, 4500m),
            ("Financial Analyst", 3200m, 5500m),
            ("Operations Manager", 4000m, 6500m),
            ("Project Manager", 3800m, 6500m)
        };

        foreach (var position in positions)
        {
            if (!await context.JobPositions.AnyAsync(j =>
                j.OrganizationId == organization.Id && j.Title == position.Title))
            {
                context.JobPositions.Add(new JobPosition
                {
                    Title = position.Title,
                    MinimumSalary = position.Min,
                    MaximumSalary = position.Max,
                    OrganizationId = organization.Id
                });
            }
        }

        await context.SaveChangesAsync();

        var departments = await context.Departments
            .Where(d => d.OrganizationId == organization.Id)
            .ToDictionaryAsync(d => d.Name, d => d.Id);

        var jobPositions = await context.JobPositions
            .Where(j => j.OrganizationId == organization.Id)
            .ToDictionaryAsync(j => j.Title, j => j.Id);

        var employees = new (string First, string Last, string Department, string Position, decimal Salary, int MonthsAgo)[]
        {
            ("James", "Wilson", "Engineering", "Senior Developer", 5800m, 24),
            ("Emma", "Johnson", "Engineering", "Software Developer", 3900m, 18),
            ("Liam", "Brown", "Engineering", "Software Developer", 4200m, 12),
            ("Olivia", "Davis", "Engineering", "QA Engineer", 3500m, 9),
            ("Noah", "Miller", "Engineering", "Software Developer", 3700m, 7),
            ("Sophia", "Anderson", "Engineering", "Senior Developer", 6100m, 5),
            ("Lucas", "Taylor", "Engineering", "QA Engineer", 3200m, 2),
            ("Mia", "Thomas", "Engineering", "Software Developer", 3400m, 0),

            ("Ethan", "Moore", "Human Resources", "HR Specialist", 3600m, 20),
            ("Ava", "Martin", "Human Resources", "HR Specialist", 3300m, 11),
            ("Isabella", "White", "Human Resources", "HR Specialist", 3100m, 3),

            ("William", "Harris", "Marketing", "Marketing Specialist", 3800m, 17),
            ("Charlotte", "Clark", "Marketing", "Marketing Specialist", 3400m, 10),
            ("Benjamin", "Lewis", "Marketing", "Project Manager", 4900m, 6),
            ("Amelia", "Walker", "Marketing", "Marketing Specialist", 3100m, 1),

            ("Henry", "Hall", "Finance", "Financial Analyst", 4400m, 22),
            ("Evelyn", "Allen", "Finance", "Financial Analyst", 3900m, 14),
            ("Alexander", "Young", "Finance", "Financial Analyst", 4100m, 8),
            ("Harper", "King", "Finance", "Financial Analyst", 3500m, 4),

            ("Daniel", "Wright", "Operations", "Operations Manager", 5500m, 30),
            ("Ella", "Scott", "Operations", "Project Manager", 4700m, 16),
            ("Michael", "Green", "Operations", "Operations Manager", 5100m, 13),
            ("Grace", "Baker", "Operations", "Project Manager", 4200m, 7),
            ("Jack", "Adams", "Operations", "Project Manager", 4000m, 3),
            ("Chloe", "Nelson", "Operations", "Project Manager", 3900m, 0)
        };

        var existingEmails = (await context.Employees
            .Where(e => e.OrganizationId == organization.Id)
            .Select(e => e.Email)
            .ToListAsync()).ToHashSet(StringComparer.OrdinalIgnoreCase);

        for (var i = 0; i < employees.Length; i++)
        {
            var employee = employees[i];
            var employeeEmail = $"{employee.First.ToLower()}.{employee.Last.ToLower()}@demo.example.com";

            if (existingEmails.Contains(employeeEmail))
            {
                continue;
            }

            context.Employees.Add(new Employee
            {
                OrganizationId = organization.Id,
                FirstName = employee.First,
                LastName = employee.Last,
                Email = employeeEmail,
                PhoneNumber = null,
                DateOfBirth = new DateTime(1985 + (i % 15), (i % 12) + 1, (i % 27) + 1),
                HireDate = DateTime.UtcNow.Date.AddMonths(-employee.MonthsAgo),
                Status = default,
                Salary = employee.Salary,
                DepartmentId = departments[employee.Department],
                JobPositionId = jobPositions[employee.Position]
            });

            existingEmails.Add(employeeEmail);
        }

        await context.SaveChangesAsync();
        await transaction.CommitAsync();
    }
}
