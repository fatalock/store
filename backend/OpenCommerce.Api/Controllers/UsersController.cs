using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenCommerce.Api.Data;
using OpenCommerce.Api.Models;

namespace OpenCommerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(ApplicationDbContext context) : ControllerBase
{

    // POST: /api/users
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] User user)
    {
        if (user == null)
            return BadRequest();

        // Aynı email ile kullanıcı var mı kontrolü
        var existingUser = await context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
        if (existingUser != null)
            return Conflict("Bu email zaten kayıtlı.");

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
