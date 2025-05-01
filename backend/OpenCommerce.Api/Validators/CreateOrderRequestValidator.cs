using FluentValidation;
using Microsoft.EntityFrameworkCore;
using OpenCommerce.Api.Data;
using OpenCommerce.Api.Models.Requests;

namespace OpenCommerce.Api.Validators;

public class CreateOrderRequestValidator : AbstractValidator<CreateOrderRequest>
{
    private readonly ApplicationDbContext _context;

    public CreateOrderRequestValidator(ApplicationDbContext context)
    {
        _context = context;

        RuleFor(o => o.UserId)
            .NotEmpty().WithMessage("Kullanıcı ID boş olamaz.")
            .MustAsync(UserExists).WithMessage("Kullanıcı sistemde bulunamadı.");

        RuleFor(o => o.OrderItems)
            .NotEmpty().WithMessage("Sipariş en az bir ürün içermelidir.");

        RuleForEach(o => o.OrderItems)
            .SetValidator(new CreateOrderItemRequestValidator(_context));
    }

    private async Task<bool> UserExists(Guid userId, CancellationToken ct)
    {
        return await _context.Users.AnyAsync(u => u.Id == userId, ct);
    }
}
