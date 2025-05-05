namespace OpenCommerce.Api.Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Email {get; set; } = "";
    public string PasswordHash {get; set; } = "";
    public string Name {get; set; } = "";
    public string Role { get; set; } = "Customer";    // Kullanıcı rolü (Customer, Admin vs.)
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Kayıt tarihi

    public ICollection<Order> Orders { get; set; } = new List<Order>();


}