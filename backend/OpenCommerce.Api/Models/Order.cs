namespace OpenCommerce.Api.Models;

public class Order
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }  // Siparişi veren kullanıcı
    public User? User { get; set; }    // Navigation Property

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public decimal TotalPrice { get; set; }  // İstersen bunu daha sonra OrderItem üzerinden hesaplatabiliriz
    public string Status { get; set; } = "Pending"; // Pending, Paid, Shipped, Completed gibi

    // Siparişe ait ürünler
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

}
