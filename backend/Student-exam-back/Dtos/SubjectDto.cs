namespace Student_exam_back.Dtos;

public class SubjectDto
{
    public string SubjectCode { get; set; } = null!;
    public string SubjectName { get; set; } = null!;
    public int ClassNumber { get; set; }
    public string TeacherFirstName { get; set; } = null!;
    public string TeacherLastName { get; set; } = null!;
}
