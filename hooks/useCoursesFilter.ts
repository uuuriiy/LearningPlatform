import { useCallback, useMemo, useState } from "react";
import { useCourseDifficulties, useCourses } from "./useContentful";

export const useCoursesFilter = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Use React Query hooks for data fetching
    const {
        data: coursesData,
        isLoading: coursesLoading,
        error: coursesError,
    } = useCourses({ limit: 50 });

    const {
        data: difficulties = [],
        isLoading: difficultiesLoading,
    } = useCourseDifficulties();

    // Extract data from React Query
    const { courses, categories, loading, error } = useMemo(() => {
        return {
            courses: coursesData?.courses || [],
            categories: difficulties,
            loading: coursesLoading || difficultiesLoading,
            error: coursesError,
        };
    }, [coursesData, difficulties, coursesLoading, difficultiesLoading, coursesError]);

     // Filter courses based on current filters
    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
        // Category filter
        if (selectedCategory !== 'All' && course.category !== selectedCategory) {
            return false;
        }

        // Difficulty filter
        if (selectedDifficulty !== 'All' && course.difficulty !== selectedDifficulty) {
            return false;
        }

        // Search filter
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            const matchesTitle = course.courseTitle.toLowerCase().includes(query);
            
            // Extract description text for search
            const getDescriptionText = (description: typeof course.description) => {
            try {
                const firstParagraph = description?.json?.content?.[0];
                const firstTextNode = firstParagraph?.content?.[0];
                return firstTextNode?.value || '';
            } catch {
                return '';
            }
            };
            
            const matchesDescription = getDescriptionText(course.description).toLowerCase().includes(query);
            const matchesCategory = course.category?.toLowerCase().includes(query) || false;
            
            if (!matchesTitle && !matchesDescription && !matchesCategory) {
            return false;
            }
        }

        return true;
        });
    }, [courses, selectedCategory, selectedDifficulty, searchQuery]);

  // Filter handlers
    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category);
    }, []);

    const handleDifficultyChange = useCallback((difficulty: string) => {
        setSelectedDifficulty(difficulty);
    }, []);

    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query);
    }, []);

    const handleClearFilters = useCallback(() => {
        setSelectedCategory('All');
        setSelectedDifficulty('All');
        setSearchQuery('');
    }, []);

    return {
        courses,
        selectedCategory,
        selectedDifficulty,
        searchQuery,
        filteredCourses,
        categories,
        loading,
        error,
        handleCategoryChange,
        handleDifficultyChange,
        handleSearchChange,
        handleClearFilters,
    };
}