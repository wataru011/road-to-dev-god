// 進捗・XP・ランク・バッジを localStorage で管理するモジュール
const STORAGE_KEY = "rtdg_progress_v1";

export const RANKS = [
  { min: 0,    icon: "🥚", title: "見習い" },
  { min: 100,  icon: "🐣", title: "新人プログラマー" },
  { min: 250,  icon: "🛠️", title: "コーダー" },
  { min: 500,  icon: "⚙️", title: "一人前エンジニア" },
  { min: 900,  icon: "🚀", title: "フルスタック開発者" },
  { min: 1400, icon: "🧙", title: "達人アーキテクト" },
  { min: 2000, icon: "👑", title: "開発の王" },
  { min: 2800, icon: "⚡", title: "システム開発の神" },
];

export const XP_PER_LESSON = 50;
export const XP_PER_QUIZ = 30; // クイズ全問正解ボーナス

const defaultState = () => ({ completed: {}, quizCleared: {}, xp: 0 });

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

function save(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

let state = load();

export function getState() { return state; }

export function isLessonDone(lessonId) { return !!state.completed[lessonId]; }
export function isQuizCleared(lessonId) { return !!state.quizCleared[lessonId]; }

export function rankFor(xp) {
  let current = RANKS[0];
  for (const r of RANKS) if (xp >= r.min) current = r;
  return current;
}

export function nextRank(xp) {
  return RANKS.find((r) => r.min > xp) || null;
}

// レッスン完了を記録。戻り値: { xpGained, leveledUp, newRank }
export function completeLesson(lessonId) {
  const before = rankFor(state.xp);
  let gained = 0;
  if (!state.completed[lessonId]) {
    state.completed[lessonId] = Date.now();
    state.xp += XP_PER_LESSON;
    gained += XP_PER_LESSON;
  }
  save(state);
  const after = rankFor(state.xp);
  return { xpGained: gained, leveledUp: after.title !== before.title, newRank: after };
}

export function clearQuiz(lessonId) {
  let gained = 0;
  if (!state.quizCleared[lessonId]) {
    state.quizCleared[lessonId] = Date.now();
    state.xp += XP_PER_QUIZ;
    gained += XP_PER_QUIZ;
    save(state);
  }
  return { xpGained: gained };
}

export function courseProgress(course) {
  const total = course.lessons.length;
  const done = course.lessons.filter((l) => isLessonDone(l.id)).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function totalProgress(courses) {
  let total = 0, done = 0;
  for (const c of courses) {
    total += c.lessons.length;
    done += c.lessons.filter((l) => isLessonDone(l.id)).length;
  }
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function resetAll() {
  state = defaultState();
  save(state);
}

// バッジ定義（条件は courses を受け取って判定）
export function computeBadges(courses) {
  const byId = Object.fromEntries(courses.map((c) => [c.id, c]));
  const done = (cid) => byId[cid] && courseProgress(byId[cid]).pct === 100;
  const tp = totalProgress(courses);
  return [
    { icon: "👶", name: "はじめの一歩", desc: "最初のレッスンを完了", earned: Object.keys(state.completed).length >= 1 },
    { icon: "☕", name: "Javaの徒", desc: "Javaコースを制覇", earned: done("java") },
    { icon: "✨", name: "JSの使い手", desc: "JavaScriptコースを制覇", earned: done("javascript") },
    { icon: "🗄️", name: "データの番人", desc: "SQLコースを制覇", earned: done("sql") },
    { icon: "🧠", name: "クイズマスター", desc: "クイズを10個クリア", earned: Object.keys(state.quizCleared).length >= 10 },
    { icon: "⚡", name: "開発の神", desc: "全レッスンを完了", earned: tp.total > 0 && tp.pct === 100 },
  ];
}
