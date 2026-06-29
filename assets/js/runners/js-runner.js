// JavaScriptコードをサンドボックス(iframe)内で実行し、console出力を捕捉する
function runInSandbox(code) {
  return new Promise((resolve) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.sandbox = "allow-scripts";
    const logs = [];
    let done = false;

    const finish = (extra) => {
      if (done) return;
      done = true;
      window.removeEventListener("message", onMsg);
      iframe.remove();
      resolve({ logs, ...extra });
    };

    const onMsg = (e) => {
      if (!e.data || e.data.__rtdg !== true) return;
      if (e.data.type === "log") logs.push(e.data.line);
      if (e.data.type === "error") finish({ error: e.data.message });
      if (e.data.type === "done") finish({});
    };
    window.addEventListener("message", onMsg);

    const html = `<!DOCTYPE html><html><body><script>
      (function(){
        const post = (type, payload) => parent.postMessage(Object.assign({__rtdg:true,type}, payload), "*");
        const fmt = (a) => a.map(v => {
          if (typeof v === "string") return v;
          try { return JSON.stringify(v); } catch { return String(v); }
        }).join(" ");
        console.log = (...a) => post("log", { line: fmt(a) });
        console.info = console.log; console.warn = console.log;
        console.error = (...a) => post("log", { line: fmt(a) });
        window.onerror = (msg) => { post("error", { message: String(msg) }); return true; };
        try {
          ${code}
          post("done", {});
        } catch (err) {
          post("error", { message: (err && err.message) ? err.message : String(err) });
        }
      })();
    <\/script></body></html>`;

    iframe.srcdoc = html;
    document.body.appendChild(iframe);
    setTimeout(() => finish({ error: "実行がタイムアウトしました（無限ループの可能性）" }), 5000);
  });
}

// playground UIを生成。spec: { starter, expected?, height? }
export function createJsPlayground(spec, onSolved) {
  const wrap = document.createElement("div");
  wrap.className = "playground";
  wrap.innerHTML = `
    <div class="pg-head"><span class="pg-title">JavaScript エディタ</span><span class="muted" style="font-size:12px">▶ 実行で結果を確認</span></div>
    <textarea class="pg-editor" spellcheck="false" style="min-height:${spec.height || 150}px"></textarea>
    <div class="pg-actions">
      <button class="btn primary act-run">▶ 実行</button>
      ${spec.expected != null ? '<button class="btn act-check">✓ 答え合わせ</button>' : ""}
      <button class="btn act-reset">↺ リセット</button>
    </div>
    <div class="pg-output muted">ここに実行結果が表示されます</div>`;

  const editor = wrap.querySelector(".pg-editor");
  const output = wrap.querySelector(".pg-output");
  editor.value = spec.starter || "";

  editor.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const s = editor.selectionStart, en = editor.selectionEnd;
      editor.value = editor.value.slice(0, s) + "  " + editor.value.slice(en);
      editor.selectionStart = editor.selectionEnd = s + 2;
    }
  });

  const run = async () => {
    output.className = "pg-output muted";
    output.textContent = "実行中…";
    const res = await runInSandbox(editor.value);
    output.innerHTML = "";
    output.className = "pg-output";
    if (res.logs.length) output.textContent = res.logs.join("\n");
    if (res.error) {
      const e = document.createElement("div");
      e.className = "err";
      e.textContent = "エラー: " + res.error;
      output.appendChild(e);
    } else if (!res.logs.length) {
      output.innerHTML = '<span class="muted">（console.log の出力はありませんでした）</span>';
    }
    return res;
  };

  wrap.querySelector(".act-run").addEventListener("click", run);
  wrap.querySelector(".act-reset").addEventListener("click", () => {
    editor.value = spec.starter || "";
    output.className = "pg-output muted";
    output.textContent = "ここに実行結果が表示されます";
  });

  const checkBtn = wrap.querySelector(".act-check");
  if (checkBtn) {
    checkBtn.addEventListener("click", async () => {
      const res = await run();
      const got = res.logs.join("\n").trim();
      const want = String(spec.expected).trim();
      const banner = document.createElement("div");
      if (got === want) {
        banner.className = "ok";
        banner.textContent = "✅ 正解！期待される出力と一致しました。";
        output.appendChild(document.createElement("br"));
        output.appendChild(banner);
        if (onSolved) onSolved();
      } else {
        banner.className = "err";
        banner.textContent = `❌ 期待された出力と異なります。\n期待: ${want}\n実際: ${got || "(なし)"}`;
        output.appendChild(document.createElement("br"));
        output.appendChild(banner);
      }
    });
  }

  return wrap;
}

// 読み取り専用のコード例（実行ボタン付き）
export function createJsExample(code) {
  return createJsPlayground({ starter: code, height: Math.min(300, 30 + code.split("\n").length * 20) });
}
