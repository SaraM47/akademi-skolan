/**
 * Interface representing a university course.
 * Used for modeling course data fetched from the Mittuniversitet course registry.
 * Includes metadata such as course code, subject, level, credit points, and syllabus URL.
 */
export interface Course {
    courseCode: string;
    subjectCode: string;
    level: string;
    progression: string;
    courseName: string;
    points: number;
    institutionCode: string;
    subject: string;
    syllabus: string;
  }
  