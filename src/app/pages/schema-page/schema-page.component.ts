import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Course } from '../../models/course';
import { SchemaService } from '../../services/schema.service';

@Component({
  selector: 'app-schema-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schema-page.component.html',
  styleUrls: ['./schema-page.component.scss']
})
export class SchemaPageComponent {
  constructor(private schemaService: SchemaService) {}
  // Get current schema list from service
  get schema(): Course[] {
    return this.schemaService.getSchema();
  }

  // Compute total points from all added courses 
  get totalPoints(): number {
    return this.schema.reduce((sum: number, course: Course) => sum + course.points, 0);
  }

  // Remove a single course from schema
  onRemove(courseCode: string): void {
    this.schemaService.removeCourse(courseCode);
  }
  
  // Clear the entire schema
  onClearSchema(): void {
    this.schemaService.clearSchema();
  }
}
