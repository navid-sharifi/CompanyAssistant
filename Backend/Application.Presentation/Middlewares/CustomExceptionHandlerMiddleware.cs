﻿using App.Domain.Validation;
using App.Utility;
using App.Utility.Exceptions;
using Application.Presentation.Filter;
using System.Net;
using System.Text.Json;


namespace Application.Presentation.Middlewares
{

    public static class CustomExceptionHandlerMiddlewareExtensions
    {
        public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CustomExceptionHandlerMiddleware>();
        }
    }

    public class CustomExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<CustomExceptionHandlerMiddleware> _logger;

        public CustomExceptionHandlerMiddleware(RequestDelegate next,
            IWebHostEnvironment env,
            ILogger<CustomExceptionHandlerMiddleware> logger)
        {
            _next = next;
            _env = env;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            string message = null;
            HttpStatusCode httpStatusCode = HttpStatusCode.InternalServerError;
            ApiResultStatusCode apiStatusCode = ApiResultStatusCode.ServerError;

            try
            {
                await _next(context);
            }
            catch (AppException exception)
            {
                _logger.LogError(exception, exception.Message);
                httpStatusCode = exception.HttpStatusCode;
                apiStatusCode = exception.ApiStatusCode;

                if (_env.IsDevelopment())
                {
                    var dic = new Dictionary<string, string>
                    {
                        ["Exception"] = exception.Message,
                        ["StackTrace"] = exception.StackTrace,
                    };
                    if (exception.InnerException != null)
                    {
                        dic.Add("InnerException.Exception", exception.InnerException.Message);
                        dic.Add("InnerException.StackTrace", exception.InnerException.StackTrace);
                    }
                    if (exception.AdditionalData != null)
                        dic.Add("AdditionalData", JsonSerializer.Serialize(exception.AdditionalData));

                    message = JsonSerializer.Serialize(dic);
                }
                else
                {
                    message = exception.Message;
                }
                await WriteToResponseAsync();
            }
            catch (ValidationException exception)
            {
                //_logger.LogInformation(exception, exception.Message);
                httpStatusCode = HttpStatusCode.BadRequest;
                apiStatusCode = ApiResultStatusCode.LogicError;
                message = exception.Message;

                await WriteToResponseAsync();
            }

            catch (EntityNotValidException exception)
            {
                _logger.LogError(exception, exception.Message);

                var dic = new Dictionary<string, string>
                {
                    ["Exception"] = exception.Message,
                    ["Detail"] = Newtonsoft.Json.JsonConvert.SerializeObject(exception.AdditionalData),
                    //["IsSuccess"] = false.ToString(),
                    //["StatusCode"] = ApiResultStatusCode.ServerError.ToString()
                };

                message = JsonSerializer.Serialize(dic);

                await WriteToResponseAsync();
            }

            //catch (SecurityTokenExpiredException exception)
            //{
            //    _logger.LogError(exception, exception.Message);
            //    SetUnAuthorizeResponse(exception);
            //    await WriteToResponseAsync();
            //}
            //catch (UnauthorizedAccessException exception)
            //{
            //    _logger.LogError(exception, exception.Message);
            //    SetUnAuthorizeResponse(exception);
            //    await WriteToResponseAsync();
            //}
            catch (Exception exception)
            {
                _logger.LogError(exception, exception.Message);

                if (_env.IsDevelopment())
                {
                    var dic = new Dictionary<string, string>
                    {
                        ["Exception"] = exception.Message,
                        ["StackTrace"] = exception.StackTrace,
                    };
                    message = JsonSerializer.Serialize(dic);
                }
                await WriteToResponseAsync();
            }


            async Task WriteToResponseAsync()
            {
                if (context.Response.HasStarted)
                    throw new InvalidOperationException("The response has already started, the http status code middleware will not be executed.");

                var result = new ApiResult(false, apiStatusCode, message);
                var json = JsonSerializer.Serialize(result);

                context.Response.StatusCode = (int)httpStatusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(json);
            }

            //void SetUnAuthorizeResponse(Exception exception)
            //{
            //    httpStatusCode = HttpStatusCode.Unauthorized;
            //    apiStatusCode = ApiResultStatusCode.UnAuthorized;

            //    if (_env.IsDevelopment())
            //    {
            //        var dic = new Dictionary<string, string>
            //        {
            //            ["Exception"] = exception.Message,
            //            ["StackTrace"] = exception.StackTrace
            //        };
            //        if (exception is SecurityTokenExpiredException tokenException)
            //            dic.Add("Expires", tokenException.Expires.ToString());

            //        message = JsonConvert.SerializeObject(dic);
            //    }
            //}
        }
    }


}
