using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenCommerce.Api.Data;
using OpenCommerce.Api.Models;

namespace OpenCommerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(ApplicationDbContext context) : ControllerBase
{

    // GET: /api/products
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await context.Products.ToListAsync();
        return Ok(products);
    }

    // GET: /api/products/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        return Ok(product);
    }
    // GET: /api/products/bycategory/{categoryId}
    [HttpGet("bycategory/{categoryId}")]
    public async Task<IActionResult> GetByCategory(Guid categoryId)
    {
        var products = await context.Products
            .Where(p => p.CategoryId == categoryId)
            .ToListAsync();

        return Ok(products);
    }


    // GET: /api/products/byparentcategory/{parentCategoryId}
    [HttpGet("byparentcategory/{parentCategoryId}")]
    public async Task<IActionResult> GetProductsByParentCategory(Guid parentCategoryId)
    {
        // Alt kategorileri bul
        var subCategoryIds = await context.Categories
            .Where(c => c.ParentCategoryId == parentCategoryId)
            .Select(c => c.Id)
            .ToListAsync();

        if (!subCategoryIds.Any())
            return Ok(new List<Product>()); // Alt kategori yoksa boş liste döneriz

        // Alt kategorilere bağlı ürünleri bul
        var products = await context.Products
            .Where(p => subCategoryIds.Contains(p.CategoryId))
            .ToListAsync();

        return Ok(products);
    }

    // POST: /api/products
    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] Product product)
    {
        if (product == null)
            return BadRequest();

        await context.Products.AddAsync(product);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }
}
