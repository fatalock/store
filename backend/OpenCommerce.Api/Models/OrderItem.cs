namespace OpenCommerce.Api.Models;

public class OrderItem
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid OrderId { get; set; }
    public Order? Order { get; set; }

    public Guid ProductId { get; set; }
    public Product? Product { get; set; }

    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal OrderItemTotalPrice { get; private set; }

    public OrderItem(int quantity, decimal unitPrice)
    {
        Quantity = quantity;
        UnitPrice = unitPrice;
        OrderItemTotalPrice = quantity * unitPrice;
    }

    // Parameterless constructor (EF Core için zorunlu!)
    public OrderItem() { }
}
