export default {
  id: "frontend",
  tag: "frontend",
  icon: "🎨",
  title: "フロントエンド基礎（HTML / CSS）",
  short: "画面を作る土台。構造のHTMLと装飾のCSS",
  description:
    "JavaScriptでDOMを操作する前に、その土台であるHTML（構造）とCSS（見た目）を学びます。実際にプレビューしながら、フォームやレイアウト、レスポンシブ、そしてAjax・フレームワークの考え方までを身につけます。",
  lessons: [
    {
      id: "fe-1",
      title: "HTMLの基礎 ― ページの骨組み",
      level: 1,
      duration: "13分",
      body: `
# HTMLの基礎 ― ページの骨組み

Webページの「構造」を作るのが **HTML**（HyperText Markup Language）です。タグで意味づけしていきます。

## 基本構造

\`\`\`html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <title>ページタイトル</title>
  </head>
  <body>
    <h1>見出し</h1>
    <p>段落のテキスト。</p>
  </body>
</html>
\`\`\`

## よく使う要素

- 見出し: \`<h1>\`〜\`<h6>\`
- 段落: \`<p>\`、改行: \`<br>\`
- リンク: \`<a href="...">\`
- 画像: \`<img src="..." alt="代替テキスト">\`
- リスト: \`<ul><li>\`（箇条書き）/ \`<ol><li>\`（番号付き）
- まとまり: \`<div>\`（意味なし）/ \`<section>\`,\`<header>\`,\`<nav>\`,\`<footer>\`（意味あり）

## セマンティックHTML

\`<div>\` だけでなく、意味を持つタグ（\`<header>\`,\`<main>\`,\`<article>\`）を使うと、検索エンジンや支援技術、そして人間にも分かりやすくなります。**業務システムでも保守性が上がります。**

右のエディタでHTMLを書くと、下にプレビューされます。試してみましょう。
`,
      exercises: [
        {
          type: "html",
          label: "▶ HTMLを書いてプレビュー",
          spec: {
            starter: `<header>
  <h1>私のページ</h1>
</header>
<main>
  <p>これは<strong>最初の</strong>Webページです。</p>
  <ul>
    <li>HTMLは構造</li>
    <li>CSSは見た目</li>
    <li>JavaScriptは動き</li>
  </ul>
  <a href="https://example.com">リンクの例</a>
</main>`,
          },
        },
      ],
      quiz: [
        {
          q: "Webページの「構造（骨組み）」を担当するのは？",
          choices: ["HTML", "CSS", "SQL"],
          answer: 0,
          explain: "HTMLが構造、CSSが見た目、JavaScriptが動きを担当します。",
        },
        {
          q: "箇条書きリストを作るタグの組み合わせは？",
          choices: ["<ul><li>", "<p><a>", "<div><span>"],
          answer: 0,
          explain: "<ul>（順序なしリスト）の中に <li>（リスト項目）を並べます。",
        },
        {
          q: "<header> や <article> のように意味を持つタグを使う書き方を何という？",
          choices: ["セマンティックHTML", "インラインCSS", "クロージャ"],
          answer: 0,
          explain: "セマンティック（意味的）HTML。保守性・アクセシビリティが向上します。",
        },
      ],
    },
    {
      id: "fe-2",
      title: "CSSの基礎 ― 見た目を整える",
      level: 1,
      duration: "14分",
      body: `
# CSSの基礎 ― 見た目を整える

**CSS**（Cascading Style Sheets）でHTMLに色・大きさ・余白などの装飾を与えます。

## 書き方（セレクタ）

「どの要素に」「どんなスタイルを」適用するか書きます。

\`\`\`css
h1 { color: navy; font-size: 24px; }      /* 要素名で指定 */
.note { background: #eee; }                /* class（.） */
#main { width: 600px; }                    /* id（#） */
\`\`\`

HTML側ではこう結びつけます。

\`\`\`html
<p class="note">クラスで指定したスタイルが当たる</p>
\`\`\`

## ボックスモデル

すべての要素は「箱」です。内側から **content → padding（内側余白）→ border（枠）→ margin（外側余白）**。

\`\`\`css
.card {
  padding: 16px;
  border: 1px solid #ccc;
  margin: 12px;
  border-radius: 8px;
}
\`\`\`

## よく使うプロパティ

- 文字: \`color\`, \`font-size\`, \`font-weight\`, \`text-align\`
- 背景: \`background\`
- 余白: \`margin\`, \`padding\`
- 大きさ: \`width\`, \`height\`

下のエディタは \`<style>\` を含めて書けます（プレビューに反映されます）。
`,
      exercises: [
        {
          type: "html",
          label: "▶ CSSで装飾する",
          spec: {
            starter: `<style>
  .card {
    background: #f0f7ff;
    border: 1px solid #58a6ff;
    border-radius: 10px;
    padding: 16px;
    color: #0d1117;
  }
  .card h2 { color: #1565c0; margin: 0 0 8px; }
</style>

<div class="card">
  <h2>カード</h2>
  <p>paddingやborderで「箱」を整えています。色や数値を変えてみよう。</p>
</div>`,
          },
        },
      ],
      quiz: [
        {
          q: "class=\"note\" の要素を狙うCSSセレクタは？",
          choices: [".note", "#note", "note"],
          answer: 0,
          explain: "クラスはピリオド（.note）、idはシャープ（#id）で指定します。",
        },
        {
          q: "要素の「内側の余白」を指定するプロパティは？",
          choices: ["padding", "margin", "border"],
          answer: 0,
          explain: "padding が内側余白、margin が外側余白です。",
        },
      ],
    },
    {
      id: "fe-3",
      title: "レイアウト ― Flexbox と Grid",
      level: 2,
      duration: "15分",
      body: `
# レイアウト ― Flexbox と Grid

要素を「横に並べる」「均等に配置する」など、現代のレイアウトは Flexbox と Grid で行います。

## Flexbox（1次元：横 or 縦の並び）

\`\`\`css
.row {
  display: flex;
  gap: 12px;                  /* 要素間のすき間 */
  justify-content: space-between; /* 横方向の配置 */
  align-items: center;        /* 縦方向の配置 */
}
\`\`\`

- \`justify-content\`: \`flex-start\` / \`center\` / \`space-between\` …
- \`align-items\`: \`stretch\` / \`center\` …
- \`flex-wrap: wrap\` で折り返し

## Grid（2次元：行と列）

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3等分の列 */
  gap: 16px;
}
\`\`\`

カード一覧やダッシュボードのような格子レイアウトに最適です。

:::tip
「横に並べたい」→ まず Flexbox。「縦横の格子」→ Grid。この使い分けを覚えると、たいていの画面は組めます。
:::
`,
      exercises: [
        {
          type: "html",
          label: "▶ Flexboxで横並び",
          spec: {
            starter: `<style>
  .row { display: flex; gap: 10px; }
  .box { flex: 1; background: #58a6ff; color: #fff; padding: 20px; text-align: center; border-radius: 8px; }
</style>
<div class="row">
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
</div>`,
          },
        },
      ],
      quiz: [
        {
          q: "要素を横一列に並べるのに最も手軽なのは？",
          choices: ["display: flex", "color: red", "position: static"],
          answer: 0,
          explain: "display:flex（Flexbox）で簡単に横並び・配置調整ができます。",
        },
        {
          q: "行と列の2次元の格子レイアウトに向くのは？",
          choices: ["CSS Grid", "Flexbox", "table のみ"],
          answer: 0,
          explain: "2次元の格子は Grid が得意。1次元の並びは Flexbox が手軽です。",
        },
      ],
    },
    {
      id: "fe-4",
      title: "レスポンシブデザイン",
      level: 2,
      duration: "12分",
      body: `
# レスポンシブデザイン

PC・タブレット・スマホなど、画面幅に応じてレイアウトを変える手法です。業務システムでも、現場でスマホ／タブレット利用が増えています。

## ビューポート設定（必須）

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

## メディアクエリ

画面幅で条件分岐してスタイルを切り替えます。

\`\`\`css
.grid { grid-template-columns: repeat(3, 1fr); }

@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; } /* 狭い画面では1列に */
}
\`\`\`

## 相対単位を使う

- \`%\`, \`fr\`, \`vw/vh\`（画面比）, \`rem\`（文字基準）
- 固定 \`px\` ばかりだと窮屈に。可変単位で「伸び縮み」させる

:::tip
「モバイルファースト」＝まず狭い画面用に作り、広い画面向けに足していく考え方。崩れにくく保守しやすいです。
:::
`,
      quiz: [
        {
          q: "画面幅に応じてスタイルを切り替えるCSSの仕組みは？",
          choices: ["メディアクエリ(@media)", "JSON", "JOIN"],
          answer: 0,
          explain: "@media (条件) { ... } で画面幅などに応じた指定ができます。",
        },
        {
          q: "スマホで正しく表示するために<head>に必要なのは？",
          choices: ["viewport の meta タグ", "favicon", "コメント"],
          answer: 0,
          explain: "width=device-width の viewport 指定が無いと、スマホで縮小表示されます。",
        },
      ],
    },
    {
      id: "fe-5",
      title: "フォームと入力",
      level: 2,
      duration: "13分",
      body: `
# フォームと入力

ユーザーからデータを受け取るのがフォームです。業務システムの入力画面の基礎です。

## 基本

\`\`\`html
<form>
  <label>名前: <input type="text" name="name" required></label>
  <label>年齢: <input type="number" name="age" min="0"></label>
  <label>メール: <input type="email" name="email"></label>
  <label>性別:
    <select name="gender">
      <option value="m">男性</option>
      <option value="f">女性</option>
    </select>
  </label>
  <button type="submit">送信</button>
</form>
\`\`\`

## 入力タイプと属性

- \`type\`: \`text\`, \`number\`, \`email\`, \`password\`, \`date\`, \`checkbox\`, \`radio\`
- \`required\`（必須）, \`min/max\`, \`maxlength\`, \`pattern\`（正規表現）

## クライアント側チェックは「親切」、本当の検証は「サーバー側」

ブラウザの \`required\` などは**入力ミスを早く知らせるUXのため**。しかし、これだけでは安全ではありません。

:::warn
HTMLやJSの入力チェックは**簡単に回避できます**（開発者ツールやAPI直叩き）。**堅牢なシステムにするには、入力検証を必ずサーバー側でも行う**必要があります。詳しくは「Webの仕組みとインフラ」コースの『入力検証はサーバー側で』で扱います。
:::
`,
      exercises: [
        {
          type: "html",
          label: "▶ フォームを作る",
          spec: {
            starter: `<form>
  <p><label>名前: <input type="text" required></label></p>
  <p><label>年齢: <input type="number" min="0" max="120"></label></p>
  <p><label>メール: <input type="email" placeholder="you@example.com"></label></p>
  <button type="submit">送信</button>
</form>`,
          },
        },
      ],
      quiz: [
        {
          q: "メールアドレス入力に適した input の type は？",
          choices: ["email", "text のみ", "submit"],
          answer: 0,
          explain: "type=\"email\" は形式チェックやモバイルの最適キーボードを提供します。",
        },
        {
          q: "HTML/JSの入力チェックについて正しいのは？",
          choices: ["それだけで安全", "UXのためで、検証は必ずサーバー側でも必要", "サーバー側は不要になる"],
          answer: 1,
          explain: "クライアント側チェックは回避可能。堅牢性のためサーバー側検証が必須です。",
        },
      ],
    },
    {
      id: "fe-6",
      title: "Ajax ― 画面を再読み込みせず更新する",
      level: 3,
      duration: "15分",
      body: `
# Ajax ― 画面を再読み込みせず更新する

**Ajax**（Asynchronous JavaScript and XML）は、「ページ全体を再読み込みせずに、裏でサーバーと通信して画面の一部だけを更新する」技術の総称です。現代のWebアプリの体験を支える基本概念です。

## 何が嬉しいのか

昔のWebは、ボタンを押すたびにページ全体が真っ白になって再読み込みされていました。Ajaxにより、

- 検索結果だけを差し替える
- 「いいね」を押した瞬間に数字だけ変わる
- スクロールで続きを読み込む（無限スクロール）

といった、**滑らかな操作**が可能になりました。

## 昔の書き方（XMLHttpRequest）

\`\`\`javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/users");
xhr.onload = () => { console.log(xhr.responseText); };
xhr.send();
\`\`\`

## 現代の書き方（fetch ＋ async/await）

中身は同じ「Ajax」ですが、今は \`fetch\` で書きます（JavaScriptコースの非同期処理で学んだ通り）。

\`\`\`javascript
async function loadUsers() {
  const res = await fetch("/api/users");   // 裏で通信
  const users = await res.json();          // JSONで受け取る
  document.querySelector("#list").textContent = users.length + "件";
}
\`\`\`

:::tip
「Ajax」は特定の関数名ではなく**手法の名前**。今日では fetch（または axios 等）で実現します。データ形式もXMLよりJSONが主流です。名前にXMLとあるのは歴史的経緯です。
:::
`,
      exercises: [
        {
          type: "js",
          label: "▶ Ajax的な部分更新を体感する",
          spec: {
            starter: `// サーバー通信を模擬（0.4秒後にデータが返る）
function fakeApi() {
  return new Promise(r => setTimeout(() => r(["太郎","花子","健"]), 400));
}
// 「ページ全体ではなく一部だけ」を更新するイメージ
async function update() {
  console.log("画面: 読み込み中...");
  const users = await fakeApi();
  console.log("画面の一部を差し替え → 登録者 " + users.length + "名: " + users.join(", "));
}
update();`,
          },
        },
      ],
      quiz: [
        {
          q: "Ajaxの最大の利点は？",
          choices: ["ページ全体を再読み込みせず一部だけ更新できる", "SQLが速くなる", "HTMLが不要になる"],
          answer: 0,
          explain: "非同期通信で画面の一部だけ更新でき、滑らかな操作を実現します。",
        },
        {
          q: "現代でAjaxを実現する主な手段は？",
          choices: ["fetch（や axios）", "GROUP BY", "for 文だけ"],
          answer: 0,
          explain: "今は fetch + async/await が主流。データ形式もJSONが一般的です。",
        },
      ],
    },
    {
      id: "fe-7",
      title: "【発展】フロントエンドフレームワーク入門",
      level: 3,
      duration: "14分",
      body: `
# 【発展】フロントエンドフレームワーク入門

画面が複雑になると、素のDOM操作（手で \`createElement\`）では管理が大変になります。そこで **React / Vue** などのフレームワークが使われます。

## 解決したい課題

- 状態（データ）と画面の同期が手作業だとバグる
- 同じUI部品を何度も書くのが大変
- 大規模になると見通しが悪くなる

## 宣言的UI

「こう操作したらこうDOMを変える」（命令的）ではなく、「**この状態ならこの見た目**」（宣言的）と書くのが現代流。状態が変われば画面は自動で更新されます。

\`\`\`jsx
// Reactのイメージ（擬似コード）
function Counter() {
  const [count, setCount] = useState(0);  // 状態
  return (
    <button onClick={() => setCount(count + 1)}>
      クリック: {count}回
    </button>
  );
}
\`\`\`

\`count\` を変えるだけで表示が自動更新。DOM操作を直接書きません。

## コンポーネント

UIを「部品（コンポーネント）」に分け、組み合わせて画面を作ります。再利用・テスト・分担がしやすくなります。

:::tip
フレームワークは強力ですが、土台は本コースで学んだ HTML / CSS / JavaScript（特に状態とイベント）です。基礎があれば、どのフレームワークも理解が速くなります。
:::
`,
      quiz: [
        {
          q: "「この状態ならこの見た目」と書き、状態変化で画面が自動更新される考え方は？",
          choices: ["宣言的UI", "命令的DOM操作", "正規化"],
          answer: 0,
          explain: "宣言的UI。React/Vueの中核で、状態と画面を自動で同期します。",
        },
        {
          q: "Reactなどで画面を「部品」に分ける単位は？",
          choices: ["コンポーネント", "テーブル", "インデックス"],
          answer: 0,
          explain: "コンポーネント単位で分割し、再利用・分担しやすくします。",
        },
      ],
    },
  ],
};
