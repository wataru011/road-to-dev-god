import basics from "./courses/basics.js";
import javascript from "./courses/javascript.js";
import sql from "./courses/sql.js";
import java from "./courses/java.js";
import integration from "./courses/integration.js";

// 表示順
export const courses = [basics, javascript, sql, java, integration];

export function getCourse(id) {
  return courses.find((c) => c.id === id) || null;
}

export function getLesson(courseId, lessonId) {
  const course = getCourse(courseId);
  if (!course) return null;
  const index = course.lessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return null;
  return {
    course,
    lesson: course.lessons[index],
    prev: course.lessons[index - 1] || null,
    next: course.lessons[index + 1] || null,
    index,
  };
}
