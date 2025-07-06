// Angular component for displaying an individual course as a card
// Allows adding the course to the user's personal schema
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})

// The course object to display and flag indicating if the course is already in the schema
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() isInSchema: boolean = false;

  // Event emitter to notify parent when course is added
  @Output() addToSchema = new EventEmitter<Course>();

  addCourse() {
    this.addToSchema.emit(this.course);
  }
}
