namespace OpenCommerce.Api.Models;

public class Product
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public decimal? OldPrice { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public bool IsDiscounted { get; set; } = false;

    public string ImageUrl { get; set; } = string.Empty;


    // İlişki
    public Guid CategoryId { get; set; }
    public Category? Category { get; set; }
}
