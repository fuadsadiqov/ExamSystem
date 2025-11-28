namespace Student_exam_back.Models;

public class Subject
{
    public string SubjectCode { get; set; } = null!;
    public string SubjectName { get; set; } = null!;
    public int ClassNumber { get; set; }
    public string TeacherFirstName { get; set; } = null!;
    public string TeacherLastName { get; set; } = null!;

    public ICollection<Exam>? Exams { get; set; }
}
