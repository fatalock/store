using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenCommerce.Api.Data;
using OpenCommerce.Api.Models;
using OpenCommerce.Api.Models.Requests;

namespace OpenCommerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController(ApplicationDbContext context) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
    {
        if (request == null || !request.OrderItems.Any())
            return BadRequest("Sipariş verisi eksik.");

        var order = new Order
        {
            UserId = request.UserId,
            CreatedAt = DateTime.UtcNow,
            Status = "Pending"
        };

        decimal totalPrice = 0m;

        foreach (var item in request.OrderItems)
        {
            var product = await context.Products.FindAsync(item.ProductId);
            if (product == null)
                return NotFound($"Ürün bulunamadı: {item.ProductId}");

            if (product.StockQuantity < item.Quantity)
                return BadRequest($"Stok yetersiz: {product.Name}");

            // Stok azalt
            product.StockQuantity -= item.Quantity;

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                Quantity = item.Quantity,
                UnitPrice = product.Price,
                OrderItemTotalPrice = product.Price * item.Quantity
            };

            order.OrderItems.Add(orderItem);

            totalPrice += orderItem.OrderItemTotalPrice;
        }

        // TotalPrice hesapla
        order.TotalPrice = totalPrice;

        await context.Orders.AddAsync(order);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(Guid id)
    {
        var order = await context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
            return NotFound();

        return Ok(order);
    }
}
