// HTML/CSS をサンドボックスiframeで安全にライブプレビューするプレイグラウンド
export function createHtmlPlayground(spec) {
  const wrap = document.createElement("div");
  wrap.className = "playground";
  wrap.innerHTML = `
    <div class="pg-head"><span class="pg-title">HTML / CSS エディタ</span><span class="muted" style="font-size:12px">▶ 入力するとプレビューに反映</span></div>
    <textarea class="pg-editor" spellcheck="false" style="min-height:${spec.height || 160}px"></textarea>
    <div class="pg-actions">
      <button class="btn primary act-run">▶ プレビュー更新</button>
      <button class="btn act-reset">↺ リセット</button>
    </div>
    <div class="pg-preview-wrap">
      <div class="pg-preview-label">プレビュー</div>
      <iframe class="pg-preview" sandbox="allow-same-origin" title="preview"></iframe>
    </div>`;

  const editor = wrap.querySelector(".pg-editor");
  const frame = wrap.querySelector(".pg-preview");
  editor.value = spec.starter || "";

  editor.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const s = editor.selectionStart, en = editor.selectionEnd;
      editor.value = editor.value.slice(0, s) + "  " + editor.value.slice(en);
      editor.selectionStart = editor.selectionEnd = s + 2;
    }
  });

  const render = () => {
    // スクリプトは実行させない（HTML/CSSの学習用プレビュー）
    const safe = editor.value.replace(/<script[\s\S]*?<\/script>/gi, "");
    const doc = `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8">
      <style>body{font-family:system-ui,-apple-system,"Hiragino Kaku Gothic ProN","Noto Sans JP",sans-serif;padding:14px;color:#111;background:#fff;}</style>
      </head><body>${safe}</body></html>`;
    frame.srcdoc = doc;
  };

  // 入力に応じて自動反映（軽いデバウンス）
  let t = null;
  editor.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(render, 250);
  });
  wrap.querySelector(".act-run").addEventListener("click", render);
  wrap.querySelector(".act-reset").addEventListener("click", () => {
    editor.value = spec.starter || "";
    render();
  });

  // 初期表示
  setTimeout(render, 0);
  return wrap;
}
