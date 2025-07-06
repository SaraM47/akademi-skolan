import { Injectable, signal, computed } from '@angular/core';
import { Course } from '../models/course';

const STORAGE_KEY = 'mySchema';

@Injectable({
  providedIn: 'root'
})
  // Reactive signal that holds the current list of selected courses

export class SchemaService {
  private schemaSignal = signal<Course[]>(this.loadFromStorage());

  // Computed getter that exposes the schema as a readonly signal
  getSchema = computed(() => this.schemaSignal());

  // Adds a course to the schema if it's not already present
  addCourse(course: Course): void {
    const current = this.schemaSignal();
    if (!current.find(c => c.courseCode === course.courseCode)) {
      this.schemaSignal.set([...current, course]);
      this.saveToStorage();
    }
  }

  // Removes a course from the schema by course code
  removeCourse(courseCode: string): void {
    const updated = this.schemaSignal().filter(c => c.courseCode !== courseCode);
    this.schemaSignal.set(updated);
    this.saveToStorage();
  }

  clearSchema(): void {
    this.schemaSignal.set([]);
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.schemaSignal()));
  }

  // Loads the schema from localStorage, if available
  private loadFromStorage(): Course[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
}
