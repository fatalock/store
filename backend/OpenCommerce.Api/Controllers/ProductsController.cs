using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenCommerce.Api.Data;
using OpenCommerce.Api.Models;
using FluentValidation;

namespace OpenCommerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(ApplicationDbContext context, IValidator<Product> validator) : ControllerBase
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
        var validationResult = await validator.ValidateAsync(product);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage);
            return BadRequest(errors);
        }

        var existingProduct = await context.Products.FirstOrDefaultAsync(p => p.Name == product.Name);
        if (existingProduct != null)
            return Conflict("Bu isimde zaten bir ürün mevcut.");

        await context.Products.AddAsync(product);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPost("{id}/addstock")]
    public async Task<IActionResult> AddStock(Guid id, [FromBody] int quantityToAdd)
    {
        var product = await context.Products.FindAsync(id);
        if (product == null)
            return NotFound();

        if (quantityToAdd <= 0)
            return BadRequest("Eklenen miktar pozitif olmalıdır.");

        product.StockQuantity += quantityToAdd;

        await context.SaveChangesAsync();

        return NoContent();
    }
    [HttpPatch("{id}/price")]
    public async Task<IActionResult> UpdateProductPrice(Guid id, [FromBody] decimal newPrice)
    {
        var product = await context.Products.FindAsync(id);
        if (product == null)
            return NotFound();

        if (newPrice <= 0 || newPrice >= product.Price)
            return BadRequest("yeni fiyat geçerli değil.");

        product.OldPrice = product.Price;       // Mevcut fiyatı eski fiyat olarak kaydet
        product.Price = newPrice;      // Yeni fiyatı ayarla

        product.IsDiscounted = product.OldPrice.HasValue && newPrice < product.OldPrice.Value;

        await context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(Guid id)
    {
        var product = await context.Products.FindAsync(id);
        if (product == null)
            return NotFound();

        context.Products.Remove(product);
        await context.SaveChangesAsync();
        return NoContent();
    }

}
