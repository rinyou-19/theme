using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todo_app.Models;

namespace todo_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoContext _context;
        private const string unCompleted = "未完了";
        private const string completed = "完了済み";

        public TodoItemsController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodo(string selectedOption)
        {
            if (selectedOption == unCompleted)
            {
                // 検索条件:未完了
                return await _context.TodoItem.Where(x => x.EndOfDate == null).OrderBy(e => e.Id).ToListAsync();
            }
            if (selectedOption == completed)
            {
                // 検索条件:完了済み
                return await _context.TodoItem.Where(x => x.EndOfDate != null).OrderBy(e => e.Id).ToListAsync();
            }
            // 検索条件:ずべて
            return await _context.TodoItem.OrderBy(e => e.Id).ToListAsync();

        }

        [HttpPost]
        public async Task<IActionResult> PostTodo(TodoItem todo)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    _context.TodoItem.Add(todo);
                    await _context.SaveChangesAsync();

                    transaction.Commit();

                    return StatusCode(StatusCodes.Status200OK);
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(int id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    await _context.SaveChangesAsync();

                    transaction.Commit();

                    return StatusCode(StatusCodes.Status200OK);
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var todoItem = await _context.TodoItem.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    _context.TodoItem.Remove(todoItem);
                    await _context.SaveChangesAsync();

                    return StatusCode(StatusCodes.Status200OK);
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }
    }
}