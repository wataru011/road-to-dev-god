import basics from "./courses/basics.js?v=__BUILD_ID__";
import frontend from "./courses/frontend.js?v=__BUILD_ID__";
import javascript from "./courses/javascript.js?v=__BUILD_ID__";
import sql from "./courses/sql.js?v=__BUILD_ID__";
import java from "./courses/java.js?v=__BUILD_ID__";
import devtools from "./courses/devtools.js?v=__BUILD_ID__";
import webinfra from "./courses/webinfra.js?v=__BUILD_ID__";
import algorithms from "./courses/algorithms.js?v=__BUILD_ID__";
import integration from "./courses/integration.js?v=__BUILD_ID__";
import god from "./courses/god.js?v=__BUILD_ID__";

// トラック（表示順 = 推奨学習順）
export const courses = [
  basics,
  frontend,
  javascript,
  sql,
  java,
  devtools,
  webinfra,
  algorithms,
  integration,
  god,
];

// 難易度レベルの定義（だんだんレベルが上がる学習の道）
export const LEVELS = [
  {
    id: "beginner",
    n: 1,
    icon: "🌱",
    title: "初級編",
    tagline: "プログラミングの第一歩",
    desc: "Webの全体像と、Java・JavaScript・SQLの基礎文法。まずは『読める・少し書ける』を目指します。",
  },
  {
    id: "intermediate",
    n: 2,
    icon: "🔧",
    title: "中級編",
    tagline: "動くものを作れるようになる",
    desc: "配列操作・DOM・非同期通信、SQLの集計とJOIN、Javaのクラスと例外。部品を組み合わせて機能を作ります。",
  },
  {
    id: "advanced",
    n: 3,
    icon: "🚀",
    title: "上級編",
    tagline: "設計と仕組みを理解する",
    desc: "クロージャやOOP、サブクエリとインデックス、Stream、3層アーキテクチャ、データ設計とセキュリティの基礎。",
  },
  {
    id: "god",
    n: 4,
    icon: "👑",
    title: "神レベル",
    tagline: "システム全体を統べる",
    desc: "SOLIDな設計、スケーラブルなシステム設計、セキュリティ、パフォーマンス、テストとCI/CD、総合演習。",
  },
];

// 各レッスンの難易度割り当て（lesson.level が無い場合の正準マップ）
const LEVEL_MAP = {
  // Lv1 初級
  "basics-1": 1, "basics-2": 1, "basics-3": 1,
  "js-1": 1, "js-2": 1, "js-3": 1,
  "sql-1": 1, "sql-2": 1,
  "java-1": 1, "java-2": 1, "java-3": 1,
  // Lv2 中級
  "js-4": 2, "js-5": 2, "js-6": 2,
  "sql-3": 2, "sql-4": 2, "sql-5": 2,
  "java-4": 2, "java-5": 2,
  "int-1": 2, "int-3": 2,
  // Lv3 上級
  "js-7": 3, "js-8": 3,
  "sql-6": 3, "sql-7": 3,
  "java-6": 3, "java-7": 3,
  "int-2": 3,
  // Lv4 神レベル
  "god-1": 4, "god-2": 4, "god-3": 4, "god-4": 4, "god-5": 4, "god-6": 4,
};

// レッスンに level を付与（インラインの level を優先、無ければマップ、既定は1）
for (const c of courses) {
  for (const l of c.lessons) {
    l.level = l.level || LEVEL_MAP[l.id] || 1;
  }
}

export function getLevel(id) {
  return LEVELS.find((lv) => lv.id === id) || null;
}

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

// あるレベルのレッスンを、言語トラックごとにまとめて返す
// [{ course, lessons: [...] }, ...]
export function lessonsForLevel(levelN) {
  const out = [];
  for (const c of courses) {
    const lessons = c.lessons.filter((l) => l.level === levelN);
    if (lessons.length) out.push({ course: c, lessons });
  }
  return out;
}

// フラットなレベル順の全レッスン（course情報付き）。前後ナビや「次に学ぶ」に使える
export function allLessonsByLevel() {
  const flat = [];
  for (const lv of LEVELS) {
    for (const c of courses) {
      for (const l of c.lessons) {
        if (l.level === lv.n) flat.push({ course: c, lesson: l, level: lv });
      }
    }
  }
  return flat;
}
