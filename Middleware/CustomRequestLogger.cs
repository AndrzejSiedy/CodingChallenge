using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodingChallenge.Middleware
{
    public class CustomRequestMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;

        public CustomRequestMiddleware(RequestDelegate next, ILoggerFactory logFactory)
        {
            _next = next;
            _logger = logFactory.CreateLogger("CustomRequestLogger");
        }

        public async Task Invoke(HttpContext httpContext)
        {
            _logger.LogInformation("CustomRequestLogger executing..");
            await _next(httpContext); // calling next middleware

        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class CustomRequestMiddlewareExtensions
    {
        public static IApplicationBuilder UseCustomRequestMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CustomRequestMiddleware>();
        }
    }
}
