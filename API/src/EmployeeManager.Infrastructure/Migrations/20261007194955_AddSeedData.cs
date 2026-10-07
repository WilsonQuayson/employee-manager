using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EmployeeManager.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Engineering" },
                    { 2, "Sales" },
                    { 3, "Marketing" },
                    { 4, "Human Resources" },
                    { 5, "Finance" }
                });

            migrationBuilder.InsertData(
                table: "JobPositions",
                columns: new[] { "Id", "MaximumSalary", "MinimumSalary", "Title" },
                values: new object[,]
                {
                    { 1, 4500m, 2800m, "Software Developer" },
                    { 2, 4000m, 2500m, "Sales Representative" },
                    { 3, 4000m, 2500m, "Marketing Specialist" },
                    { 4, 4200m, 2600m, "HR Specialist" },
                    { 5, 4500m, 2800m, "Financial Analyst" }
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "DateOfBirth", "DepartmentId", "Email", "FirstName", "HireDate", "JobPositionId", "LastName", "PhoneNumber", "Salary", "Status" },
                values: new object[,]
                {
                    { 1, new DateTime(1995, 4, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "emma.johnson@example.com", "Emma", new DateTime(2025, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "Johnson", "0471000001", 3400m, 0 },
                    { 2, new DateTime(1992, 8, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "lucas.martin@example.com", "Lucas", new DateTime(2025, 7, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "Martin", "0471000002", 3800m, 0 },
                    { 3, new DateTime(1998, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "sophie.williams@example.com", "Sophie", new DateTime(2025, 8, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "Williams", "0471000003", 2900m, 0 },
                    { 4, new DateTime(1990, 11, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "noah.brown@example.com", "Noah", new DateTime(2025, 9, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "Brown", "0471000004", 3600m, 0 },
                    { 5, new DateTime(1996, 7, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "olivia.davis@example.com", "Olivia", new DateTime(2025, 10, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "Davis", "0471000005", 3100m, 0 },
                    { 6, new DateTime(1993, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "liam.wilson@example.com", "Liam", new DateTime(2025, 11, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "Wilson", "0471000006", 3500m, 0 },
                    { 7, new DateTime(1997, 5, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "mia.anderson@example.com", "Mia", new DateTime(2025, 12, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "Anderson", "0471000007", 2800m, 1 },
                    { 8, new DateTime(1994, 9, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "ethan.taylor@example.com", "Ethan", new DateTime(2026, 1, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "Taylor", "0471000008", 3200m, 0 },
                    { 9, new DateTime(1999, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "charlotte.thomas@example.com", "Charlotte", new DateTime(2026, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "Thomas", "0471000009", 3000m, 0 },
                    { 10, new DateTime(1989, 6, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "james.moore@example.com", "James", new DateTime(2026, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "Moore", "0471000010", 4100m, 0 },
                    { 11, new DateTime(1996, 12, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "amelia.jackson@example.com", "Amelia", new DateTime(2026, 3, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "Jackson", "0471000011", 2700m, 0 },
                    { 12, new DateTime(1991, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "benjamin.white@example.com", "Benjamin", new DateTime(2026, 4, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "White", "0471000012", 3900m, 0 },
                    { 13, new DateTime(1998, 6, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "isabella.harris@example.com", "Isabella", new DateTime(2026, 5, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "Harris", "0471000013", 3200m, 0 },
                    { 14, new DateTime(1994, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "henry.clark@example.com", "Henry", new DateTime(2026, 5, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "Clark", "0471000014", 3000m, 2 },
                    { 15, new DateTime(1997, 8, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "ava.lewis@example.com", "Ava", new DateTime(2026, 6, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "Lewis", "0471000015", 3600m, 0 },
                    { 16, new DateTime(1992, 2, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "alexander.walker@example.com", "Alexander", new DateTime(2026, 6, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "Walker", "0471000016", 3300m, 0 },
                    { 17, new DateTime(2000, 1, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "emily.hall@example.com", "Emily", new DateTime(2026, 7, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "Hall", "0471000017", 2800m, 0 },
                    { 18, new DateTime(1995, 11, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "daniel.young@example.com", "Daniel", new DateTime(2026, 7, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "Young", "0471000018", 3700m, 0 },
                    { 19, new DateTime(1999, 9, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "ella.king@example.com", "Ella", new DateTime(2026, 8, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "King", "0471000019", 2950m, 1 },
                    { 20, new DateTime(1993, 5, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "matthew.wright@example.com", "Matthew", new DateTime(2026, 8, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "Wright", "0471000020", 3150m, 0 },
                    { 21, new DateTime(1996, 3, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "grace.scott@example.com", "Grace", new DateTime(2026, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "Scott", "0471000021", 3450m, 0 },
                    { 22, new DateTime(1991, 7, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "samuel.green@example.com", "Samuel", new DateTime(2026, 9, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "Green", "0471000022", 4000m, 0 },
                    { 23, new DateTime(1998, 10, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "chloe.baker@example.com", "Chloe", new DateTime(2026, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "Baker", "0471000023", 2850m, 0 },
                    { 24, new DateTime(1995, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "jack.adams@example.com", "Jack", new DateTime(2026, 10, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "Adams", "0471000024", 3500m, 0 },
                    { 25, new DateTime(1997, 4, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "lily.nelson@example.com", "Lily", new DateTime(2026, 10, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "Nelson", "0471000025", 3100m, 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "JobPositions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "JobPositions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "JobPositions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "JobPositions",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "JobPositions",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
