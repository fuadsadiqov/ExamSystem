namespace Student_exam_back.Models;

public class Exam
{
    public int Id { get; set; }

    public string SubjectCode { get; set; } = null!;
    public Subject? Subject { get; set; }

    public int StudentNumber { get; set; }
    public Student? Student { get; set; }

    public DateTime ExamDate { get; set; }
    public int Score { get; set; }
}
