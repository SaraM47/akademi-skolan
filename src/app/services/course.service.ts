import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';
import { Observable } from 'rxjs';

// Angular service for retrieving and caching course data from a local JSON file
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private dataUrl = '/miun_courses.json'; // Path to the course data file
  private courses: Course[] = []; // Local cache of course data

  constructor(private http: HttpClient) {}

  // Fetches course data from cache or HTTP if not already loaded
  getCourses(): Observable<Course[]> {
    return new Observable<Course[]>(observer => {
      if (this.courses.length > 0) {
        observer.next(this.courses);
        observer.complete();
      } else {
        this.http.get<Course[]>(this.dataUrl).subscribe(data => {
          this.courses = data;
          observer.next(data);
          observer.complete();
        });
      }
    });
  }

  // Returns basic statistics about the course list: total count, unique subjects, and max points
  getCourseStats(): { total: number; subjects: number; maxPoints: number } {
    const total = this.courses.length;
    const subjects = new Set(this.courses.map(c => c.subject)).size;
    const maxPoints = Math.max(...this.courses.map(c => c.points));
    return { total, subjects, maxPoints };
  }
}
