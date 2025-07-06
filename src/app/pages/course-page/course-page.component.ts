import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { SchemaService } from '../../services/schema.service';

import { CourseFilterComponent } from '../../components/course-filter/course-filter.component';

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CourseFilterComponent
  ],
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})

export class CoursePageComponent implements OnInit {
  courses: Course[] = []; // Loaded courses from the JSON file

  // Filter state
  searchTerm = '';
  selectedSubject = '';

  // Sorting state
  currentSortField = 'courseName';
  sortAscending = true;

  // Pagination state
  page = 1;
  itemsPerPage = 20;
  itemsPerPageOptions = [5, 10, 20, 30, 50, 100];

  // Track newly added courses for highlight animation
  addedCourseCodes = new Set<string>();

  constructor(
    private courseService: CourseService,
    private schemaService: SchemaService
  ) {}

  // On init, load course data from service
  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  // Retrieve current schema from the service
  get schemaList(): Course[] {
    return this.schemaService.getSchema();
  }

  // Calculate total points of selected courses
  get totalPoints(): number {
    return this.schemaList.reduce((sum, course) => sum + course.points, 0);
  }

  // Compute total number of pages
  get totalPages(): number {
    return Math.ceil(this.filteredCoursesInternal().length / this.itemsPerPage);
  }

  // Calculate start index for pagination
  get startIndex(): number {
    return (this.page - 1) * this.itemsPerPage + 1;
  }

  // Calculate end index for pagination
  get endIndex(): number {
    const end = this.page * this.itemsPerPage;
    return end > this.filteredCoursesInternal().length
      ? this.filteredCoursesInternal().length
      : end;
  }

  // Update items per page and reset to page 1
  onItemsPerPageChange(newLimit: number): void {
    this.itemsPerPage = newLimit;
    this.page = 1;
  }

  // Add course to schema and trigger highlight effect
  onAddToSchema(course: Course): void {
    this.schemaService.addCourse(course);

    this.addedCourseCodes.add(course.courseCode);
    setTimeout(() => {
      this.addedCourseCodes.delete(course.courseCode);
    }, 1000);
  }

  isCourseInSchema(course: Course): boolean {
    return this.schemaList.some(c => c.courseCode === course.courseCode);
  }

  // Handle filter and sort changes
  onFilterChanged(filter: { searchTerm: string; subject: string; sortBy: string }): void {
    this.searchTerm = filter.searchTerm;
    this.selectedSubject = filter.subject;

    if (this.currentSortField === filter.sortBy) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.currentSortField = filter.sortBy;
      this.sortAscending = true;
    }

    this.page = 1;
  }

  // Handle sorting logic for table headers
  sort(field: string): void {
    if (this.currentSortField === field) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.currentSortField = field;
      this.sortAscending = true;
    }
  }

  // Return the appropriate icon class for current sort field
  getSortIcon(field: string): string {
    if (this.currentSortField !== field) return 'bi-arrow-down-up';
    return this.sortAscending ? 'bi-arrow-up' : 'bi-arrow-down';
  }

  // Internal method: filters and sorts all courses based on current settings
  filteredCoursesInternal(): Course[] {
    return this.courses
      .filter(course =>
        this.searchTerm === '' ||
        course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .filter(course =>
        this.selectedSubject === '' || course.subject === this.selectedSubject
      )
      .sort((a, b) => {
        const fieldA = (a as any)[this.currentSortField];
        const fieldB = (b as any)[this.currentSortField];

        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          return this.sortAscending
            ? fieldA.localeCompare(fieldB)
            : fieldB.localeCompare(fieldA);
        }

        return this.sortAscending ? fieldA - fieldB : fieldB - fieldA;
      });
  }

  // Public method: returns only the courses visible on the current page
  filteredCourses(): Course[] {
    const all = this.filteredCoursesInternal();
    const start = (this.page - 1) * this.itemsPerPage;
    return all.slice(start, start + this.itemsPerPage);
  }

  // Navigate to next page
  nextPage(): void {
    if (this.page < this.totalPages) this.page++;
  }

  // Navigate to previous page
  prevPage(): void {
    if (this.page > 1) this.page--;
  }
}
