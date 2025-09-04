import { CourseHeroSection } from '@/components/courses/CourseHeroSection';
import { CourseMainContent } from '@/components/courses/CourseMainContent';

export default function CoursesPage() {

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CourseHeroSection />

        <CourseMainContent />
    </main>
  );
}
