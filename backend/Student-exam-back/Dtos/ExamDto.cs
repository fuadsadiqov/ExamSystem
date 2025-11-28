namespace Student_exam_back.Dtos;

public class ExamDto
{
    public string SubjectCode { get; set; } = null!;
    public int StudentNumber { get; set; }
    public int Score { get; set; }
}
