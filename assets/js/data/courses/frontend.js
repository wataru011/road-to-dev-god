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
    {
      id: "fe-8",
      title: "セマンティックHTMLとアクセシビリティ",
      level: 3,
      duration: "15分",
      body: `
# セマンティックHTMLとアクセシビリティ

HTMLの上級は「正しい意味づけ」と「誰でも使える」設計です。業務システムでも、キーボード操作や読み上げへの配慮は使いやすさ・保守性に直結します。

## 意味のあるタグを使う

\`\`\`html
<!-- ❌ div だらけ（意味が無い） -->
<div class="header"><div class="title">受注一覧</div></div>

<!-- ✅ 意味のある構造 -->
<header><h1>受注一覧</h1></header>
<nav>...</nav>
<main>
  <section aria-labelledby="list-h">
    <h2 id="list-h">検索結果</h2>
  </section>
</main>
<footer>...</footer>
\`\`\`

## 見出しの階層を守る

\`<h1>\`→\`<h2>\`→\`<h3>\` を飛ばさず、文書構造として正しく。スクリーンリーダーは見出しで全体を把握します。

## フォームはラベルと結びつける

\`\`\`html
<label for="email">メール</label>
<input id="email" type="email" name="email">
\`\`\`

\`label\` と \`input\` を \`for\`/\`id\` で結ぶと、ラベルクリックで入力でき、読み上げも正確になります。

## 画像・操作の配慮

- 画像には \`alt\`（意味を表す代替テキスト。装飾画像は \`alt=""\`）
- **キーボードだけで操作可能**に（マウス前提にしない）
- 色だけで情報を伝えない（色覚多様性への配慮）
- 必要に応じて **WAI-ARIA**（\`aria-label\`, \`role\` 等）で補足

:::tip
アクセシブルなHTMLは「特別な対応」ではなく「正しいHTML」。正しく書けば、支援技術にも検索にも、そして未来の保守担当者にも優しくなります。
:::
`,
      exercises: [
        {
          type: "html",
          label: "▶ 意味のある構造で書く",
          spec: {
            starter: `<header>
  <h1>社員検索</h1>
</header>
<main>
  <form>
    <label for="kw">キーワード</label>
    <input id="kw" type="text">
    <button type="submit">検索</button>
  </form>
  <section aria-labelledby="r">
    <h2 id="r">結果</h2>
    <ul>
      <li>佐藤 太郎</li>
      <li>鈴木 花子</li>
    </ul>
  </section>
</main>`,
          },
        },
      ],
      quiz: [
        {
          q: "ラベルと入力欄を結びつける正しい方法は？",
          choices: ["label の for と input の id を一致させる", "div で囲むだけ", "色を変える"],
          answer: 0,
          explain: "for と id を一致させると、クリック操作や読み上げが正確になります。",
        },
        {
          q: "意味のあるタグ(header/main/section等)を使う利点として正しいのは？",
          choices: ["支援技術・保守性・構造把握に優れる", "表示が必ず速くなる", "CSSが不要になる"],
          answer: 0,
          explain: "セマンティックHTMLは可読性・アクセシビリティ・保守性を高めます。",
        },
        {
          q: "操作可能なUIで配慮すべきことは？",
          choices: ["キーボードだけでも操作できる", "マウス専用にする", "色だけで状態を伝える"],
          answer: 0,
          explain: "キーボード操作可能にし、色だけに依存しないのがアクセシビリティの基本です。",
        },
      ],
    },
    {
      id: "fe-9",
      title: "CSS設計と再利用（変数・命名規則）",
      level: 3,
      duration: "15分",
      body: `
# CSS設計と再利用（変数・命名規則）

CSSは放置すると「どこに何が効いているか分からない」カオスになります。上級では**壊れにくいCSS**の書き方を学びます。

## カスタムプロパティ（CSS変数）

色や余白を一元管理。変更が一箇所で済みます。

\`\`\`css
:root {
  --brand: #1565c0;
  --space: 8px;
}
.button { background: var(--brand); padding: var(--space); }
\`\`\`

## 命名規則（BEM）

「どの部品の・どの要素が・どの状態か」を名前で表します。

\`\`\`css
.card { }            /* Block：部品 */
.card__title { }     /* Element：構成要素 */
.card--featured { }  /* Modifier：状態/種類 */
\`\`\`

名前が衝突せず、CSSの影響範囲が読めるようになります。

## 詳細度(specificity)の戦争を避ける

\`#id\` や \`!important\` を多用すると、後から上書きできず泥沼に。**クラス中心**で詳細度を低く保つのが定石です。

\`\`\`css
/* ❌ 強すぎて上書き困難 */
#main .list li.active { color: red !important; }
/* ✅ クラスで素直に */
.list__item--active { color: red; }
\`\`\`

## ユーティリティと再利用

\`.mt-2\`（margin-top）のような小さな部品を組み合わせる方針もあります（Tailwind等の発想）。プロジェクトで方針を統一することが何より大切。

:::tip
CSSは「全体に効く」言語。だからこそ**命名と影響範囲の設計**が品質を決めます。チームで規約を決めましょう。
:::
`,
      exercises: [
        {
          type: "html",
          label: "▶ CSS変数とBEMで書く",
          spec: {
            starter: `<style>
  :root { --brand: #1565c0; --radius: 10px; }
  .card { border: 1px solid #ddd; border-radius: var(--radius); padding: 16px; }
  .card__title { color: var(--brand); margin: 0 0 8px; }
  .card--featured { border-color: var(--brand); background: #f0f7ff; }
</style>
<div class="card card--featured">
  <h3 class="card__title">注目のカード</h3>
  <p>変数 --brand を変えると色がまとめて変わります。</p>
</div>`,
          },
        },
      ],
      quiz: [
        {
          q: "色や余白を一元管理できるCSSの仕組みは？",
          choices: ["カスタムプロパティ(CSS変数)", "JOIN", "for文"],
          answer: 0,
          explain: "var(--name) で参照するCSS変数で、一箇所の変更を全体に反映できます。",
        },
        {
          q: "後から上書きできない「詳細度の戦争」を避けるには？",
          choices: ["クラス中心で詳細度を低く保つ", "!important を多用する", "全部 id で指定する"],
          answer: 0,
          explain: "id や !important の多用は泥沼の元。クラス中心が定石です。",
        },
      ],
    },
    {
      id: "fe-10",
      title: "【神】モダンCSS ― 変数・アニメーション・新レイアウト",
      level: 4,
      duration: "16分",
      body: `
# 【神】モダンCSS ― 変数・アニメーション・新レイアウト

現代CSSは非常に強力で、かつてJSが必要だった表現も標準機能で書けます。

## トランジションとアニメーション

\`\`\`css
.button {
  background: #1565c0;
  transition: transform .15s ease, background .15s ease;
}
.button:hover { transform: translateY(-2px); background: #1976d2; }
\`\`\`

\`@keyframes\` で複雑な動きも：

\`\`\`css
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.modal { animation: fadeIn .3s ease; }
\`\`\`

## 関数で柔軟に

- \`clamp(最小, 推奨, 最大)\` … 可変なのに上限下限を持つサイズ
- \`min()\` / \`max()\` … 状況で小さい/大きい方を採用

\`\`\`css
.title { font-size: clamp(20px, 4vw, 40px); }  /* 画面で伸縮、でも限度あり */
\`\`\`

## 新しいレイアウト・機能

- **コンテナクエリ**: 画面ではなく「親要素の幅」で切り替え（部品が場所に適応）
- **:has()**: 「特定の子を持つ親」を選択できる強力なセレクタ
- **aspect-ratio**, **gap**, **subgrid** など

## ダークモード対応も標準で

\`\`\`css
@media (prefers-color-scheme: dark) {
  :root { --bg: #0d1117; --text: #e6edf3; }
}
\`\`\`

:::tip
「これJSいる？」と思ったら、まずモダンCSSでできないか調べる。標準機能で済めば軽く・速く・壊れにくくなります。
:::
`,
      exercises: [
        {
          type: "html",
          label: "▶ ホバーアニメーション",
          spec: {
            starter: `<style>
  .btn {
    display:inline-block; padding:12px 20px; border-radius:8px;
    background:#1565c0; color:#fff; cursor:pointer;
    transition: transform .15s ease, box-shadow .15s ease;
  }
  .btn:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(0,0,0,.25); }
  .title { font-size: clamp(20px, 5vw, 40px); }
</style>
<h1 class="title">伸縮する見出し（画面幅を変えてみて）</h1>
<span class="btn">ホバーしてね</span>`,
          },
        },
      ],
      quiz: [
        {
          q: "ホバー時などになめらかに変化させるCSSプロパティは？",
          choices: ["transition", "display", "z-index"],
          answer: 0,
          explain: "transition で変化を時間をかけて補間します。複雑な動きは @keyframes。",
        },
        {
          q: "「可変だが上限・下限を持つサイズ」を1行で書ける関数は？",
          choices: ["clamp()", "calc()のみ", "rgb()"],
          answer: 0,
          explain: "clamp(最小, 推奨, 最大) でレスポンシブかつ限度付きの値を表せます。",
        },
        {
          q: "親要素の幅に応じて部品のスタイルを切り替える新機能は？",
          choices: ["コンテナクエリ", "メディアクエリだけ", "インラインスタイル"],
          answer: 0,
          explain: "コンテナクエリは画面ではなく親要素の幅で切り替えられ、再利用部品に最適です。",
        },
      ],
    },
    {
      id: "fe-11",
      title: "【神】CSSアーキテクチャとデザインシステム",
      level: 4,
      duration: "16分",
      body: `
# 【神】CSSアーキテクチャとデザインシステム

大規模・長期のプロジェクトで、スタイルを破綻させないための設計論です。

## なぜ設計が要るか

CSSはグローバルに効くため、無秩序だと「触ると別の画面が壊れる」状態に。**影響範囲を制御**する仕組みが必要です。

## デザイントークン

色・余白・フォント・角丸などの「決め事」を変数として一元定義。デザインとコードの共通言語になります。

\`\`\`css
:root {
  --color-primary: #1565c0;
  --space-1: 4px; --space-2: 8px; --space-3: 16px;
  --radius-md: 8px;
  --font-base: 16px;
}
\`\`\`

## コンポーネント単位のスタイル

UIを部品に分け、部品ごとにスタイルを閉じ込めます。

- **BEM**: 命名規約で衝突を防ぐ
- **ユーティリティファースト**（Tailwind）: 小さなクラスを組み合わせる
- **CSS Modules / CSS-in-JS**: スコープを自動で局所化（React等）

いずれも目的は同じ＝「**影響範囲を局所化し、再利用と一貫性を確保する**」。

## デザインシステム

トークン＋再利用可能なコンポーネント（ボタン、入力、カード…）＋利用ガイドラインをまとめたもの。

- 画面ごとのバラつきを無くし、**一貫したUX**
- 新規画面を**速く・安全に**組める
- デザイナーと開発者の**共通言語**

:::tip
「1回作って終わり」ではなく「増え続ける」のがUI。最初にトークンと部品の規約を決めることが、将来の開発速度と品質を決めます。設計を制する者がフロントの神。
:::
`,
      quiz: [
        {
          q: "色・余白・フォントなどの決め事を変数として一元定義したものは？",
          choices: ["デザイントークン", "インデックス", "トランザクション"],
          answer: 0,
          explain: "デザイントークン。デザインとコードの共通言語として一貫性を支えます。",
        },
        {
          q: "CSSアーキテクチャ各手法（BEM/ユーティリティ/CSS Modules）に共通する目的は？",
          choices: ["影響範囲を局所化し再利用と一貫性を確保する", "ファイルを1つにする", "色を増やす"],
          answer: 0,
          explain: "いずれも影響範囲の制御と再利用・一貫性の確保が狙いです。",
        },
        {
          q: "デザインシステムの利点として正しいのは？",
          choices: ["一貫したUXと開発速度の向上", "テストが不要になる", "HTMLが不要になる"],
          answer: 0,
          explain: "再利用部品と規約で、速く・一貫して・安全に画面を作れます。",
        },
      ],
    },
    {
      id: "fe-12",
      title: "【神】ブラウザレンダリングとフロント性能",
      level: 4,
      duration: "16分",
      body: `
# 【神】ブラウザレンダリングとフロント性能

「なぜ表示が遅い・カクつくのか」を、ブラウザの仕組みから理解します。

## 表示までの流れ（クリティカルレンダリングパス）

\`\`\`
HTML → DOM構築
CSS  → CSSOM構築
        ↓ 合成
      レンダーツリー → レイアウト(配置計算) → ペイント(描画) → 合成
\`\`\`

- **CSSは描画をブロック**する（CSSOMが揃うまで描けない）→ CSSは早く・小さく
- **JSはパースをブロック**しがち → \`defer\` / \`async\` で読み込みを最適化

## リフローとリペイント

- **リフロー（レイアウト）**: 位置や大きさの再計算。重い
- **リペイント**: 色など見た目だけの再描画。比較的軽い
- アニメーションは \`transform\` / \`opacity\` を使うと**リフローを避けられ**滑らか

## 体感速度を上げる定石

- 画像最適化（適切なサイズ・フォーマット(WebP等)・\`loading="lazy"\`）
- 必要なコードだけ読む（コード分割・遅延読み込み）
- CSS/JSの圧縮、不要なものを削る
- 一覧は仮想スクロール／ページング（大量DOMを作らない）

## Core Web Vitals（体験の指標）

- **LCP**（主要コンテンツの表示速度）
- **CLS**（レイアウトのガタつき）
- **INP**（操作への反応性）

:::tip
フロントの性能も「推測するな、計測せよ」。ブラウザの開発者ツール(Performance/Lighthouse)で計測し、ボトルネックから直す。神レベルの姿勢はフロントでも同じです。
:::
`,
      quiz: [
        {
          q: "位置や大きさの再計算が走る、比較的重い処理は？",
          choices: ["リフロー（レイアウト）", "リペイントのみ", "キャッシュ"],
          answer: 0,
          explain: "リフローは配置の再計算で重い。色だけならリペイントで軽めです。",
        },
        {
          q: "アニメーションを滑らかにするため優先して使うCSSは？",
          choices: ["transform / opacity", "width / top を毎フレーム変更", "float"],
          answer: 0,
          explain: "transform/opacity はリフローを避けやすく、滑らかに動きます。",
        },
        {
          q: "フロント性能改善の正しい進め方は？",
          choices: ["計測してボトルネックから直す", "とにかく全部書き直す", "推測で当てずっぽうに直す"],
          answer: 0,
          explain: "開発者ツールやLighthouseで計測し、効く所から改善します。",
        },
      ],
    },
  ],
};
