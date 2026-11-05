using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeManager.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddOrganizationConstraints : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Departments_DepartmentId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_JobPositions_JobPositionId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_JobPositions_OrganizationId",
                table: "JobPositions");

            migrationBuilder.DropIndex(
                name: "IX_Employees_DepartmentId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_JobPositionId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_OrganizationId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Departments_OrganizationId",
                table: "Departments");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "JobPositions",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Employees",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Employees",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Departments",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_JobPositions_Id_OrganizationId",
                table: "JobPositions",
                columns: new[] { "Id", "OrganizationId" });

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Departments_Id_OrganizationId",
                table: "Departments",
                columns: new[] { "Id", "OrganizationId" });

            migrationBuilder.CreateIndex(
                name: "IX_JobPositions_OrganizationId_Title",
                table: "JobPositions",
                columns: new[] { "OrganizationId", "Title" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DepartmentId_OrganizationId",
                table: "Employees",
                columns: new[] { "DepartmentId", "OrganizationId" });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_JobPositionId_OrganizationId",
                table: "Employees",
                columns: new[] { "JobPositionId", "OrganizationId" });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_OrganizationId_Email",
                table: "Employees",
                columns: new[] { "OrganizationId", "Email" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_OrganizationId_PhoneNumber",
                table: "Employees",
                columns: new[] { "OrganizationId", "PhoneNumber" },
                unique: true,
                filter: "[PhoneNumber] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Departments_OrganizationId_Name",
                table: "Departments",
                columns: new[] { "OrganizationId", "Name" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Departments_DepartmentId_OrganizationId",
                table: "Employees",
                columns: new[] { "DepartmentId", "OrganizationId" },
                principalTable: "Departments",
                principalColumns: new[] { "Id", "OrganizationId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_JobPositions_JobPositionId_OrganizationId",
                table: "Employees",
                columns: new[] { "JobPositionId", "OrganizationId" },
                principalTable: "JobPositions",
                principalColumns: new[] { "Id", "OrganizationId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Departments_DepartmentId_OrganizationId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_JobPositions_JobPositionId_OrganizationId",
                table: "Employees");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_JobPositions_Id_OrganizationId",
                table: "JobPositions");

            migrationBuilder.DropIndex(
                name: "IX_JobPositions_OrganizationId_Title",
                table: "JobPositions");

            migrationBuilder.DropIndex(
                name: "IX_Employees_DepartmentId_OrganizationId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_JobPositionId_OrganizationId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_OrganizationId_Email",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_OrganizationId_PhoneNumber",
                table: "Employees");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Departments_Id_OrganizationId",
                table: "Departments");

            migrationBuilder.DropIndex(
                name: "IX_Departments_OrganizationId_Name",
                table: "Departments");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "JobPositions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150);

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(30)",
                oldMaxLength: 30,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Departments",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150);

            migrationBuilder.CreateIndex(
                name: "IX_JobPositions_OrganizationId",
                table: "JobPositions",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DepartmentId",
                table: "Employees",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_JobPositionId",
                table: "Employees",
                column: "JobPositionId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_OrganizationId",
                table: "Employees",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Departments_OrganizationId",
                table: "Departments",
                column: "OrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Departments_DepartmentId",
                table: "Employees",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_JobPositions_JobPositionId",
                table: "Employees",
                column: "JobPositionId",
                principalTable: "JobPositions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
