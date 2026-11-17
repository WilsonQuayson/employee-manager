
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

        var user = await userManager.FindByEmailAsync(email);

        // Only seed the demo account once.
        if (user != null)
            return;

        var password = configuration["Seed:Password"]
            ?? throw new InvalidOperationException("Demo account seed password is missing.");

        await using var transaction = await context.Database.BeginTransactionAsync();

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

        var organization = new Organization
        {
            Name = "Demo Organization",
            OwnerId = user.Id
        };

        context.Organizations.Add(organization);
        await context.SaveChangesAsync();

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
            context.Departments.Add(new Department
            {
                Name = name,
                OrganizationId = organization.Id
            });
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
            context.JobPositions.Add(new JobPosition
            {
                Title = position.Title,
                MinimumSalary = position.Min,
                MaximumSalary = position.Max,
                OrganizationId = organization.Id
            });
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

        foreach (var (first, last, department, position, salary, monthsAgo) in employees)
        {
            var index = Array.FindIndex(employees, e => e.First == first && e.Last == last);

            context.Employees.Add(new Employee
            {
                OrganizationId = organization.Id,
                FirstName = first,
                LastName = last,
                Email = $"{first.ToLower()}.{last.ToLower()}@demo.example.com",
                PhoneNumber = null,
                DateOfBirth = new DateTime(1985 + (index % 15), (index % 12) + 1, (index % 27) + 1),
                HireDate = DateTime.UtcNow.Date.AddMonths(-monthsAgo),
                Status = default,
                Salary = salary,
                DepartmentId = departments[department],
                JobPositionId = jobPositions[position]
            });
        }

        await context.SaveChangesAsync();
        await transaction.CommitAsync();
    }
}
