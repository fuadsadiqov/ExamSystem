import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menus = [
    {
      path: 'students',
      title: 'Student',
    },
    {
      path: 'lesson',
      title: 'Lesson',
    },
    {
      path: 'exam',
      title: 'Exam',
    },
  ];
}
