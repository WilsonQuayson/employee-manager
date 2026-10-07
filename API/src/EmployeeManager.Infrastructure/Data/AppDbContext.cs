using EmployeeManager.Domain.Entities;
using EmployeeManager.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Infrastructure.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Employee> Employees => Set<Employee>();
        public DbSet<Department> Departments => Set<Department>();
        public DbSet<JobPosition> JobPositions => Set<JobPosition>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Department>().HasData(
                new Department { Id = 1, Name = "Engineering" },
                new Department { Id = 2, Name = "Sales" },
                new Department { Id = 3, Name = "Marketing" },
                new Department { Id = 4, Name = "Human Resources" },
                new Department { Id = 5, Name = "Finance" }
            );

            modelBuilder.Entity<JobPosition>().HasData(
                new JobPosition
                {
                    Id = 1,
                    Title = "Software Developer",
                    MinimumSalary = 2800,
                    MaximumSalary = 4500
                },
                new JobPosition
                {
                    Id = 2,
                    Title = "Sales Representative",
                    MinimumSalary = 2500,
                    MaximumSalary = 4000
                },
                new JobPosition
                {
                    Id = 3,
                    Title = "Marketing Specialist",
                    MinimumSalary = 2500,
                    MaximumSalary = 4000
                },
                new JobPosition
                {
                    Id = 4,
                    Title = "HR Specialist",
                    MinimumSalary = 2600,
                    MaximumSalary = 4200
                },
                new JobPosition
                {
                    Id = 5,
                    Title = "Financial Analyst",
                    MinimumSalary = 2800,
                    MaximumSalary = 4500
                }
            );

            modelBuilder.Entity<Employee>().HasData(
                new Employee
                {
                    Id = 1,
                    FirstName = "Emma",
                    LastName = "Johnson",
                    Email = "emma.johnson@example.com",
                    PhoneNumber = "0471000001",
                    DateOfBirth = new DateTime(1995, 4, 12),
                    HireDate = new DateTime(2025, 6, 10),
                    Status = EmployeeStatus.Active,
                    Salary = 3400,
                    DepartmentId = 1,
                    JobPositionId = 1
                },
                new Employee
                {
                    Id = 2,
                    FirstName = "Lucas",
                    LastName = "Martin",
                    Email = "lucas.martin@example.com",
                    PhoneNumber = "0471000002",
                    DateOfBirth = new DateTime(1992, 8, 23),
                    HireDate = new DateTime(2025, 7, 15),
                    Status = EmployeeStatus.Active,
                    Salary = 3800,
                    DepartmentId = 1,
                    JobPositionId = 1
                },
                new Employee
                {
                    Id = 3,
                    FirstName = "Sophie",
                    LastName = "Williams",
                    Email = "sophie.williams@example.com",
                    PhoneNumber = "0471000003",
                    DateOfBirth = new DateTime(1998, 2, 5),
                    HireDate = new DateTime(2025, 8, 4),
                    Status = EmployeeStatus.Active,
                    Salary = 2900,
                    DepartmentId = 2,
                    JobPositionId = 2
                },
                new Employee
                {
                    Id = 4,
                    FirstName = "Noah",
                    LastName = "Brown",
                    Email = "noah.brown@example.com",
                    PhoneNumber = "0471000004",
                    DateOfBirth = new DateTime(1990, 11, 17),
                    HireDate = new DateTime(2025, 9, 22),
                    Status = EmployeeStatus.Active,
                    Salary = 3600,
                    DepartmentId = 5,
                    JobPositionId = 5
                },
                new Employee
                {
                    Id = 5,
                    FirstName = "Olivia",
                    LastName = "Davis",
                    Email = "olivia.davis@example.com",
                    PhoneNumber = "0471000005",
                    DateOfBirth = new DateTime(1996, 7, 9),
                    HireDate = new DateTime(2025, 10, 6),
                    Status = EmployeeStatus.Active,
                    Salary = 3100,
                    DepartmentId = 3,
                    JobPositionId = 3
                },
                new Employee
                {
                    Id = 6,
                    FirstName = "Liam",
                    LastName = "Wilson",
                    Email = "liam.wilson@example.com",
                    PhoneNumber = "0471000006",
                    DateOfBirth = new DateTime(1993, 1, 30),
                    HireDate = new DateTime(2025, 11, 18),
                    Status = EmployeeStatus.Active,
                    Salary = 3500,
                    DepartmentId = 1,
                    JobPositionId = 1
                },
                new Employee
                {
                    Id = 7,
                    FirstName = "Mia",
                    LastName = "Anderson",
                    Email = "mia.anderson@example.com",
                    PhoneNumber = "0471000007",
                    DateOfBirth = new DateTime(1997, 5, 14),
                    HireDate = new DateTime(2025, 12, 2),
                    Status = EmployeeStatus.OnLeave,
                    Salary = 2800,
                    DepartmentId = 4,
                    JobPositionId = 4
                },
                new Employee
                {
                    Id = 8,
                    FirstName = "Ethan",
                    LastName = "Taylor",
                    Email = "ethan.taylor@example.com",
                    PhoneNumber = "0471000008",
                    DateOfBirth = new DateTime(1994, 9, 21),
                    HireDate = new DateTime(2026, 1, 12),
                    Status = EmployeeStatus.Active,
                    Salary = 3200,
                    DepartmentId = 2,
                    JobPositionId = 2
                },
                new Employee
                {
                    Id = 9,
                    FirstName = "Charlotte",
                    LastName = "Thomas",
                    Email = "charlotte.thomas@example.com",
                    PhoneNumber = "0471000009",
                    DateOfBirth = new DateTime(1999, 3, 3),
                    HireDate = new DateTime(2026, 2, 9),
                    Status = EmployeeStatus.Active,
                    Salary = 3000,
                    DepartmentId = 3,
                    JobPositionId = 3
                },
                new Employee
                {
                    Id = 10,
                    FirstName = "James",
                    LastName = "Moore",
                    Email = "james.moore@example.com",
                    PhoneNumber = "0471000010",
                    DateOfBirth = new DateTime(1989, 6, 26),
                    HireDate = new DateTime(2026, 3, 3),
                    Status = EmployeeStatus.Active,
                    Salary = 4100,
                    DepartmentId = 1,
                    JobPositionId = 1
                },
                new Employee
                {
                    Id = 11,
                    FirstName = "Amelia",
                    LastName = "Jackson",
                    Email = "amelia.jackson@example.com",
                    PhoneNumber = "0471000011",
                    DateOfBirth = new DateTime(1996, 12, 8),
                    HireDate = new DateTime(2026, 3, 20),
                    Status = EmployeeStatus.Active,
                    Salary = 2700,
                    DepartmentId = 4,
                    JobPositionId = 4
                },
                new Employee
                {
                    Id = 12,
                    FirstName = "Benjamin",
                    LastName = "White",
                    Email = "benjamin.white@example.com",
                    PhoneNumber = "0471000012",
                    DateOfBirth = new DateTime(1991, 10, 11),
                    HireDate = new DateTime(2026, 4, 7),
                    Status = EmployeeStatus.Active,
                    Salary = 3900,
                    DepartmentId = 5,
                    JobPositionId = 5
                },
                new Employee
                {
                    Id = 13,
                    FirstName = "Isabella",
                    LastName = "Harris",
                    Email = "isabella.harris@example.com",
                    PhoneNumber = "0471000013",
                    DateOfBirth = new DateTime(1998, 6, 19),
                    HireDate = new DateTime(2026, 5, 4),
                    Status = EmployeeStatus.Active,
                    Salary = 3200,
                    DepartmentId = 3,
                    JobPositionId = 3
                },
                new Employee
                {
                    Id = 14,
                    FirstName = "Henry",
                    LastName = "Clark",
                    Email = "henry.clark@example.com",
                    PhoneNumber = "0471000014",
                    DateOfBirth = new DateTime(1994, 4, 1),
                    HireDate = new DateTime(2026, 5, 25),
                    Status = EmployeeStatus.Terminated,
                    Salary = 3000,
                    DepartmentId = 2,
                    JobPositionId = 2
                },
                new Employee
                {
                    Id = 15,
                    FirstName = "Ava",
                    LastName = "Lewis",
                    Email = "ava.lewis@example.com",
                    PhoneNumber = "0471000015",
                    DateOfBirth = new DateTime(1997, 8, 15),
                    HireDate = new DateTime(2026, 6, 8),
                    Status = EmployeeStatus.Active,
                    Salary = 3600,
                    DepartmentId = 1,
                    JobPositionId = 1
                },
                new Employee
                {
                    Id = 16,
                    FirstName = "Alexander",
                    LastName = "Walker",
                    Email = "alexander.walker@example.com",
                    PhoneNumber = "0471000016",
                    DateOfBirth = new DateTime(1992, 2, 27),
                    HireDate = new DateTime(2026, 6, 22),
                    Status = EmployeeStatus.Active,
                    Salary = 3300,
                    DepartmentId = 5,
                    JobPositionId = 5
                },
                new Employee
                {
                    Id = 17,
                    FirstName = "Emily",
                    LastName = "Hall",
                    Email = "emily.hall@example.com",
                    PhoneNumber = "0471000017",
                    DateOfBirth = new DateTime(2000, 1, 13),
                    HireDate = new DateTime(2026, 7, 6),
                    Status = EmployeeStatus.Active,
                    Salary = 2800,
                    DepartmentId = 4,
                    JobPositionId = 4
                },
                new Employee
                {
                    Id = 18,
                    FirstName = "Daniel",
                    LastName = "Young",
                    Email = "daniel.young@example.com",
                    PhoneNumber = "0471000018",
                    DateOfBirth = new DateTime(1995, 11, 29),
                    HireDate = new DateTime(2026, 7, 21),
                    Status = EmployeeStatus.Active,
                    Salary = 3700,
                    DepartmentId = 1,
                    JobPositionId = 1
                },
                new Employee
                {
                    Id = 19,
                    FirstName = "Ella",
                    LastName = "King",
                    Email = "ella.king@example.com",
                    PhoneNumber = "0471000019",
                    DateOfBirth = new DateTime(1999, 9, 7),
                    HireDate = new DateTime(2026, 8, 3),
                    Status = EmployeeStatus.OnLeave,
                    Salary = 2950,
                    DepartmentId = 3,
                    JobPositionId = 3
                },
                new Employee
                {
                    Id = 20,
                    FirstName = "Matthew",
                    LastName = "Wright",
                    Email = "matthew.wright@example.com",
                    PhoneNumber = "0471000020",
                    DateOfBirth = new DateTime(1993, 5, 18),
                    HireDate = new DateTime(2026, 8, 17),
                    Status = EmployeeStatus.Active,
                    Salary = 3150,
                    DepartmentId = 2,
                    JobPositionId = 2
                },
                new Employee
                {
                    Id = 21,
                    FirstName = "Grace",
                    LastName = "Scott",
                    Email = "grace.scott@example.com",
                    PhoneNumber = "0471000021",
                    DateOfBirth = new DateTime(1996, 3, 24),
                    HireDate = new DateTime(2026, 9, 1),
                    Status = EmployeeStatus.Active,
                    Salary = 3450,
                    DepartmentId = 5,
                    JobPositionId = 5
                },
                new Employee
                {
                    Id = 22,
                    FirstName = "Samuel",
                    LastName = "Green",
                    Email = "samuel.green@example.com",
                    PhoneNumber = "0471000022",
                    DateOfBirth = new DateTime(1991, 7, 16),
                    HireDate = new DateTime(2026, 9, 14),
                    Status = EmployeeStatus.Active,
                    Salary = 4000,
                    DepartmentId = 1,
                    JobPositionId = 1
                },
                new Employee
                {
                    Id = 23,
                    FirstName = "Chloe",
                    LastName = "Baker",
                    Email = "chloe.baker@example.com",
                    PhoneNumber = "0471000023",
                    DateOfBirth = new DateTime(1998, 10, 2),
                    HireDate = new DateTime(2026, 10, 1),
                    Status = EmployeeStatus.Active,
                    Salary = 2850,
                    DepartmentId = 3,
                    JobPositionId = 3
                },
                new Employee
                {
                    Id = 24,
                    FirstName = "Jack",
                    LastName = "Adams",
                    Email = "jack.adams@example.com",
                    PhoneNumber = "0471000024",
                    DateOfBirth = new DateTime(1995, 12, 20),
                    HireDate = new DateTime(2026, 10, 5),
                    Status = EmployeeStatus.Active,
                    Salary = 3500,
                    DepartmentId = 2,
                    JobPositionId = 2
                },
                new Employee
                {
                    Id = 25,
                    FirstName = "Lily",
                    LastName = "Nelson",
                    Email = "lily.nelson@example.com",
                    PhoneNumber = "0471000025",
                    DateOfBirth = new DateTime(1997, 4, 28),
                    HireDate = new DateTime(2026, 10, 7),
                    Status = EmployeeStatus.OnLeave,
                    Salary = 3100,
                    DepartmentId = 4,
                    JobPositionId = 4
                }
            );
        }
    }
}
