using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student_exam_back.Data;
using Student_exam_back.Dtos;
using Student_exam_back.Models;

namespace Student_exam_back.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExamsController : ControllerBase
{
    private readonly ExamDbContext _db;

    public ExamsController(ExamDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var exams = await _db.Exams
            .Include(e => e.Student)
            .Include(e => e.Subject)
            .ToListAsync();

        var result = exams.Select(e => new 
        {
            id = e.Id,
            subjectCode = e.SubjectCode,
            subjectName = e.Subject?.SubjectName,

            studentNumber = e.StudentNumber,
            studentName = $"{e.Student?.FirstName} {e.Student?.LastName}",

            examDate = e.ExamDate,
            score = e.Score
        });

        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var exam = await _db.Exams.FindAsync(id);
        if (exam is null)
            return NotFound();

        return Ok(exam);
    }

    [HttpPost]
    public async Task<IActionResult> Create(ExamDto dto)
    {
        var date = DateTime.Now;
        var exam = new Exam
        {
            SubjectCode = dto.SubjectCode,
            StudentNumber = dto.StudentNumber,
            ExamDate = date,
            Score = dto.Score
        };

        _db.Exams.Add(exam);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { id = exam.Id }, exam);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, ExamDto dto)
    {
        var exam = await _db.Exams.FindAsync(id);
        if (exam is null)
            return NotFound();

        exam.SubjectCode = dto.SubjectCode;
        exam.StudentNumber = dto.StudentNumber;
        exam.Score = dto.Score;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var exam = await _db.Exams.FindAsync(id);
        if (exam is null)
            return NotFound();

        _db.Exams.Remove(exam);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}