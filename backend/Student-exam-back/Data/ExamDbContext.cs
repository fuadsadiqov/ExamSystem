using Microsoft.EntityFrameworkCore;
using Student_exam_back.Models;

namespace Student_exam_back.Data;

public class ExamDbContext : DbContext
{
    public ExamDbContext(DbContextOptions<ExamDbContext> options)
            : base(options)
    {
    }

    public DbSet<Subject> Subjects => Set<Subject>();
    public DbSet<Student> Students => Set<Student>();
    public DbSet<Exam> Exams => Set<Exam>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Subject>()
            .HasKey(s => s.SubjectCode);

        modelBuilder.Entity<Student>()
            .HasKey(s => s.StudentNumber);

        modelBuilder.Entity<Exam>()
            .HasKey(e => e.Id);

        modelBuilder.Entity<Exam>()
            .HasOne(e => e.Subject)
            .WithMany(s => s.Exams)
            .HasForeignKey(e => e.SubjectCode);

        modelBuilder.Entity<Exam>()
            .HasOne(e => e.Student)
            .WithMany(s => s.Exams)
            .HasForeignKey(e => e.StudentNumber); 
    }
}

