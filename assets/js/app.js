import { courses, getCourse, getLesson } from "./data/curriculum.js";
import { renderMarkdown } from "./markdown.js";
import * as P from "./progress.js";
import { createJsPlayground } from "./runners/js-runner.js";
import { createSqlPlayground } from "./runners/sql-runner.js";
import { createQuiz } from "./runners/quiz.js";

const app = document.getElementById("app");

/* ---------------- ヘッダー（ナビ + ランク） ---------------- */
function renderHeader() {
  const nav = document.getElementById("top-nav");
  const route = parseHash();
  nav.innerHTML = "";
  const home = link("#/", "ホーム");
  if (route.name === "home") home.classList.add("active");
  nav.appendChild(home);
  for (const c of courses) {
    const a = link(`#/course/${c.id}`, `${c.icon} ${c.title}`);
    if (route.name !== "home" && route.courseId === c.id) a.classList.add("active");
    nav.appendChild(a);
  }
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
  const parts = h.split("/").filter(Boolean); // e.g. ["course","javascript","lesson","js-1"]
  if (parts[0] === "course" && parts[2] === "lesson") {
    return { name: "lesson", courseId: parts[1], lessonId: parts[3] };
  }
  if (parts[0] === "course") return { name: "course", courseId: parts[1] };
  return { name: "home" };
}

function router() {
  const route = parseHash();
  window.scrollTo(0, 0);
  if (route.name === "course") renderCourse(route.courseId);
  else if (route.name === "lesson") renderLesson(route.courseId, route.lessonId);
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
      <p>Webシステム開発に必要なすべてを、ブラウザだけで学べる学習プラットフォーム。
         <strong>JavaScript</strong> ・ <strong>SQL</strong> は実際に実行、<strong>Java</strong> はコード読解と演習で身につけます。</p>
      <div class="hero-stats">
        <div class="hero-stat"><div class="num">${courses.length}</div><div class="lbl">コース</div></div>
        <div class="hero-stat"><div class="num">${totalLessons}</div><div class="lbl">レッスン</div></div>
        <div class="hero-stat"><div class="num">${tp.pct}%</div><div class="lbl">あなたの達成度</div></div>
        <div class="hero-stat"><div class="num">${rank.icon}</div><div class="lbl">${rank.title}</div></div>
      </div>
    </section>

    <h2 class="section-title">📚 コース一覧</h2>
    <div class="course-grid" id="course-grid"></div>

    <h2 class="section-title">🏆 獲得バッジ</h2>
    <div class="badge-row" id="badge-row"></div>

    <div class="flex-between" style="margin-top:40px">
      <span class="muted">進捗は端末内(localStorage)に保存されます。</span>
      <button class="danger-link" id="reset-btn">進捗をリセット</button>
    </div>
  `;

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
      <div class="lesson-body"><div class="t">${l.title}</div><div class="d">⏱ ${l.duration}${l.quiz ? " ・ クイズあり" : ""}</div></div>
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
    <div class="breadcrumb"><a href="#/">ホーム</a> › <a href="#/course/${course.id}">${course.title}</a> › レッスン ${index + 1}</div>
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
