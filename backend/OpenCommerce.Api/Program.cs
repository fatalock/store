using Microsoft.EntityFrameworkCore;
using OpenCommerce.Api.Data;
using FluentValidation;
using OpenCommerce.Api.Models;
using OpenCommerce.Api.Models.Requests;
using OpenCommerce.Api.Validators;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IValidator<User>, UserValidator>();
builder.Services.AddScoped<UserValidatorForUpdate>();
builder.Services.AddScoped<IValidator<Product>, ProductValidator>();
builder.Services.AddScoped<IValidator<Category>, CategoryValidator>();
builder.Services.AddScoped<IValidator<CreateOrderRequest>, CreateOrderRequestValidator>();
builder.Services.AddScoped<IValidator<CreateOrderItemRequest>, CreateOrderItemRequestValidator>();



builder.Services.AddControllers();



// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });


builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React frontend URL'i
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();

app.MapControllers();
app.UseCors("AllowReactApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();



app.Run();
