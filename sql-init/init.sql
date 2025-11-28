CREATE DATABASE ExamDb;
GO

USE ExamDb;
GO

CREATE TABLE Subjects (
    SubjectCode NVARCHAR(20) PRIMARY KEY,
    SubjectName NVARCHAR(100) NOT NULL,
    ClassNumber INT NOT NULL,
    TeacherFirstName NVARCHAR(50),
    TeacherLastName NVARCHAR(50)
);

CREATE TABLE Students (
    StudentNumber INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    ClassNumber INT NOT NULL
);

CREATE TABLE Exams (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    SubjectCode NVARCHAR(20) NOT NULL,
    StudentNumber INT NOT NULL,
    ExamDate DATETIME NOT NULL,
    Score INT NOT NULL,
    FOREIGN KEY (SubjectCode) REFERENCES Subjects(SubjectCode),
    FOREIGN KEY (StudentNumber) REFERENCES Students(StudentNumber)
);
