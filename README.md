# 📘 Student Exam Management System

**A full-stack application for managing school subjects, students, and
exam results.**

------------------------------------------------------------------------

## 🚀 Overview

This system provides a complete environment including:

-   **ASP.NET Core 8 Web API** (backend)
-   **Angular 17** application (frontend)
-   **SQL Server 2022** database (Docker)
-   **Automatic database/table creation**
-   **Docker Compose orchestration**

------------------------------------------------------------------------

## 📂 Project Structure

    project-root/
    │
    ├── backend/
    │   ├── Controllers/
    │   ├── Models/
    │   ├── Data/
    │   ├── Dtos/
    │   ├── Services/
    │   ├── Program.cs
    │   └── Dockerfile
    │
    ├── frontend/
    │   ├── src/
    │   ├── public/
    │   ├── angular.json
    │   ├── package.json
    │   └── Dockerfile
    │
    ├── sql-init/      (Not used — MSSQL does not auto-run init scripts)
    │   └── init.sql
    │
    └── docker-compose.yml

------------------------------------------------------------------------

## 🔧 Technologies Used

### **Backend**

-   ASP.NET Core 8\
-   Entity Framework Core\
-   Swagger (OpenAPI)

### **Frontend**

-   Angular 17\
-   TypeScript\
-   SCSS\
-   Tailwind CSS\
-   NGINX (production hosting)

### **Infrastructure**

-   Docker\
-   Docker Compose\
-   SQL Server 2022

------------------------------------------------------------------------

## 🧩 Data Model

### **Subject**

  Field              Type
  ------------------ --------
  SubjectCode        string
  SubjectName        string
  ClassNumber        int
  TeacherFirstName   string
  TeacherLastName    string

### **Student**

  Field                Type
  -------------------- --------
  StudentNumber (PK)   int
  FirstName            string
  LastName             string
  ClassNumber          int

### **Exam**

  Field           Type
  --------------- ----------
  Id (PK)         int
  SubjectCode     string
  StudentNumber   int
  ExamDate        DateTime
  Score           int

------------------------------------------------------------------------

## ⚙️ Automatic Database Initialization

MS SQL Server Docker images **do not support** automatic init scripts.

To ensure the system works anywhere:

### ✔ Backend creates DB automatically

### ✔ Backend creates all 3 tables automatically

### ✔ Startup routine checks if tables exist --- and adds them if missing

------------------------------------------------------------------------

## 🐳 Running with Docker

### **Start the entire system:**

``` bash
docker compose down -v
docker compose up --build
```

### Services

  Service       URL / Port
  ------------- -------------------------------
  Frontend      http://localhost:4200
  Backend API   http://localhost:5001/swagger
  SQL Server    localhost:1433

------------------------------------------------------------------------

## 🌐 Local Development (Without Docker)

### Backend

``` bash
cd backend/Student-exam-back
dotnet run
```

### Frontend

``` bash
cd frontend
npm install
npm start
```

------------------------------------------------------------------------
## 👤 Author

Created by **Fuad Sadıqov**\
Full-stack .NET + Angular Developer
