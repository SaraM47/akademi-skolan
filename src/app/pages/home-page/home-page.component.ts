// Component for the landing page with hero section, dynamic stats and scroll animations
import { Component, AfterViewInit, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements AfterViewInit, OnInit {
  // Images for the hero slideshow
  slides = [
    {
      src: 'assets/slide1.jpg',
      alt: 'Glad team studenter från läge vinkel klarade provet genom att förbereda sig tillsammans'
    },
    {
      src: 'assets/slide2.jpg',
      alt: 'En kvinna använder laptop nära studerande vänner'
    },
    {
      src: 'assets/slide3.jpg',
      alt: 'Leende porträtt av en ung kvinnlig student håller böcker stående framför universitetsbyggnaden'
    }
  ];

  currentIndex = 0; // Current slide index

  // Course statistics displayed on the homepage
  stats = {
    total: 0,
    subjects: 0,
    maxPoints: 0
  };

  // Automatically cycle slides every 5 seconds
  constructor(private renderer: Renderer2, private courseService: CourseService) {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, 5000);
  }

  // Fetch course statistics on init
  ngOnInit(): void {
    this.courseService.getCourses().subscribe(() => {
      this.stats = this.courseService.getCourseStats();
    });
  }

  // Animate elements with 'reveal' class when they enter the viewport
  ngAfterViewInit(): void {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach(el => observer.observe(el));
  }
}
