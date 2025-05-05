using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenCommerce.Api.Data;
using OpenCommerce.Api.Models;
using FluentValidation;

namespace OpenCommerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(ApplicationDbContext context, IValidator<User> validator, UserValidatorForUpdate validatorPut ) : ControllerBase
{

    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await context.Users
            .Select(u => new
            {
                u.Id,
                u.Name,
                u.Email,
                u.CreatedAt,
                u.PasswordHash
            })
            .ToListAsync();

        return Ok(users);
    }

    // POST: /api/users
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] User user)
    {
        var validationResult = await validator.ValidateAsync(user);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage);
            return BadRequest(errors);  // veya: return ValidationProblem(...)
        }

        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }

    // (İleride kullanıcı detay çekmek için ekleyeceğiz)
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(Guid id)
    {
        var user = await context.Users.FindAsync(id);

        if (user == null)
            return NotFound();

        return Ok(user);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        var user = await context.Users.FindAsync(id);
        if (user == null)
            return NotFound();

        context.Users.Remove(user);
        await context.SaveChangesAsync();
        return NoContent();
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] User updatedUser)
    {
        
        var user = await context.Users.FindAsync(id);
        if (user == null)
            return NotFound();

        user.Name = updatedUser.Name;
        user.Email = updatedUser.Email;
        if (!string.IsNullOrWhiteSpace(updatedUser.PasswordHash))
        {
            user.PasswordHash = updatedUser.PasswordHash;
        }

        var validationResult = await validatorPut.ValidateAsync(user);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage);
            return BadRequest(errors);
        }

        await context.SaveChangesAsync();
        return NoContent();
    }


}
