import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.scss']
})
export class CourseFilterComponent {
  @Input() courses: Course[] = []; // list of all available courses

  // Emits when search, subject, or sort option changes
  @Output() filterChanged = new EventEmitter<{
    searchTerm: string;
    subject: string;
    sortBy: string;
  }>();

  // Local state: filter and sort options
  searchTerm = '';
  selectedSubject = '';
  sortBy = 'courseName';

  // Emit the current filter state to the parent component
  onFilterChange(): void {
    this.filterChanged.emit({
      searchTerm: this.searchTerm,
      subject: this.selectedSubject,
      sortBy: this.sortBy
    });
  }

  // Compute unique subjects from the course list for dropdown options
  get uniqueSubjects(): string[] {
    const subjects = this.courses.map(c => c.subject);
    return [...new Set(subjects)].sort();
  }
}
