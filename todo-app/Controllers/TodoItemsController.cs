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

        public TodoItemsController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodo()
        {
            if (_context.TodoItem == null)
            {
                return NotFound();
            }
            try
            {
                var test = await _context.TodoItem.ToListAsync();
            }
            catch (Exception e)
            {
                var test2 = "あ";
            }
            return await _context.TodoItem.ToListAsync();
        }
        [HttpPost]
        // public async Task<ActionResult<TodoItem>> PostTodo(TodoItem todo)
        public string PostTodo(TodoItem todo)
        {
            _context.TodoItem.Add(todo);
            _context.SaveChangesAsync();

            return "ok";
        }
    }
}