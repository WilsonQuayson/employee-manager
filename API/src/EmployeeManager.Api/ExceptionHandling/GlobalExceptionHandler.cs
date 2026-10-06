using EmployeeManager.Application.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManager.Api.ExceptionHandling
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            _logger.LogError(exception, "An exception occurred: {Message}", exception.Message);

            var (statusCode, title) = exception switch
            {
                BadRequestException => (
                    StatusCodes.Status400BadRequest,
                    "Bad Request"),

                ConflictException => (
                    StatusCodes.Status409Conflict,
                    "Conflict"),

                _ => (
                    StatusCodes.Status500InternalServerError,
                    "Internal Server Error")
            };

            var problemDetails = new ProblemDetails
            {
                Status = statusCode,
                Title = title,
                Detail = exception is BadRequestException or ConflictException
                    ? exception.Message
                    : "An unexpected error occurred."
            };

            httpContext.Response.StatusCode = statusCode;

            await httpContext.Response.WriteAsJsonAsync(
                problemDetails,
                cancellationToken);

            return true;
        }
    }
}
