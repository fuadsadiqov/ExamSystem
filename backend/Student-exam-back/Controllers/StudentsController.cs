using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student_exam_back.Data;
using Student_exam_back.Dtos;
using Student_exam_back.Models;

namespace Student_exam_back.Controllers;
[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly ExamDbContext _db;

    public StudentsController(ExamDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _db.Students.ToListAsync());
    }

    [HttpGet("{number:int}")]
    public async Task<IActionResult> Get(int number)
    {
        var student = await _db.Students.FindAsync(number);
        if (student is null)
            return NotFound();

        return Ok(student);
    }

    [HttpPost]
    public async Task<IActionResult> Create(StudentDto dto)
    {
        var student = new Student
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            ClassNumber = dto.ClassNumber
        };

        _db.Students.Add(student);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { number = student.StudentNumber }, student);
    }

    [HttpPut("{number:int}")]
    public async Task<IActionResult> Update(int number, StudentDto dto)
    {
        var student = await _db.Students.FindAsync(number);
        if (student is null)
            return NotFound();

        student.FirstName = dto.FirstName;
        student.LastName = dto.LastName;
        student.ClassNumber = dto.ClassNumber;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{number:int}")]
    public async Task<IActionResult> Delete(int number)
    {
        var student = await _db.Students.FindAsync(number);
        if (student is null)
            return NotFound();

        _db.Students.Remove(student);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}