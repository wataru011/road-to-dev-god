// クイズUI。questions: [{ q, choices:[], answer:index, explain }]
// 全問正解で onCleared を呼ぶ
export function createQuiz(questions, onCleared, alreadyCleared) {
  const wrap = document.createElement("div");
  wrap.className = "quiz";
  wrap.innerHTML = `<h3>📝 理解度チェック</h3>`;

  const selections = new Array(questions.length).fill(null);

  questions.forEach((item, qi) => {
    const q = document.createElement("div");
    q.className = "quiz-q";
    q.innerHTML = `<div class="q-text">${qi + 1}. ${item.q}</div>`;
    const choices = document.createElement("div");
    choices.className = "quiz-choices";

    item.choices.forEach((choice, ci) => {
      const label = document.createElement("label");
      label.className = "quiz-choice";
      label.innerHTML = `<input type="radio" name="q${qi}" value="${ci}"><span>${choice}</span>`;
      label.querySelector("input").addEventListener("change", () => {
        selections[qi] = ci;
        choices.querySelectorAll(".quiz-choice").forEach((c) => c.classList.remove("selected"));
        label.classList.add("selected");
      });
      choices.appendChild(label);
    });

    const explain = document.createElement("div");
    explain.className = "quiz-explain";
    explain.textContent = item.explain || "";

    q.appendChild(choices);
    q.appendChild(explain);
    wrap.appendChild(q);
  });

  const actions = document.createElement("div");
  actions.innerHTML = `<button class="btn primary">採点する</button> <span class="quiz-score muted" style="margin-left:10px"></span>`;
  const btn = actions.querySelector("button");
  const score = actions.querySelector(".quiz-score");
  wrap.appendChild(actions);

  if (alreadyCleared) score.textContent = "✅ クリア済み";

  btn.addEventListener("click", () => {
    let correct = 0;
    questions.forEach((item, qi) => {
      const qEl = wrap.querySelectorAll(".quiz-q")[qi];
      const choiceEls = qEl.querySelectorAll(".quiz-choice");
      choiceEls.forEach((c) => c.classList.remove("correct", "wrong"));
      choiceEls[item.answer].classList.add("correct");
      if (selections[qi] === item.answer) correct++;
      else if (selections[qi] != null) choiceEls[selections[qi]].classList.add("wrong");
      qEl.querySelector(".quiz-explain").classList.add("show");
    });
    score.textContent = `${correct} / ${questions.length} 正解`;
    score.className = "quiz-score " + (correct === questions.length ? "ok" : "muted");
    if (correct === questions.length && onCleared) onCleared();
  });

  return wrap;
}
