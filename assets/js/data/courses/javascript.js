export default {
  id: "javascript",
  tag: "javascript",
  icon: "✨",
  title: "JavaScript",
  short: "ブラウザを動かすフロントエンドの必修言語",
  description:
    "ブラウザ上で実際にコードを実行しながら、変数・関数・配列・オブジェクト・非同期処理まで学びます。すぐ動く手応えで一気に上達しましょう。",
  lessons: [
    {
      id: "js-1",
      title: "変数とデータ型",
      duration: "12分",
      body: `
# 変数とデータ型

JavaScriptでは値に名前をつけて保存します。これが**変数**です。

## let と const

- \`const\` … 再代入しない値（基本はこちらを使う）
- \`let\` … あとで変わる値
- \`var\` … 昔の書き方。今は使わない

\`\`\`javascript
const name = "太郎";   // 変えない
let age = 28;          // 変わるかもしれない
age = 29;              // OK
\`\`\`

## 主なデータ型

- **文字列** string: \`"こんにちは"\`
- **数値** number: \`42\`, \`3.14\`
- **真偽値** boolean: \`true\` / \`false\`
- **配列** array: \`[1, 2, 3]\`
- **オブジェクト** object: \`{ name: "太郎", age: 28 }\`
- **null / undefined**: 値が無いことを表す

## 文字列の組み立て（テンプレートリテラル）

バッククォート \` \`\` \` を使うと \`\${ }\` で値を埋め込めます。

右のエディタを実行してみましょう。
`,
      exercises: [
        {
          type: "js",
          label: "▶ まずは動かしてみる",
          spec: {
            starter: `const name = "太郎";
const age = 28;
console.log(\`\${name}さんは\${age}歳です\`);`,
          },
        },
        {
          type: "js",
          label: "✏️ 練習問題",
          spec: {
            starter: `// city という定数に "東京" を入れて、
// "私は東京に住んでいます" と出力してください
const city = "";
console.log();`,
            expected: "私は東京に住んでいます",
          },
        },
      ],
      quiz: [
        {
          q: "再代入しない値を宣言するのに推奨されるキーワードは？",
          choices: ["var", "let", "const"],
          answer: 2,
          explain: "まずconstを使い、再代入が必要なときだけletにするのが現代の基本です。",
        },
        {
          q: "`[1, 2, 3]` のデータ型は？",
          choices: ["配列(array)", "オブジェクト(object)", "文字列(string)"],
          answer: 0,
          explain: "角カッコで囲んだ順序付きの集まりは配列です。",
        },
      ],
    },
    {
      id: "js-2",
      title: "条件分岐と繰り返し",
      duration: "13分",
      body: `
# 条件分岐と繰り返し

プログラムは「状況によって処理を変える」「同じ処理を繰り返す」ことで力を発揮します。

## if / else

\`\`\`javascript
const score = 75;
if (score >= 80) {
  console.log("合格(優)");
} else if (score >= 60) {
  console.log("合格");
} else {
  console.log("不合格");
}
\`\`\`

## 比較演算子

- \`===\` 厳密に等しい（**こちらを使う**）
- \`!==\` 等しくない
- \`>\` \`<\` \`>=\` \`<=\`

:::warn
\`==\` は型を勝手に変換して比較するため予期せぬバグの原因に。必ず \`===\` を使いましょう。
:::

## for と while

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
\`\`\`

配列には \`for...of\` が便利です。

\`\`\`javascript
for (const fruit of ["りんご", "みかん"]) {
  console.log(fruit);
}
\`\`\`
`,
      exercises: [
        {
          type: "js",
          label: "✏️ FizzBuzz に挑戦",
          spec: {
            starter: `// 1から15まで出力。ただし
// 3の倍数は "Fizz"、5の倍数は "Buzz"、両方なら "FizzBuzz"
for (let i = 1; i <= 15; i++) {
  // ここに書く
}`,
            expected: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
          },
        },
      ],
      quiz: [
        {
          q: "JavaScriptで値を比較する際に推奨される演算子は？",
          choices: ["=", "==", "==="],
          answer: 2,
          explain: "=== は型も含めて厳密に比較するため安全です。= は代入、== は型変換が起きます。",
        },
        {
          q: "配列の各要素を順に取り出すループとして適切なのは？",
          choices: ["for...of", "if...else", "switch"],
          answer: 0,
          explain: "for...of は配列の要素を1つずつ取り出すのに最適です。",
        },
      ],
    },
    {
      id: "js-3",
      title: "関数",
      duration: "13分",
      body: `
# 関数

**関数**は「入力を受け取り、処理して、結果を返す」部品です。同じ処理を何度も書かずに済みます。

## 基本の書き方

\`\`\`javascript
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
\`\`\`

## アロー関数

現代のJSでは短く書けるアロー関数がよく使われます。

\`\`\`javascript
const add = (a, b) => a + b;
const greet = (name) => \`こんにちは、\${name}さん\`;
\`\`\`

## なぜ関数に分けるのか

- **再利用**: 一度書けば何度でも呼べる
- **見通し**: 名前で何をするか分かる
- **テスト**: 部品ごとに正しさを確認できる

> 「神コード」とは長い1本のコードではなく、小さく名付けられた関数の集まりです。
`,
      exercises: [
        {
          type: "js",
          label: "✏️ 関数を作る",
          spec: {
            starter: `// 円の面積を返す関数 area(r) を作る（円周率は3.14）
// area(10) を出力してください（期待値: 314）
function area(r) {
  // ここに書く
}
console.log(area(10));`,
            expected: "314",
          },
        },
      ],
      quiz: [
        {
          q: "関数が処理結果を呼び出し元に返すためのキーワードは？",
          choices: ["print", "return", "console.log"],
          answer: 1,
          explain: "return で値を返します。console.log は画面に表示するだけで値は返しません。",
        },
        {
          q: "`(x) => x * 2` は何を表す？",
          choices: ["アロー関数", "配列", "オブジェクト"],
          answer: 0,
          explain: "=> を使った短い関数の書き方（アロー関数）です。",
        },
      ],
    },
    {
      id: "js-4",
      title: "配列とオブジェクト",
      duration: "15分",
      body: `
# 配列とオブジェクト

データの集まりを扱うのが配列とオブジェクトです。実務のデータはほぼこの組み合わせです。

## 配列の便利メソッド

\`\`\`javascript
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);      // [2,4,6,8,10]
const evens = nums.filter(n => n % 2 === 0); // [2,4]
const sum = nums.reduce((a, b) => a + b, 0); // 15
\`\`\`

- \`map\` … 各要素を変換した新しい配列
- \`filter\` … 条件に合う要素だけ残す
- \`reduce\` … 全体を1つの値にまとめる
- \`forEach\` … 各要素に対して処理する

## オブジェクト

\`\`\`javascript
const user = { name: "花子", age: 34, city: "大阪" };
console.log(user.name);     // 花子
console.log(user["age"]);   // 34
\`\`\`

## 組み合わせ（実務のデータ）

\`\`\`javascript
const users = [
  { name: "太郎", age: 28 },
  { name: "花子", age: 34 },
];
const names = users.map(u => u.name); // ["太郎","花子"]
\`\`\`

:::tip
\`map\` / \`filter\` を使いこなせると、サーバーから受け取ったJSON配列を自在に加工できます。フロント開発の核心です。
:::
`,
      exercises: [
        {
          type: "js",
          label: "✏️ map と filter",
          spec: {
            starter: `const users = [
  { name: "太郎", age: 28 },
  { name: "花子", age: 34 },
  { name: "健", age: 22 },
];
// 30歳以上のユーザーの名前だけを配列で出力してください
// 期待値: ["花子"]
const result = users; // ←ここを書き換える
console.log(result);`,
            expected: '["花子"]',
          },
        },
      ],
      quiz: [
        {
          q: "配列の各要素を変換して新しい配列を作るメソッドは？",
          choices: ["map", "filter", "push"],
          answer: 0,
          explain: "map は各要素を変換した新しい配列を返します。filter は絞り込み、push は末尾追加です。",
        },
        {
          q: "オブジェクト `user` の name を取り出す書き方として正しいのは？",
          choices: ["user->name", "user.name", "user(name)"],
          answer: 1,
          explain: "ドット記法 user.name か、user['name'] でアクセスします。",
        },
      ],
    },
    {
      id: "js-5",
      title: "DOM操作 ― 画面を動かす",
      duration: "14分",
      body: `
# DOM操作 ― 画面を動かす

ブラウザはHTMLを **DOM**（Document Object Model）というツリー構造で持っています。JavaScriptでこのDOMを書き換えることで、画面が動的に変わります。

## 要素を取得する

\`\`\`javascript
const btn = document.querySelector("#myButton");
const items = document.querySelectorAll(".item");
\`\`\`

## 中身を変える

\`\`\`javascript
const el = document.querySelector("#title");
el.textContent = "新しいタイトル";
el.style.color = "red";
\`\`\`

## イベントに反応する

ユーザーの操作（クリックなど）に処理を結びつけます。

\`\`\`javascript
button.addEventListener("click", () => {
  console.log("クリックされた！");
});
\`\`\`

:::note
このページ自身も、ここまで学んだDOM操作とイベントで作られています。「ボタンを押す→JSが反応→画面が変わる」がフロントエンドの基本動作です。
:::

このレッスンのコードはサンドボックス内で動くため実際のページは変わりませんが、考え方を \`console.log\` で確認してみましょう。
`,
      exercises: [
        {
          type: "js",
          label: "▶ イベントの考え方",
          spec: {
            starter: `// クリックを模した関数
function onClick(handler) { handler(); }

let count = 0;
onClick(() => {
  count++;
  console.log("ボタンが押された回数: " + count);
});
onClick(() => {
  count++;
  console.log("ボタンが押された回数: " + count);
});`,
          },
        },
      ],
      quiz: [
        {
          q: "ブラウザがHTMLを表現するツリー構造の名前は？",
          choices: ["JSON", "DOM", "HTTP"],
          answer: 1,
          explain: "DOM (Document Object Model) です。JavaScriptはこれを操作して画面を変えます。",
        },
        {
          q: "クリックなどの操作に処理を結びつけるメソッドは？",
          choices: ["addEventListener", "querySelector", "map"],
          answer: 0,
          explain: "addEventListener でイベントとハンドラ関数を結びつけます。",
        },
      ],
    },
    {
      id: "js-6",
      title: "非同期処理とAPI通信",
      duration: "16分",
      body: `
# 非同期処理とAPI通信

サーバーへの通信は「時間がかかる処理」です。結果を待つ間も画面を固まらせないために **非同期処理** を使います。

## Promise と async / await

\`\`\`javascript
async function getUser() {
  const res = await fetch("/api/users/1");
  const user = await res.json();
  console.log(user.name);
}
\`\`\`

- \`fetch\` … サーバーへHTTPリクエストを送る
- \`await\` … 結果が返るまで待つ（その間ブラウザは他の処理ができる）
- \`async\` … await を使う関数につける印

## エラーハンドリング

通信は失敗することがあります。\`try / catch\` で備えます。

\`\`\`javascript
async function getUser() {
  try {
    const res = await fetch("/api/users/1");
    if (!res.ok) throw new Error("取得に失敗: " + res.status);
    const user = await res.json();
    console.log(user.name);
  } catch (e) {
    console.error(e.message);
  }
}
\`\`\`

:::tip
基礎編で学んだHTTP（GET/POST、ステータスコード、JSON）が、ここで JavaScript のコードとして繋がります。これがフロントとバックの接続点です。
:::

下の例では Promise を使って「1秒後に結果が返る」通信を模擬しています。
`,
      exercises: [
        {
          type: "js",
          label: "▶ 非同期を体感する",
          spec: {
            starter: `// fetch を模した、0.5秒後にデータを返す関数
function fakeFetch() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: "花子", city: "大阪" }), 500);
  });
}

async function main() {
  console.log("通信開始…");
  const user = await fakeFetch();
  console.log("受信: " + user.name + " (" + user.city + ")");
}
main();`,
          },
        },
      ],
      quiz: [
        {
          q: "非同期処理の結果が返るまで待つために async関数内で使うキーワードは？",
          choices: ["await", "return", "for"],
          answer: 0,
          explain: "await は Promise の結果が返るまで待ちます。async 関数の中で使います。",
        },
        {
          q: "サーバーへHTTPリクエストを送るブラウザ標準の関数は？",
          choices: ["fetch", "console.log", "querySelector"],
          answer: 0,
          explain: "fetch がHTTP通信を行う標準APIです。",
        },
        {
          q: "通信の失敗に備えてエラーを捕まえる構文は？",
          choices: ["if / else", "try / catch", "for / of"],
          answer: 1,
          explain: "try/catch で例外（エラー）を捕捉して安全に処理します。",
        },
      ],
    },
  ],
};
