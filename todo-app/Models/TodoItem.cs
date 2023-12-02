namespace todo_app.Models;

public class TodoItem
{
    public int Id { get; set; }
    public string? Contents { get; set; }
    public DateOnly ExpectedEndOfDate { get; set; }
    public DateOnly EndOfDate { get; set; }

}