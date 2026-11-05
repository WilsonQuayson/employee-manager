using EmployeeManager.Domain.Entities;
using EmployeeManager.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Infrastructure.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<ApplicationUser>(options)
    {
        public DbSet<Employee> Employees => Set<Employee>();
        public DbSet<Department> Departments => Set<Department>();
        public DbSet<JobPosition> JobPositions => Set<JobPosition>();
        public DbSet<Organization> Organizations => Set<Organization>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Organization>()
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(o => o.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Organization>()
                .HasIndex(o => o.OwnerId)
                .IsUnique();

            modelBuilder.Entity<Organization>()
                .Property(o => o.Name)
                .HasMaxLength(150)
                .IsRequired();


            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Organization)
                .WithMany(o => o.Employees)
                .HasForeignKey(e => e.OrganizationId)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Department>()
                .HasOne(d => d.Organization)
                .WithMany(o => o.Departments)
                .HasForeignKey(d => d.OrganizationId)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<JobPosition>()
                .HasOne(j => j.Organization)
                .WithMany(o => o.JobPositions)
                .HasForeignKey(j => j.OrganizationId)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Department)
                .WithMany(d => d.Employees)
                .HasForeignKey(e => new { e.DepartmentId, e.OrganizationId })
                .HasPrincipalKey(d => new { d.Id, d.OrganizationId })
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Employee>()
                .HasOne(e => e.JobPosition)
                .WithMany(j => j.Employees)
                .HasForeignKey(e => new { e.JobPositionId, e.OrganizationId })
                .HasPrincipalKey(j => new { j.Id, j.OrganizationId })
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Employee>()
                .Property(e => e.Email)
                .HasMaxLength(256)
                .IsRequired();

            modelBuilder.Entity<Employee>()
                .Property(e => e.PhoneNumber)
                .HasMaxLength(30);

            modelBuilder.Entity<Employee>()
                .HasIndex(e => new { e.OrganizationId, e.Email })
                .IsUnique();

            modelBuilder.Entity<Employee>()
                .HasIndex(e => new { e.OrganizationId, e.PhoneNumber })
                .IsUnique()
                .HasFilter("[PhoneNumber] IS NOT NULL");


            modelBuilder.Entity<Department>()
                .Property(d => d.Name)
                .HasMaxLength(150)
                .IsRequired();

            modelBuilder.Entity<Department>()
                .HasIndex(d => new { d.OrganizationId, d.Name })
                .IsUnique();


            modelBuilder.Entity<JobPosition>()
                .Property(j => j.Title)
                .HasMaxLength(150)
                .IsRequired();

            modelBuilder.Entity<JobPosition>()
                .HasIndex(j => new { j.OrganizationId, j.Title })
                .IsUnique();


            modelBuilder.Entity<Employee>()
                .Property(e => e.Salary)
                .HasPrecision(18, 2);

            modelBuilder.Entity<JobPosition>()
                .Property(j => j.MinimumSalary)
                .HasPrecision(18, 2);

            modelBuilder.Entity<JobPosition>()
                .Property(j => j.MaximumSalary)
                .HasPrecision(18, 2);
        }
    }
}
