import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'kurser',
    loadComponent: () =>
      import('./pages/course-page/course-page.component').then(m => m.CoursePageComponent)
  },
  {
    path: 'ramschema',
    loadComponent: () =>
      import('./pages/schema-page/schema-page.component').then(m => m.SchemaPageComponent)
  },
  { path: '**', redirectTo: '' }
];
