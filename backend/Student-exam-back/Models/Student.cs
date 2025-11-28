using System.ComponentModel.DataAnnotations.Schema;

namespace Student_exam_back.Models;

public class Student
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int StudentNumber { get; set; } 
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public int ClassNumber { get; set; }

    public ICollection<Exam>? Exams { get; set; }
}
