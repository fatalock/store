using FluentValidation;
using Microsoft.EntityFrameworkCore;
using OpenCommerce.Api.Data;
using OpenCommerce.Api.Models.Requests;

namespace OpenCommerce.Api.Validators;

public class CreateOrderItemRequestValidator : AbstractValidator<CreateOrderItemRequest>
{
    private readonly ApplicationDbContext _context;

    public CreateOrderItemRequestValidator(ApplicationDbContext context)
    {
        _context = context;

        RuleFor(i => i.ProductId)
            .NotEmpty().WithMessage("Ürün ID boş olamaz.")
            .MustAsync(ProductExists).WithMessage("Ürün sistemde bulunamadı.");

        RuleFor(i => i.Quantity)
            .GreaterThan(0).WithMessage("Ürün adedi en az 1 olmalıdır.");
    }

    private async Task<bool> ProductExists(Guid productId, CancellationToken ct)
    {
        return await _context.Products.AnyAsync(p => p.Id == productId, ct);
    }
}
