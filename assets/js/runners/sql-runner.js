// sql.js (SQLite WASM) をリポジトリ同梱ファイルから読み込み、ブラウザ内でSQLを実行する。
// 外部CDNに依存しないため、オフラインでも・ネットワーク制限下でも動作する。
// import.meta.url を基準に解決するので、GitHub Pages のサブパス公開でも正しく読み込める。
const VENDOR = new URL("../../vendor/sqljs/", import.meta.url).href;

// 学習用サンプルデータベースのスキーマ + データ
const SEED_SQL = `
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  age INTEGER,
  city TEXT
);
INSERT INTO users (id, name, email, age, city) VALUES
  (1, '佐藤 太郎', 'taro@example.com', 28, '東京'),
  (2, '鈴木 花子', 'hanako@example.com', 34, '大阪'),
  (3, '高橋 健', 'ken@example.com', 22, '東京'),
  (4, '田中 美咲', 'misaki@example.com', 41, '福岡'),
  (5, '伊藤 翔', 'sho@example.com', 30, '大阪');

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT,
  stock INTEGER
);
INSERT INTO products (id, name, price, category, stock) VALUES
  (1, 'ノートPC', 120000, '電子機器', 15),
  (2, 'マウス', 2500, '電子機器', 200),
  (3, 'デスクチェア', 35000, '家具', 8),
  (4, 'コーヒー豆', 1800, '食品', 120),
  (5, 'モニター', 28000, '電子機器', 30),
  (6, '観葉植物', 4500, '雑貨', 0);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  ordered_at TEXT
);
INSERT INTO orders (id, user_id, product_id, quantity, ordered_at) VALUES
  (1, 1, 1, 1, '2026-01-15'),
  (2, 1, 2, 2, '2026-01-15'),
  (3, 2, 5, 1, '2026-02-03'),
  (4, 3, 4, 5, '2026-02-20'),
  (5, 2, 3, 1, '2026-03-01'),
  (6, 5, 1, 1, '2026-03-11'),
  (7, 1, 4, 3, '2026-03-12');
`;

let SQLPromise = null;
function loadSqlJs() {
  if (SQLPromise) return SQLPromise;
  SQLPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `${VENDOR}sql-wasm.js`;
    s.onload = () => {
      // eslint-disable-next-line no-undef
      initSqlJs({ locateFile: (f) => `${VENDOR}${f}` }).then(resolve).catch(reject);
    };
    s.onerror = () => reject(new Error("SQLエンジン(sql.js)の読み込みに失敗しました"));
    document.head.appendChild(s);
  });
  return SQLPromise;
}

let dbPromise = null;
function getDb() {
  if (dbPromise) return dbPromise;
  dbPromise = loadSqlJs().then((SQL) => {
    const db = new SQL.Database();
    db.run(SEED_SQL);
    return db;
  });
  return dbPromise;
}

function renderResult(res) {
  if (!res.length) return '<span class="muted">クエリは成功しました（返される行はありません）</span>';
  const { columns, values } = res[0];
  let html = '<table class="result-table"><thead><tr>';
  for (const c of columns) html += `<th>${c}</th>`;
  html += "</tr></thead><tbody>";
  for (const row of values) {
    html += "<tr>";
    for (const cell of row) html += `<td>${cell == null ? "<span class='muted'>NULL</span>" : String(cell)}</td>`;
    html += "</tr>";
  }
  html += "</tbody></table>";
  html += `<div class="muted" style="margin-top:6px">${values.length} 行</div>`;
  return html;
}

function normalize(res) {
  if (!res.length) return "[]";
  return JSON.stringify({ columns: res[0].columns, values: res[0].values });
}

export function createSqlPlayground(spec, onSolved) {
  const wrap = document.createElement("div");
  wrap.className = "playground";
  wrap.innerHTML = `
    <div class="pg-head"><span class="pg-title">SQL エディタ（サンプルDB: users / products / orders）</span></div>
    <textarea class="pg-editor" spellcheck="false" style="min-height:${spec.height || 120}px"></textarea>
    <div class="pg-actions">
      <button class="btn primary act-run">▶ 実行</button>
      ${spec.expected != null ? '<button class="btn act-check">✓ 答え合わせ</button>' : ""}
      <button class="btn act-reset">↺ リセット</button>
      <button class="btn act-schema">⛁ テーブル定義を表示</button>
    </div>
    <div class="pg-output muted">ここに実行結果が表示されます</div>`;

  const editor = wrap.querySelector(".pg-editor");
  const output = wrap.querySelector(".pg-output");
  editor.value = spec.starter || "";

  const exec = async (sql) => {
    output.className = "pg-output muted";
    output.textContent = "実行中…（初回はDBエンジンを読み込みます）";
    try {
      const db = await getDb();
      const res = db.exec(sql);
      output.className = "pg-output";
      output.innerHTML = renderResult(res);
      return res;
    } catch (err) {
      output.className = "pg-output";
      output.innerHTML = `<span class="err">エラー: ${err.message}</span>`;
      return null;
    }
  };

  wrap.querySelector(".act-run").addEventListener("click", () => exec(editor.value));
  wrap.querySelector(".act-reset").addEventListener("click", () => {
    editor.value = spec.starter || "";
    output.className = "pg-output muted";
    output.textContent = "ここに実行結果が表示されます";
  });
  wrap.querySelector(".act-schema").addEventListener("click", () =>
    exec("SELECT name AS テーブル, sql AS 定義 FROM sqlite_master WHERE type='table';")
  );

  const checkBtn = wrap.querySelector(".act-check");
  if (checkBtn) {
    checkBtn.addEventListener("click", async () => {
      // ソース要件チェック（指定のSQL構文で書かれているか）。requires/forbids = {pattern, hint}
      const srcErrs = [];
      for (const r of spec.requires || []) {
        if (!new RegExp(r.pattern, r.flags || "i").test(editor.value)) srcErrs.push(r.hint || `必要な構文がありません: ${r.pattern}`);
      }
      for (const f of spec.forbids || []) {
        if (new RegExp(f.pattern, f.flags || "i").test(editor.value)) srcErrs.push(f.hint || `この書き方は避けてください: ${f.pattern}`);
      }
      if (srcErrs.length) {
        output.className = "pg-output";
        output.innerHTML = `<span class="err">❌ もう一歩！<br>${srcErrs.map((e) => "・" + e).join("<br>")}</span>`;
        return;
      }

      const got = await exec(editor.value);
      if (!got) return;
      const want = await getDb().then((db) => db.exec(spec.expected));
      const banner = document.createElement("div");
      banner.style.marginTop = "10px";
      if (normalize(got) === normalize(want)) {
        banner.className = "ok";
        banner.textContent = "✅ 正解！期待される結果と一致しました。";
        if (onSolved) onSolved();
      } else {
        banner.className = "err";
        banner.textContent = "❌ 結果が期待と異なります。WHERE句や列の順序を確認してみましょう。";
      }
      output.appendChild(banner);
    });
  }

  return wrap;
}

export function createSqlExample(sql) {
  return createSqlPlayground({ starter: sql, height: Math.min(220, 30 + sql.split("\n").length * 20) });
}
