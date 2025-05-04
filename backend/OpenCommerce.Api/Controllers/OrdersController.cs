using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenCommerce.Api.Data;
using OpenCommerce.Api.Models;
using OpenCommerce.Api.Models.Requests;
using FluentValidation;

namespace OpenCommerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController(ApplicationDbContext context, IValidator<CreateOrderRequest> validator) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
    {
        var validationResult = await validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage);
            return BadRequest(errors);
        }

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

    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await context.Orders
            .Select(u => new
            {
                u.Id,
                u.UserId,
                u.TotalPrice,
                u.Status,
                u.CreatedAt
            })
            .ToListAsync();

        return Ok(orders);
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
    [HttpGet("byuser/{userId}")]
    public async Task<IActionResult> GetOrdersByUserId(Guid userId)
    {
        var orders = await context.Orders
            .Where(o => o.UserId == userId)
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .ToListAsync();

        if (!orders.Any())
            return NotFound("Bu kullanıcıya ait sipariş bulunamadı.");

        return Ok(orders);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(Guid id)
    {
        var order = await context.Orders.FindAsync(id);
        if (order == null)
            return NotFound();

        context.Orders.Remove(order);
        await context.SaveChangesAsync();
        return NoContent();
    }


}
