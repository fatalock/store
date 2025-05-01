using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenCommerce.Api.Data;
using OpenCommerce.Api.Models;
using FluentValidation;

namespace OpenCommerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(ApplicationDbContext context, IValidator<User> validator) : ControllerBase
{

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

}
