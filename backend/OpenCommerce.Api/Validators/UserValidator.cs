using FluentValidation;
using OpenCommerce.Api.Models;
using OpenCommerce.Api.Data;
using Microsoft.EntityFrameworkCore;


public class UserValidator : AbstractValidator<User>
{
    private readonly ApplicationDbContext _context;
    public UserValidator(ApplicationDbContext context)
    {
        _context = context;
        RuleFor(u => u.Name)
            .NotEmpty().WithMessage("İsim boş olamaz");

        RuleFor(u => u.Email)
            .NotEmpty().WithMessage("Email boş olamaz")
            .EmailAddress().WithMessage("Geçerli bir email giriniz")
            .MustAsync(BeUniqueEmail).WithMessage("Bu email zaten kayıtlı.");

        RuleFor(u => u.PasswordHash)
            .NotEmpty().WithMessage("Şifre boş olamaz")
            .MinimumLength(6).WithMessage("Şifre en az 6 karakter olmalı")
            .Matches("[A-Z]").WithMessage("Şifre bir büyük harf içermeli")
            .Matches(@"\d").WithMessage("Şifre bir rakam içermeli");
    }
    private async Task<bool> BeUniqueEmail(string email, CancellationToken ct)
    {
        return !await _context.Users.AnyAsync(u => u.Email == email, ct);
    }
}
