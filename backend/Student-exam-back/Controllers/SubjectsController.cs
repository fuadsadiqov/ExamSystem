using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student_exam_back.Data;
using Student_exam_back.Dtos;
using Student_exam_back.Models;

namespace Student_exam_back.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubjectsController : ControllerBase
{
    private readonly ExamDbContext _db;

    public SubjectsController(ExamDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _db.Subjects.ToListAsync());
    }

    [HttpGet("{code}")]
    public async Task<IActionResult> Get(string code)
    {
        var subject = await _db.Subjects.FindAsync(code);
        if (subject is null)
            return NotFound();

        return Ok(subject);
    }

    [HttpPost]
    public async Task<IActionResult> Create(SubjectDto dto)
    {
        var subject = new Subject
        {
            SubjectCode = dto.SubjectCode,
            SubjectName = dto.SubjectName,
            ClassNumber = dto.ClassNumber,
            TeacherFirstName = dto.TeacherFirstName,
            TeacherLastName = dto.TeacherLastName
        };

        _db.Subjects.Add(subject);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { code = subject.SubjectCode }, subject);
    }

    [HttpPut("{code}")]
    public async Task<IActionResult> Update(string code, SubjectDto dto)
    {
        var subject = await _db.Subjects.FindAsync(code);
        if (subject is null)
            return NotFound();

        subject.SubjectName = dto.SubjectName;
        subject.ClassNumber = dto.ClassNumber;
        subject.TeacherFirstName = dto.TeacherFirstName;
        subject.TeacherLastName = dto.TeacherLastName;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{code}")]
    public async Task<IActionResult> Delete(string code)
    {
        var subject = await _db.Subjects.FindAsync(code);
        if (subject is null)
            return NotFound();

        var relatedExams = await _db.Exams
            .Where(e => e.SubjectCode == code)
            .ToListAsync();

        _db.Exams.RemoveRange(relatedExams);

        _db.Subjects.Remove(subject);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}