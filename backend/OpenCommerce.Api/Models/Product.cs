namespace OpenCommerce.Api.Models;

public class Product
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public string ImageUrl { get; set; } = string.Empty;


    // İlişki
    public Guid CategoryId { get; set; }
    public Category? Category { get; set; }
}
