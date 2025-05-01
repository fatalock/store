namespace OpenCommerce.Api.Models;

public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }

    public Guid? ParentCategoryId { get; set; }  //  Self-referencing Foreign Key
    public Category? ParentCategory { get; set; } // Navigation Property
    public ICollection<Category> SubCategories { get; set; } = new List<Category>(); // Alt kategoriler


    // Ters ilişki → bu kategoriye bağlı ürünler
    public ICollection<Product> Products { get; set; } = new List<Product>();
}
