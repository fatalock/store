using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenCommerce.Api.Data;
using OpenCommerce.Api.Models;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(ApplicationDbContext context) : ControllerBase
{

    // GET: /api/categories/{parentCategoryId}/subcategories
    [HttpGet("{parentCategoryId}/subcategories")]
    public async Task<IActionResult> GetSubCategories(Guid parentCategoryId)
    {
        var subCategories = await context.Categories
            .Where(c => c.ParentCategoryId == parentCategoryId)
            .ToListAsync();

        return Ok(subCategories);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] Category category)
    {
        if (category == null || string.IsNullOrWhiteSpace(category.Name))
            return BadRequest("Kategori adı boş olamaz.");

        await context.Categories.AddAsync(category);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
    }

    // Şu an varsa, yoksa aşağıya ekleyebilirsin:
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoryById(Guid id)
    {
        var category = await context.Categories.FindAsync(id);

        if (category == null)
            return NotFound();

        return Ok(category);
    }
    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await context.Categories.ToListAsync();
        return Ok(categories);
    }

}
