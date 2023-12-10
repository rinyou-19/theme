using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        private const string unConpleted = "未完了";
        private const string conpleted = "未完了";

        public TodoItemsController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodo(string selectedOption)
        {
            if (selectedOption == unConpleted)
            {
                return await _context.TodoItem.Where(x => x.EndOfDate == null).ToListAsync();
            }
            if (selectedOption == conpleted)
            {
                return await _context.TodoItem.Where(x => x.EndOfDate != null).ToListAsync();
            }
            return await _context.TodoItem.ToListAsync();

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

                    return Ok(); // 成功時のステータスコード
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

                    return Ok(); // 成功時のステータスコード
                }
                catch (DbUpdateConcurrencyException)
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

                    return Ok(); // 成功時のステータスコード
                }
                catch (DbUpdateConcurrencyException)
                {
                    transaction.Rollback();
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        private bool TodoItemExists(int id)
        {
            return _context.TodoItem.Any(e => e.Id == id);
        }
    }
}