using Microsoft.EntityFrameworkCore;
using OpenCommerce.Api.Models;

namespace OpenCommerce.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

    // Veritabanında oluşturulacak tablolar
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
}
