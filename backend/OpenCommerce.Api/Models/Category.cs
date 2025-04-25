namespace OpenCommerce.Api.Models;

public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }

    // Ters ilişki → bu kategoriye bağlı ürünler
    public ICollection<Product> Products { get; set; } = new List<Product>();
}
