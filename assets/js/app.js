import { courses, LEVELS, getLevel, getCourse, getLesson, lessonsForLevel } from "./data/curriculum.js";
import { renderMarkdown } from "./markdown.js";
import * as P from "./progress.js";
import { createJsPlayground } from "./runners/js-runner.js";
import { createSqlPlayground } from "./runners/sql-runner.js";
import { createHtmlPlayground } from "./runners/html-runner.js";
import { createQuiz } from "./runners/quiz.js";
import { trivia, TRIVIA_CATEGORIES } from "./data/trivia.js";

const app = document.getElementById("app");

const CAT_ICON = { 語源: "📖", 歴史: "📜", 障害: "💥", 人物: "👤", 法則: "⚖️", 文化: "🎭", 豆知識: "💡" };
// 日替わりの小話（日付ベースで決まる擬似ランダム。Date.now ではなく日単位で安定）
function pickDailyTrivia() {
  const day = Math.floor(Date.now() / 86400000);
  return trivia[day % trivia.length];
}
const LEVEL_BY_N = Object.fromEntries(LEVELS.map((l) => [l.n, l]));

function levelChip(n) {
  const lv = LEVEL_BY_N[n];
  if (!lv) return "";
  return `<span class="lvl-chip lvl-${n}">${lv.icon} ${lv.title}</span>`;
}

function levelProgress(n) {
  let total = 0, done = 0;
  for (const sec of lessonsForLevel(n)) {
    for (const l of sec.lessons) {
      total++;
      if (P.isLessonDone(l.id)) done++;
    }
  }
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

/* ---------------- ヘッダー（ナビ + ランク） ---------------- */
function renderHeader() {
  const nav = document.getElementById("top-nav");
  const route = parseHash();
  nav.innerHTML = "";
  const home = link("#/", "ホーム");
  if (route.name === "home") home.classList.add("active");
  nav.appendChild(home);
  for (const lv of LEVELS) {
    const a = link(`#/level/${lv.id}`, `${lv.icon} ${lv.title}`);
    if (route.name === "level" && route.levelId === lv.id) a.classList.add("active");
    nav.appendChild(a);
  }
  const tv = link("#/trivia", "📖 小話");
  if (route.name === "trivia") tv.classList.add("active");
  nav.appendChild(tv);
  updateRank();
}

function updateRank() {
  const { xp } = P.getState();
  const rank = P.rankFor(xp);
  const next = P.nextRank(xp);
  document.querySelector(".rank-icon").textContent = rank.icon;
  document.getElementById("rank-title").textContent = rank.title;
  document.getElementById("rank-xp").textContent = `${xp} XP`;
  const bar = document.getElementById("rank-progress-bar");
  if (next) {
    const span = next.min - rank.min;
    const got = xp - rank.min;
    bar.style.width = `${Math.min(100, Math.round((got / span) * 100))}%`;
  } else {
    bar.style.width = "100%";
  }
}

function link(href, text) {
  const a = document.createElement("a");
  a.href = href;
  a.textContent = text;
  return a;
}

/* ---------------- ルーティング ---------------- */
function parseHash() {
  const h = location.hash.replace(/^#/, "") || "/";
  const parts = h.split("/").filter(Boolean);
  if (parts[0] === "course" && parts[2] === "lesson") {
    return { name: "lesson", courseId: parts[1], lessonId: parts[3] };
  }
  if (parts[0] === "course") return { name: "course", courseId: parts[1] };
  if (parts[0] === "level") return { name: "level", levelId: parts[1] };
  if (parts[0] === "trivia") return { name: "trivia" };
  return { name: "home" };
}

function router() {
  const route = parseHash();
  window.scrollTo(0, 0);
  if (route.name === "course") renderCourse(route.courseId);
  else if (route.name === "lesson") renderLesson(route.courseId, route.lessonId);
  else if (route.name === "level") renderLevel(route.levelId);
  else if (route.name === "trivia") renderTrivia();
  else renderHome();
  renderHeader();
}

/* ---------------- ホーム ---------------- */
function renderHome() {
  const tp = P.totalProgress(courses);
  const rank = P.rankFor(P.getState().xp);
  const totalLessons = courses.reduce((a, c) => a + c.lessons.length, 0);

  const el = document.createElement("div");
  el.innerHTML = `
    <section class="hero">
      <h1>新人を、<span class="grad">システム開発の神</span>へ。</h1>
      <p>初級編から神レベルまで、段階的にレベルアップする学習の道。
         <strong>JavaScript</strong> ・ <strong>SQL</strong> は実際に実行、<strong>Java</strong> はコード読解と演習で身につけます。</p>
      <div class="hero-stats">
        <div class="hero-stat"><div class="num">${LEVELS.length}</div><div class="lbl">レベル</div></div>
        <div class="hero-stat"><div class="num">${totalLessons}</div><div class="lbl">レッスン</div></div>
        <div class="hero-stat"><div class="num">${tp.pct}%</div><div class="lbl">あなたの達成度</div></div>
        <div class="hero-stat"><div class="num">${rank.icon}</div><div class="lbl">${rank.title}</div></div>
      </div>
    </section>

    <h2 class="section-title">🛤️ 神への道 ― 4段階で実力を上げる</h2>
    <div class="level-grid" id="level-grid"></div>

    <h2 class="section-title">📚 言語別トラック（横断して学ぶ）</h2>
    <div class="course-grid" id="course-grid"></div>

    <h2 class="section-title">📖 今日の小話</h2>
    <a class="trivia-today" href="#/trivia" id="trivia-today"></a>

    <h2 class="section-title">🏆 獲得バッジ</h2>
    <div class="badge-row" id="badge-row"></div>

    <div class="flex-between" style="margin-top:40px">
      <span class="muted">進捗は端末内(localStorage)に保存されます。</span>
      <button class="danger-link" id="reset-btn">進捗をリセット</button>
    </div>
  `;

  // レベルの道（4段階）
  const lgrid = el.querySelector("#level-grid");
  LEVELS.forEach((lv, i) => {
    const pr = levelProgress(lv.n);
    const card = document.createElement("a");
    card.className = `level-card lvl-${lv.n}`;
    card.href = `#/level/${lv.id}`;
    card.innerHTML = `
      <div class="level-top">
        <span class="level-icon">${lv.icon}</span>
        <span class="level-step">Lv.${lv.n}</span>
      </div>
      <h3>${lv.title}</h3>
      <div class="level-tagline">${lv.tagline}</div>
      <p>${lv.desc}</p>
      <div class="course-meta"><span>${pr.done}/${pr.total} 完了</span><span>${pr.pct}%</span></div>
      <div class="mini-progress"><div style="width:${pr.pct}%"></div></div>
    `;
    lgrid.appendChild(card);
    if (i < LEVELS.length - 1) {
      const arrow = document.createElement("div");
      arrow.className = "level-arrow";
      arrow.textContent = "▶";
      lgrid.appendChild(arrow);
    }
  });

  // 言語別トラック
  const grid = el.querySelector("#course-grid");
  courses.forEach((c) => {
    const pr = P.courseProgress(c);
    const card = document.createElement("a");
    card.className = "course-card";
    card.href = `#/course/${c.id}`;
    card.innerHTML = `
      <div class="c-icon">${c.icon}</div>
      <h3>${c.title} <span class="tag ${c.tag}">${c.lessons.length}レッスン</span></h3>
      <p>${c.short}</p>
      <div class="course-meta"><span>${pr.done}/${pr.total} 完了</span><span>${pr.pct}%</span></div>
      <div class="mini-progress"><div style="width:${pr.pct}%"></div></div>
    `;
    grid.appendChild(card);
  });

  const t = pickDailyTrivia();
  const today = el.querySelector("#trivia-today");
  today.innerHTML = `
    <div class="tt-cat">${CAT_ICON[t.cat] || "📖"} ${t.cat}</div>
    <div class="tt-title">${t.title}</div>
    <div class="tt-body">${t.body}</div>
    <div class="tt-more">小話一覧を見る（全${trivia.length}本）→</div>`;

  const badgeRow = el.querySelector("#badge-row");
  P.computeBadges(courses).forEach((b) => {
    const d = document.createElement("div");
    d.className = "badge" + (b.earned ? "" : " locked");
    d.innerHTML = `<div class="b-icon">${b.icon}</div><div class="b-name">${b.name}</div><div class="b-desc">${b.desc}</div>`;
    badgeRow.appendChild(d);
  });

  el.querySelector("#reset-btn").addEventListener("click", () => {
    if (confirm("学習の進捗とXPをすべてリセットしますか？この操作は取り消せません。")) {
      P.resetAll();
      router();
      toast("進捗をリセットしました");
    }
  });

  app.innerHTML = "";
  app.appendChild(el);
}

/* ---------------- レベル詳細 ---------------- */
function renderLevel(levelId) {
  const lv = getLevel(levelId);
  if (!lv) return renderNotFound();
  const sections = lessonsForLevel(lv.n);
  const pr = levelProgress(lv.n);
  const idx = LEVELS.findIndex((x) => x.id === lv.id);
  const prevLv = LEVELS[idx - 1] || null;
  const nextLv = LEVELS[idx + 1] || null;

  const el = document.createElement("div");
  el.innerHTML = `
    <div class="breadcrumb"><a href="#/">ホーム</a> › ${lv.title}</div>
    <div class="course-head"><div class="c-icon">${lv.icon}</div>
      <div><h1>${lv.title} <span class="lvl-chip lvl-${lv.n}">Lv.${lv.n}</span></h1>
      <div class="muted">${lv.tagline}</div></div>
    </div>
    <p class="course-desc">${lv.desc}</p>
    <div class="flex-between" style="margin:18px 0">
      <strong>進捗 ${pr.done}/${pr.total}</strong><span class="muted">${pr.pct}%</span>
    </div>
    <div class="mini-progress" style="margin-bottom:8px"><div style="width:${pr.pct}%"></div></div>
    <div id="level-sections"></div>
  `;

  const wrap = el.querySelector("#level-sections");
  sections.forEach((sec) => {
    const block = document.createElement("div");
    block.style.marginTop = "28px";
    block.innerHTML = `<h2 class="section-title" style="margin-bottom:12px">${sec.course.icon} ${sec.course.title}</h2>`;
    const list = document.createElement("ul");
    list.className = "lesson-list";
    sec.lessons.forEach((l) => {
      const done = P.isLessonDone(l.id);
      const a = document.createElement("a");
      a.className = "lesson-item" + (done ? " done" : "");
      a.href = `#/course/${sec.course.id}/lesson/${l.id}`;
      a.innerHTML = `
        <div class="lesson-num">${done ? "✓" : sec.course.icon}</div>
        <div class="lesson-body"><div class="t">${l.title}</div><div class="d">⏱ ${l.duration}${l.quiz ? " ・ クイズあり" : ""}</div></div>
        <div class="lesson-check">${done ? "✅" : ""}</div>
      `;
      list.appendChild(a);
    });
    block.appendChild(list);
    wrap.appendChild(block);
  });

  // レベル間ナビ
  const nav = document.createElement("div");
  nav.className = "lesson-nav";
  nav.innerHTML = `
    <div>${prevLv ? `<a class="btn" href="#/level/${prevLv.id}">← ${prevLv.icon} ${prevLv.title}</a>` : ""}</div>
    <div><a class="btn" href="#/">ホーム</a></div>
    <div>${nextLv ? `<a class="btn primary" href="#/level/${nextLv.id}">${nextLv.icon} ${nextLv.title} →</a>` : `<span class="muted">最終レベル 🎉</span>`}</div>
  `;
  el.appendChild(nav);

  app.innerHTML = "";
  app.appendChild(el);
}

/* ---------------- 面白小話 ---------------- */
let triviaFilter = "すべて";
function renderTrivia() {
  const el = document.createElement("div");
  el.innerHTML = `
    <div class="breadcrumb"><a href="#/">ホーム</a> › 面白小話</div>
    <div class="course-head"><div class="c-icon">📖</div>
      <div><h1>システム開発 面白小話</h1>
      <div class="muted">学びの息抜きに。全${trivia.length}本の豆知識・歴史・伝説</div></div>
    </div>
    <div class="trivia-controls">
      <div class="trivia-cats" id="trivia-cats"></div>
      <button class="btn primary" id="trivia-random">🎲 ランダムに1本</button>
    </div>
    <div id="trivia-list" class="trivia-grid"></div>
  `;

  const cats = el.querySelector("#trivia-cats");
  TRIVIA_CATEGORIES.forEach((c) => {
    const b = document.createElement("button");
    b.className = "chip-btn" + (c === triviaFilter ? " active" : "");
    b.textContent = c === "すべて" ? "すべて" : `${CAT_ICON[c] || ""} ${c}`;
    b.addEventListener("click", () => { triviaFilter = c; renderTrivia(); });
    cats.appendChild(b);
  });

  const list = el.querySelector("#trivia-list");
  const draw = (items, highlightId) => {
    list.innerHTML = "";
    items.forEach((t) => {
      const card = document.createElement("div");
      card.className = "trivia-card" + (t.id === highlightId ? " flash" : "");
      card.innerHTML = `
        <div class="tc-head"><span class="tc-cat">${CAT_ICON[t.cat] || "📖"} ${t.cat}</span><span class="tc-no">#${t.id}</span></div>
        <div class="tc-title">${t.title}</div>
        <div class="tc-body">${t.body}</div>`;
      list.appendChild(card);
    });
  };

  const filtered = triviaFilter === "すべて" ? trivia : trivia.filter((t) => t.cat === triviaFilter);
  draw(filtered);

  el.querySelector("#trivia-random").addEventListener("click", () => {
    const pick = filtered[Math.floor(Math.random() * filtered.length)];
    draw([pick], pick.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  app.innerHTML = "";
  app.appendChild(el);
}

/* ---------------- コース詳細 ---------------- */
function renderCourse(courseId) {
  const course = getCourse(courseId);
  if (!course) return renderNotFound();
  const pr = P.courseProgress(course);

  const el = document.createElement("div");
  el.innerHTML = `
    <div class="breadcrumb"><a href="#/">ホーム</a> › ${course.title}</div>
    <div class="course-head"><div class="c-icon">${course.icon}</div>
      <div><h1>${course.title}</h1></div>
    </div>
    <p class="course-desc">${course.description}</p>
    ${course.note ? `<div class="callout warn">${renderMarkdown(course.note)}</div>` : ""}
    <div class="flex-between" style="margin:18px 0">
      <strong>進捗 ${pr.done}/${pr.total}</strong><span class="muted">${pr.pct}%</span>
    </div>
    <div class="mini-progress" style="margin-bottom:24px"><div style="width:${pr.pct}%"></div></div>
    <ul class="lesson-list" id="lesson-list"></ul>
  `;

  const list = el.querySelector("#lesson-list");
  course.lessons.forEach((l, i) => {
    const done = P.isLessonDone(l.id);
    const a = document.createElement("a");
    a.className = "lesson-item" + (done ? " done" : "");
    a.href = `#/course/${course.id}/lesson/${l.id}`;
    a.innerHTML = `
      <div class="lesson-num">${done ? "✓" : i + 1}</div>
      <div class="lesson-body"><div class="t">${l.title} ${levelChip(l.level)}</div><div class="d">⏱ ${l.duration}${l.quiz ? " ・ クイズあり" : ""}</div></div>
      <div class="lesson-check">${done ? "✅" : ""}</div>
    `;
    list.appendChild(a);
  });

  app.innerHTML = "";
  app.appendChild(el);
}

/* ---------------- レッスン ---------------- */
function renderLesson(courseId, lessonId) {
  const ctx = getLesson(courseId, lessonId);
  if (!ctx) return renderNotFound();
  const { course, lesson, prev, next, index } = ctx;

  const el = document.createElement("div");
  el.className = "lesson-layout";

  const head = document.createElement("div");
  head.innerHTML = `
    <div class="breadcrumb"><a href="#/">ホーム</a> › <a href="#/course/${course.id}">${course.title}</a> › レッスン ${index + 1} ${levelChip(lesson.level)}</div>
  `;
  el.appendChild(head);

  // 本文
  const prose = document.createElement("article");
  prose.className = "prose";
  prose.innerHTML = renderMarkdown(lesson.body);
  el.appendChild(prose);

  // 演習（実行可能）
  if (lesson.exercises && lesson.exercises.length) {
    lesson.exercises.forEach((ex) => {
      const heading = document.createElement("h3");
      heading.textContent = ex.label || "演習";
      heading.style.marginTop = "28px";
      el.appendChild(heading);
      let pg;
      const onSolved = () => {
        const r = P.clearQuiz(lesson.id + ":" + (ex.label || "ex"));
        if (r.xpGained) { updateRank(); toast(`正解！ +${r.xpGained} XP`); }
      };
      if (ex.type === "sql") pg = createSqlPlayground(ex.spec, onSolved);
      else if (ex.type === "html") pg = createHtmlPlayground(ex.spec);
      else pg = createJsPlayground(ex.spec, onSolved);
      el.appendChild(pg);
    });
  }

  // クイズ
  if (lesson.quiz && lesson.quiz.length) {
    const quizEl = createQuiz(
      lesson.quiz,
      () => {
        const r = P.clearQuiz(lesson.id);
        if (r.xpGained) { updateRank(); toast(`クイズ全問正解！ +${r.xpGained} XP`); }
      },
      P.isQuizCleared(lesson.id)
    );
    el.appendChild(quizEl);
  }

  // 完了 + ナビゲーション
  const done = P.isLessonDone(lesson.id);
  const navWrap = document.createElement("div");
  navWrap.className = "lesson-nav";

  const prevBtn = document.createElement("div");
  if (prev) prevBtn.innerHTML = `<a class="btn" href="#/course/${course.id}/lesson/${prev.id}">← ${prev.title}</a>`;
  navWrap.appendChild(prevBtn);

  const completeBtn = document.createElement("button");
  completeBtn.className = "btn " + (done ? "success" : "primary");
  completeBtn.textContent = done ? "✓ 完了済み" : "このレッスンを完了する";
  completeBtn.addEventListener("click", () => {
    const r = P.completeLesson(lesson.id);
    completeBtn.className = "btn success";
    completeBtn.textContent = "✓ 完了済み";
    updateRank();
    if (r.xpGained) toast(`レッスン完了！ +${r.xpGained} XP`);
    if (r.leveledUp) setTimeout(() => toast(`🎉 ランクアップ！ → ${r.newRank.icon} ${r.newRank.title}`), 900);
    showCompleteBanner(navWrap, course, next);
  });
  navWrap.appendChild(completeBtn);

  const nextBtn = document.createElement("div");
  if (next) nextBtn.innerHTML = `<a class="btn" href="#/course/${course.id}/lesson/${next.id}">${next.title} →</a>`;
  else nextBtn.innerHTML = `<a class="btn" href="#/course/${course.id}">コースに戻る</a>`;
  navWrap.appendChild(nextBtn);

  el.appendChild(navWrap);

  app.innerHTML = "";
  app.appendChild(el);
}

function showCompleteBanner(navWrap, course, next) {
  if (navWrap.parentElement.querySelector(".complete-banner")) return;
  const banner = document.createElement("div");
  banner.className = "complete-banner";
  banner.innerHTML = next
    ? `🎉 完了しました！ 次は <a href="#/course/${course.id}/lesson/${next.id}">「${next.title}」</a> へ進みましょう。`
    : `🎉 このコースの最後のレッスンを完了しました！ <a href="#/">ホーム</a> で達成度を確認しましょう。`;
  navWrap.parentElement.insertBefore(banner, navWrap);
}

function renderNotFound() {
  app.innerHTML = `<div style="text-align:center;padding:60px 0">
    <h1>404</h1><p class="muted">ページが見つかりませんでした。</p>
    <a class="btn primary" href="#/">ホームへ戻る</a></div>`;
}

/* ---------------- トースト ---------------- */
let toastTimer = null;
function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ---------------- 起動 ---------------- */
window.addEventListener("hashchange", router);
router();
