using FluentValidation;
using OpenCommerce.Api.Models;
using OpenCommerce.Api.Data;
using Microsoft.EntityFrameworkCore;


public class ProductValidator : AbstractValidator<Product>
{
    private readonly ApplicationDbContext _context;
    public ProductValidator(ApplicationDbContext context)
    {
        _context = context;
        RuleFor(p => p.Name)
            .NotEmpty().WithMessage("Ürün adı boş olamaz")
            .MaximumLength(100).WithMessage("Ürün adı en fazla 100 karakter olabilir")
            .MustAsync(BeUniqueName).WithMessage("Bu isim zaten kayıtlı.");

        RuleFor(p => p.Price)
            .GreaterThan(0).WithMessage("Fiyat 0'dan büyük olmalı");
        
        RuleFor(p => p.Description)
            .MaximumLength(500).WithMessage("Açıklama en fazla 500 karakter olabilir.");

        RuleFor(p => p.StockQuantity)
            .GreaterThanOrEqualTo(0).WithMessage("Stok negatif olamaz");

        RuleFor(p => p.CategoryId)
            .NotEmpty().WithMessage("Kategori seçimi zorunludur");

        RuleFor(p => p.ImageUrl)
            .MaximumLength(500).WithMessage("Görsel URL'si çok uzun");
    }
        private async Task<bool> BeUniqueName(string name, CancellationToken ct)
    {
        return !await _context.Products.AnyAsync(u => u.Name.ToLower() == name.ToLower(), ct);
    }
}
