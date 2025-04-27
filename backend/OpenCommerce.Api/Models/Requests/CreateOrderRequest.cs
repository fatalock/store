namespace OpenCommerce.Api.Models.Requests;

public class CreateOrderRequest
{
    public Guid UserId { get; set; }
    public List<CreateOrderItemRequest> OrderItems { get; set; } = new();
}

public class CreateOrderItemRequest
{
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
}
