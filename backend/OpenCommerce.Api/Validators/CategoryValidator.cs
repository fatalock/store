using FluentValidation;
using Microsoft.EntityFrameworkCore;
using OpenCommerce.Api.Models;
using OpenCommerce.Api.Data;

public class CategoryValidator : AbstractValidator<Category>
{
    private readonly ApplicationDbContext _context;

    public CategoryValidator(ApplicationDbContext context)
    {
        _context = context;

        RuleFor(c => c.Name)
            .NotEmpty().WithMessage("Kategori adı boş olamaz")
            .MaximumLength(100).WithMessage("Kategori adı en fazla 100 karakter olabilir")
            .MustAsync(BeUniqueName).WithMessage("Bu isimde bir kategori zaten var.");

        RuleFor(c => c.ParentCategoryId)
            .MustAsync(ParentExistsOrNull)
            .WithMessage("Geçersiz üst kategori ID'si.");
    }

    private async Task<bool> BeUniqueName(string name, CancellationToken ct)
    {
        return !await _context.Categories
            .AnyAsync(c => c.Name.ToLower() == name.ToLower(), ct);
    }

    private async Task<bool> ParentExistsOrNull(Guid? parentId, CancellationToken ct)
    {
        if (!parentId.HasValue)
            return true; // Parent yoksa sorun yok

        return await _context.Categories.AnyAsync(c => c.Id == parentId.Value, ct);
    }
}
