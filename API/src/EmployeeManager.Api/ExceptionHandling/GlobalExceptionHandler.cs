using EmployeeManager.Application.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManager.Api.ExceptionHandling
{
    public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var (statusCode, title) = exception switch
            {
                BadRequestException or ArgumentException => (
                    StatusCodes.Status400BadRequest,
                    "Bad Request"),

                KeyNotFoundException => (
                    StatusCodes.Status404NotFound,
                    "Not Found"),

                ConflictException => (
                    StatusCodes.Status409Conflict,
                    "Conflict"),

                _ => (
                    StatusCodes.Status500InternalServerError,
                    "Internal Server Error")
            };

            logger.LogError(exception, "Request failed with status {StatusCode}", statusCode);

            var problemDetails = new ProblemDetails
            {
                Status = statusCode,
                Title = title,
                Detail = exception is BadRequestException
                    or ArgumentException
                    or KeyNotFoundException
                    or ConflictException
                    ? exception.Message
                    : "An unexpected error occurred."
            };

            httpContext.Response.StatusCode = statusCode;

            await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

            return true;
        }
    }
}
