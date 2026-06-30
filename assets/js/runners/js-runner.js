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

// コメントを除去（要件チェックが説明コメントに反応しないように）。
// 行コメント // … は除去するが、URLの :// は保護する。ブロックコメントも除去。
function stripComments(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

// ソースコードの要件チェック。requires/forbids は {pattern, hint} の配列。
// pattern は正規表現文字列。requires=含まれるべき / forbids=含んではいけない。
// 判定はコメントを除いた実コードに対して行う。
function checkSource(code, spec) {
  const src = stripComments(code);
  const errs = [];
  for (const r of spec.requires || []) {
    const re = new RegExp(r.pattern, r.flags || "");
    if (!re.test(src)) errs.push(r.hint || `コードに必要な記述が含まれていません: ${r.pattern}`);
  }
  for (const f of spec.forbids || []) {
    const re = new RegExp(f.pattern, f.flags || "");
    if (re.test(src)) errs.push(f.hint || `この書き方は使わずに解いてください: ${f.pattern}`);
  }
  return errs;
}

// 関数テスト用ハーネスを生成。ユーザーコードの後ろに付けて実行し、@@T@@行で結果を回収する。
function buildHarness(tests) {
  let s = "\n;(function(){\n  function __out(o){ console.log('@@T@@' + JSON.stringify(o)); }\n";
  tests.forEach((t, i) => {
    s += `  try { __out({ i:${i}, got: (${t.call}) }); }\n`;
    s += `  catch(e){ __out({ i:${i}, err: String((e && e.message) || e) }); }\n`;
  });
  s += "})();\n";
  return s;
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

// playground UIを生成。
// spec: { starter, height?, expected?, tests?:[{call,expect,label?}], requires?, forbids? }
export function createJsPlayground(spec, onSolved) {
  const checkable = spec.expected != null || (spec.tests && spec.tests.length);
  const wrap = document.createElement("div");
  wrap.className = "playground";
  wrap.innerHTML = `
    <div class="pg-head"><span class="pg-title">JavaScript エディタ</span><span class="muted" style="font-size:12px">▶ 実行で結果を確認</span></div>
    <textarea class="pg-editor" spellcheck="false" style="min-height:${spec.height || 150}px"></textarea>
    <div class="pg-actions">
      <button class="btn primary act-run">▶ 実行</button>
      ${checkable ? '<button class="btn act-check">✓ 答え合わせ</button>' : ""}
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

  const fail = (msg) => {
    output.className = "pg-output";
    output.innerHTML = `<span class="err">${msg.replace(/\n/g, "<br>")}</span>`;
  };
  const pass = (msg) => {
    output.className = "pg-output";
    output.innerHTML = `<span class="ok">${msg.replace(/\n/g, "<br>")}</span>`;
    if (onSolved) onSolved();
  };

  const checkBtn = wrap.querySelector(".act-check");
  if (checkBtn) {
    checkBtn.addEventListener("click", async () => {
      // 1) ソース要件チェック（指定の方法で書かれているか）
      const srcErrs = checkSource(editor.value, spec);
      if (srcErrs.length) {
        fail("❌ もう一歩！\n" + srcErrs.map((e) => "・" + e).join("\n"));
        return;
      }

      // 2) 関数テスト方式（複数の入力で検証 → 答えの決め打ちを防ぐ）
      if (spec.tests && spec.tests.length) {
        output.className = "pg-output muted";
        output.textContent = "テスト実行中…";
        const res = await runInSandbox(editor.value + buildHarness(spec.tests));
        if (res.error) { fail("実行エラー: " + res.error); return; }
        const results = {};
        for (const line of res.logs) {
          if (line.startsWith("@@T@@")) {
            try { const o = JSON.parse(line.slice(5)); results[o.i] = o; } catch {}
          }
        }
        const rows = spec.tests.map((t, i) => {
          const r = results[i] || {};
          const ok = !("err" in r) && deepEqual(r.got, t.expect);
          return { label: t.label || t.call, ok, got: "err" in r ? "例外: " + r.err : JSON.stringify(r.got), want: JSON.stringify(t.expect) };
        });
        const allPass = rows.every((r) => r.ok);
        const lines = rows.map((r) => `${r.ok ? "✅" : "❌"} ${r.label} → ${r.got}${r.ok ? "" : "（期待: " + r.want + "）"}`).join("\n");
        if (allPass) pass("✅ 全テスト合格！正しく実装できています。\n" + lines);
        else fail("❌ 一部のテストが不合格です。すべての入力で正しく動くようにしましょう。\n" + lines);
        return;
      }

      // 3) 出力一致方式（後方互換）
      const res = await run();
      const got = res.logs.filter((l) => !l.startsWith("@@T@@")).join("\n").trim();
      const want = String(spec.expected).trim();
      if (got === want) pass("✅ 正解！期待される出力と一致しました。");
      else fail(`❌ 期待された出力と異なります。\n期待: ${want}\n実際: ${got || "(なし)"}`);
    });
  }

  return wrap;
}

// 読み取り専用のコード例（実行ボタン付き）
export function createJsExample(code) {
  return createJsPlayground({ starter: code, height: Math.min(300, 30 + code.split("\n").length * 20) });
}
