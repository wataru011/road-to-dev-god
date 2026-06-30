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
            starter: `// 変数 city に "東京" を代入し、テンプレートリテラルを使って
// 「私は◯◯に住んでいます」（◯◯は city の値）と出力してください。
// 例: city が "大阪" なら → 私は大阪に住んでいます
// ※ 文章を直接書かず、\${city} を埋め込んで組み立てましょう。
const city = "";
`,
            expected: "私は東京に住んでいます",
            requires: [
              { pattern: "\\bcity\\b", hint: "city という変数を作って使いましょう。" },
              { pattern: "\\$\\{\\s*city\\s*\\}", hint: "テンプレートリテラルの `${city}` で変数を埋め込みましょう。" },
            ],
            forbids: [
              { pattern: "私は東京に住んでいます", hint: "完成した文章をそのまま書かないでください。変数 city を使って組み立てましょう。" },
            ],
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
            starter: `// 数 n を受け取り、次のルールで値を返す関数 fizzbuzz(n) を作ってください。
//  ・3の倍数なら文字列 "Fizz"
//  ・5の倍数なら文字列 "Buzz"
//  ・3と5の両方の倍数なら "FizzBuzz"
//  ・それ以外は数値 n をそのまま返す
// （いろいろな n でテストされるので、決め打ちでは通りません）
function fizzbuzz(n) {
  // ここに書く
}`,
            tests: [
              { call: "fizzbuzz(1)", expect: 1 },
              { call: "fizzbuzz(3)", expect: "Fizz" },
              { call: "fizzbuzz(5)", expect: "Buzz" },
              { call: "fizzbuzz(15)", expect: "FizzBuzz" },
              { call: "fizzbuzz(7)", expect: 7 },
              { call: "fizzbuzz(30)", expect: "FizzBuzz" },
              { call: "fizzbuzz(9)", expect: "Fizz" },
            ],
            requires: [
              { pattern: "%", hint: "剰余演算子 % を使って倍数かどうかを判定しましょう。" },
            ],
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
            starter: `// 半径 r を受け取り、円の面積を返す関数 area(r) を作ってください。
// 円周率は 3.14 とします（面積 = 半径 × 半径 × 円周率）。
// 複数の半径でテストされます。
function area(r) {
  // ここに書く
}`,
            tests: [
              { call: "area(10)", expect: 314 },
              { call: "area(2)", expect: 12.56 },
              { call: "area(0)", expect: 0 },
            ],
            requires: [
              { pattern: "3\\.14", hint: "円周率 3.14 を使って計算しましょう。" },
              { pattern: "\\br\\b", hint: "引数 r を使って計算しましょう。" },
            ],
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
            starter: `// ユーザーの配列 list を受け取り、
// 30歳以上の人の名前だけを配列にして返す関数 adults(list) を作ってください。
// 例: adults([{name:"太郎",age:28},{name:"花子",age:34}]) → ["花子"]
function adults(list) {
  // ここに書く（filter で絞り込み、map で名前を取り出す）
}`,
            tests: [
              { call: 'adults([{name:"太郎",age:28},{name:"花子",age:34},{name:"健",age:22}])', expect: ["花子"] },
              { call: 'adults([{name:"翔",age:30},{name:"涼",age:19}])', expect: ["翔"] },
              { call: 'adults([{name:"美咲",age:41},{name:"健",age:50}])', expect: ["美咲", "健"] },
              { call: "adults([])", expect: [] },
            ],
            requires: [
              { pattern: "filter", hint: "filter で30歳以上の人を絞り込みましょう。" },
              { pattern: "map", hint: "map で名前(name)だけを取り出しましょう。" },
            ],
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
    {
      id: "js-7",
      title: "スコープとクロージャ",
      level: 3,
      duration: "16分",
      body: `
# スコープとクロージャ

中級までは「動けばOK」でしたが、上級では**なぜそう動くのか**を理解します。その鍵がスコープとクロージャです。

## スコープ（変数の有効範囲）

\`let\` / \`const\` は宣言したブロック \`{ }\` の中だけで有効です（ブロックスコープ）。

\`\`\`javascript
function f() {
  if (true) {
    const x = 1;
  }
  // console.log(x); // エラー：xはブロックの外では見えない
}
\`\`\`

## クロージャ（関数が変数を覚えている仕組み）

関数は「自分が定義された場所の変数」を覚え続けます。これをクロージャと呼びます。

\`\`\`javascript
function makeCounter() {
  let count = 0;            // この変数を…
  return () => ++count;     // 返した関数が覚えている
}
const next = makeCounter();
console.log(next()); // 1
console.log(next()); // 2
\`\`\`

\`count\` は外から触れないのに、\`next\` を呼ぶたびに増えます。これがクロージャによる「状態の隠蔽」です。

## なぜ重要か

- **カウンタやキャッシュ**など、状態を安全に持てる
- **モジュールパターン**：公開する関数だけ返し、内部変数を隠す
- React の \`useState\` など、現代フレームワークの土台

:::warn
ループ内で \`var\` を使うとクロージャが同じ変数を共有してバグります。\`let\` を使えば反復ごとに新しい束縛になり、正しく動きます。
:::
`,
      exercises: [
        {
          type: "js",
          label: "✏️ クロージャでカウンタを作る",
          spec: {
            starter: `// 呼ぶたびに前回より step ずつ増える関数を返す createAdder(step) を作ってください。
// 状態(現在値)はクロージャで保持し、外から直接触れないようにします。
// 例: const a = createAdder(10); a() → 10, a() → 20, a() → 30
function createAdder(step) {
  // ここに書く
}`,
            tests: [
              { call: "(function(){ const a = createAdder(10); return [a(), a(), a()]; })()", expect: [10, 20, 30] },
              { call: "(function(){ const b = createAdder(5); return [b(), b()]; })()", expect: [5, 10] },
              { call: "(function(){ const a = createAdder(1), b = createAdder(100); a(); return [a(), b()]; })()", expect: [2, 100] },
            ],
            requires: [
              { pattern: "return", hint: "createAdder は『関数』を return しましょう。" },
              { pattern: "step", hint: "引数 step を使って増分を決めましょう。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "関数が「定義された場所の変数を覚え続ける」仕組みを何と呼ぶ？",
          choices: ["クロージャ", "コールバック", "プロトタイプ"],
          answer: 0,
          explain: "クロージャです。返された関数が外側の変数を保持し続けます。",
        },
        {
          q: "let / const の変数が有効な範囲は？",
          choices: ["ファイル全体", "宣言したブロック { } の中", "関数の外側すべて"],
          answer: 1,
          explain: "let/const はブロックスコープを持ち、宣言した { } の中でのみ有効です。",
        },
      ],
    },
    {
      id: "js-8",
      title: "クラスとオブジェクト指向",
      level: 3,
      duration: "16分",
      body: `
# クラスとオブジェクト指向

JavaScriptでも \`class\` で「データ＋振る舞い」をまとめられます。Javaのクラスと考え方は共通です。

## クラスの基本

\`\`\`javascript
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    return \`\${this.name}（\${this.age}歳）\`;
  }
}
const u = new User("太郎", 28);
console.log(u.greet()); // 太郎（28歳）
\`\`\`

## 継承

\`\`\`javascript
class Admin extends User {
  constructor(name, age) {
    super(name, age);   // 親のコンストラクタを呼ぶ
    this.role = "管理者";
  }
  greet() {
    return super.greet() + " [" + this.role + "]";
  }
}
\`\`\`

## this の落とし穴

メソッドを変数に取り出すと \`this\` が外れます。アロー関数やバインドで束縛します。

\`\`\`javascript
const g = u.greet;
// g(); // this が undefined になりエラーになりがち
\`\`\`

:::tip
「継承より合成（composition）」が現代の指針。深い継承ツリーより、小さな部品を組み合わせる方が壊れにくいです。これは上級編後半・神レベルの設計原則にもつながります。
:::
`,
      exercises: [
        {
          type: "js",
          label: "✏️ クラスを設計する",
          spec: {
            starter: `// 残高を管理する BankAccount クラスを作ってください。
//  - constructor(initial) で初期残高を設定
//  - deposit(amount) で入金（残高を増やす）
//  - withdraw(amount) で出金。残高不足なら残高は変えず false を返す。成功なら true
//  - getBalance() で現在残高を返す
class BankAccount {
  // ここに書く
}`,
            tests: [
              { call: "(function(){ const a = new BankAccount(100); a.deposit(50); return a.getBalance(); })()", expect: 150 },
              { call: "(function(){ const a = new BankAccount(100); return a.withdraw(30); })()", expect: true },
              { call: "(function(){ const a = new BankAccount(100); a.withdraw(30); return a.getBalance(); })()", expect: 70 },
              { call: "(function(){ const a = new BankAccount(100); return a.withdraw(999); })()", expect: false },
              { call: "(function(){ const a = new BankAccount(100); a.withdraw(999); return a.getBalance(); })()", expect: 100 },
            ],
            requires: [
              { pattern: "class\\s+BankAccount", hint: "class BankAccount を定義しましょう。" },
              { pattern: "constructor", hint: "constructor で初期残高を設定しましょう。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "子クラスから親クラスのコンストラクタを呼ぶキーワードは？",
          choices: ["this", "super", "extends"],
          answer: 1,
          explain: "super(...) で親のコンストラクタを呼びます。extends は継承の宣言です。",
        },
        {
          q: "現代の設計で推奨される指針は？",
          choices: ["深い継承ツリーを作る", "継承より合成（小さな部品の組み合わせ）", "すべてをグローバル変数にする"],
          answer: 1,
          explain: "「継承より合成」。組み合わせの方が変更に強く壊れにくいです。",
        },
      ],
    },
    {
      id: "js-9",
      title: "JSON とデータのやり取り",
      level: 2,
      duration: "13分",
      body: `
# JSON とデータのやり取り

サーバーとのデータ交換は **JSON**（JavaScript Object Notation）が標準です。JSの世界とAPIの世界をつなぐ要です。

## 文字列 ⇄ オブジェクト

通信で受け取るのは「JSON文字列」。プログラムで扱うには「オブジェクト」に変換します。

\`\`\`javascript
const text = '{"name":"花子","age":34}';
const obj = JSON.parse(text);   // 文字列 → オブジェクト
console.log(obj.name);          // 花子

const back = JSON.stringify(obj); // オブジェクト → 文字列
\`\`\`

## ネストしたデータ

\`\`\`javascript
const data = {
  user: "太郎",
  orders: [
    { item: "PC", price: 120000 },
    { item: "マウス", price: 2500 },
  ],
};
console.log(data.orders[0].item); // PC
\`\`\`

## よくある加工

\`map\` / \`filter\` / \`reduce\` と組み合わせると、APIレスポンスを自在に扱えます。

:::warn
\`JSON.parse\` は不正な文字列で例外を投げます。通信データは \`try/catch\` で囲むのが安全です（次レッスン）。
:::
`,
      exercises: [
        {
          type: "js",
          label: "✏️ JSONを集計する",
          spec: {
            starter: `// 注文の配列を受け取り、price の合計を返す関数 totalPrice(orders) を作ってください。
// 例: totalPrice([{item:"A",price:100},{item:"B",price:250}]) → 350
function totalPrice(orders) {
  // ここに書く（reduce が便利）
}`,
            tests: [
              { call: 'totalPrice([{item:"A",price:100},{item:"B",price:250}])', expect: 350 },
              { call: 'totalPrice([{item:"X",price:1200}])', expect: 1200 },
              { call: "totalPrice([])", expect: 0 },
            ],
            requires: [
              { pattern: "price", hint: "各要素の price を合計しましょう。" },
              { pattern: "reduce|for|forEach", hint: "reduce か繰り返しで合計しましょう。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "JSON文字列をJavaScriptのオブジェクトに変換する関数は？",
          choices: ["JSON.stringify", "JSON.parse", "JSON.read"],
          answer: 1,
          explain: "JSON.parse が文字列→オブジェクト、JSON.stringify がオブジェクト→文字列です。",
        },
        {
          q: "オブジェクトをサーバーへ送るため文字列化する関数は？",
          choices: ["JSON.parse", "JSON.stringify", "toString"],
          answer: 1,
          explain: "JSON.stringify で送信用の文字列にします。",
        },
      ],
    },
    {
      id: "js-10",
      title: "モジュールと関数型プログラミング",
      level: 3,
      duration: "15分",
      body: `
# モジュールと関数型プログラミング

大規模な開発では、コードを**分割**し、**副作用を抑えて**保守性を高めます。

## モジュール（import / export）

機能をファイルごとに分け、必要なものだけ読み込みます（このサイト自身もこの仕組みで動いています）。

\`\`\`javascript
// math.js
export function add(a, b) { return a + b; }
export const PI = 3.14;

// main.js
import { add, PI } from "./math.js";
console.log(add(2, 3)); // 5
\`\`\`

## 高階関数（関数を受け取る/返す関数）

\`map\`/\`filter\` も高階関数。自分でも作れます。

\`\`\`javascript
const withLog = (fn) => (...args) => {
  console.log("呼び出し:", args);
  return fn(...args);
};
const add = (a, b) => a + b;
const loggedAdd = withLog(add);
\`\`\`

## 純粋関数と不変性

- **純粋関数**: 同じ入力なら必ず同じ出力。外部を変更しない（副作用なし）
- **不変性**: 元データを書き換えず、新しいデータを作る

\`\`\`javascript
// ❌ 元の配列を破壊
arr.push(4);
// ✅ 新しい配列を作る（不変）
const next = [...arr, 4];
\`\`\`

:::tip
純粋関数はテストしやすく、バグが起きにくい。神レベルの設計・テストの土台です。
:::
`,
      exercises: [
        {
          type: "js",
          label: "✏️ 不変に更新する",
          spec: {
            starter: `// 配列 arr と値 v を受け取り、元の配列を変更せず
// 末尾に v を加えた「新しい配列」を返す関数 append(arr, v) を作ってください。
function append(arr, v) {
  // ここに書く（スプレッド構文 [...arr, v] を使う）
}`,
            tests: [
              { call: "append([1,2], 3)", expect: [1, 2, 3] },
              { call: "(function(){ const a=[1,2]; append(a,9); return a; })()", expect: [1, 2] },
              { call: "append([], 5)", expect: [5] },
            ],
            requires: [
              { pattern: "\\.\\.\\.|\\.concat\\(", hint: "元の配列を壊さず、スプレッド構文 [...arr, v] か concat で新しい配列を作りましょう。" },
            ],
            forbids: [
              { pattern: "\\.push\\(", hint: "push は元の配列を破壊します。不変に（新しい配列を作って）解きましょう。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "別ファイルの関数を読み込むための構文は？",
          choices: ["require のみ", "import / export", "include"],
          answer: 1,
          explain: "ES Modules では import / export を使います。",
        },
        {
          q: "「同じ入力なら必ず同じ出力で、外部を変更しない」関数を何という？",
          choices: ["純粋関数", "コンストラクタ", "コールバック地獄"],
          answer: 0,
          explain: "純粋関数です。テストしやすくバグが起きにくいのが利点です。",
        },
      ],
    },
    {
      id: "js-13",
      title: "【神】設計パターンと堅牢なコード",
      level: 4,
      duration: "16分",
      body: `
# 【神】設計パターンと堅牢なコード

よくある問題には、先人が磨いた「型（パターン）」があります。車輪の再発明をやめ、意図が伝わるコードを書きます。

## 代表的なパターン

- **モジュールパターン**: クロージャで内部を隠し、公開APIだけ返す
- **ファクトリ**: オブジェクト生成のロジックを1か所に集約
- **オブザーバ**: 状態変化を購読者に通知（イベント、Reactの再描画の発想）
- **ストラテジ**: 処理を差し替え可能にする（関数を渡す）

\`\`\`javascript
// ストラテジ：並び替え方を外から注入
function sortBy(arr, strategy) {
  return [...arr].sort(strategy);
}
sortBy(users, (a, b) => a.age - b.age);
\`\`\`

## 堅牢さの技

- **早期リターン**でネストを浅く
- **ガード節**で不正値を先に弾く
- **エラーは握り潰さない**（適切に伝播 or ログ）
- **マジックナンバーを定数化**

\`\`\`javascript
function price(qty) {
  if (qty <= 0) throw new Error("数量が不正");  // ガード節
  const UNIT = 500;                               // 定数化
  return qty * UNIT;
}
\`\`\`

:::tip
パターンは目的ではなく道具。「なぜこの形か」を説明できることが神の条件。乱用は複雑化を招きます（YAGNI）。
:::
`,
      quiz: [
        {
          q: "状態変化を購読者に通知するパターンは？",
          choices: ["オブザーバ", "ファクトリ", "シングルトン"],
          answer: 0,
          explain: "オブザーバパターンです。イベントやReactの再描画の発想に通じます。",
        },
        {
          q: "不正な入力を関数の冒頭で弾く書き方を何という？",
          choices: ["ガード節（早期リターン）", "無限ループ", "グローバル変数"],
          answer: 0,
          explain: "ガード節で先に弾くと、本処理のネストが浅くなり読みやすくなります。",
        },
      ],
    },
    {
      id: "js-14",
      title: "【神】テストとデバッグの極意",
      level: 4,
      duration: "15分",
      body: `
# 【神】テストとデバッグの極意

神は「動いた」で満足しません。「正しいと証明できる」状態を作ります。

## 自動テスト（Jest のイメージ）

\`\`\`javascript
import { totalPrice } from "./cart.js";

test("合計金額を計算する", () => {
  expect(totalPrice([{price:100},{price:250}])).toBe(350);
});

test("空なら0", () => {
  expect(totalPrice([])).toBe(0);
});
\`\`\`

> このサイトの演習が「複数入力で関数を検証」していたのも同じ考え方。テスト＝仕様の実行可能なドキュメントです。

## テストの観点

- **正常系**: 普通の入力
- **異常系**: 不正・例外的な入力
- **境界値**: 0件、1件、最大値など端っこ

## デバッグの手順

1. **再現**させる（最小の手順を特定）
2. \`console.log\` / ブレークポイントで**状態を観察**
3. **仮説**を立て、1つずつ検証
4. 直したら**テストを追加**して再発を防ぐ

\`\`\`javascript
console.log("ここまでのusers:", users);   // 状態の可視化
console.table(users);                     // 配列/オブジェクトを表で
\`\`\`

:::warn
「たぶんここが原因」で当てずっぽうに直さない。**観察→仮説→検証**を回すのが最短です。
:::
`,
      quiz: [
        {
          q: "テストで必ず確認すべき「端っこの値」を何という？",
          choices: ["境界値", "平均値", "中央値"],
          answer: 0,
          explain: "0件・1件・最大値などの境界値はバグが出やすい重要ポイントです。",
        },
        {
          q: "バグ修正で最初にやるべきことは？",
          choices: ["とりあえずコードを変える", "確実に再現させる", "全部書き直す"],
          answer: 1,
          explain: "再現できないバグは直せません。最小の再現手順を特定するのが第一歩です。",
        },
        {
          q: "バグを直した後にすべきことは？",
          choices: ["再発防止のテストを追加する", "何もしない", "ログを全部消す"],
          answer: 0,
          explain: "テストを追加すれば同じバグの再発を自動で防げます。",
        },
      ],
    },
    {
      id: "js-15",
      title: "【神】TypeScript ― 型で守る盾",
      level: 4,
      duration: "16分",
      body: `
# 【神】TypeScript ― 型で守る盾

大規模なJavaScriptは型が無いゆえに壊れやすい。**TypeScript**は型を足し、実行前にバグを発見します。Javaで学んだ「静的型付け」の恩恵をJSの世界へ。

## 型注釈

\`\`\`typescript
function greet(name: string, age: number): string {
  return \`\${name}さん(\${age}歳)\`;
}
greet("太郎", 28);
// greet("太郎", "28"); // ❌ コンパイルエラー：number に string は渡せない
\`\`\`

## 型エイリアス / インターフェース

データの形を定義します。

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email?: string;   // ? は任意
}

const u: User = { id: 1, name: "花子" };
\`\`\`

## ジェネリクス（Javaと同じ発想）

\`\`\`typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
\`\`\`

## なぜ神レベルで効くか

- 大人数開発で**仕様が型として共有**される
- リファクタリング時、壊れた箇所をコンパイラが教えてくれる
- エディタ補完が強力になり生産性が上がる

:::tip
JS → TS への移行は「少しずつ型を足す」ことが可能。完璧主義より一歩ずつ。型は未来の自分とチームへの思いやりです。
:::
`,
      quiz: [
        {
          q: "TypeScriptがJavaScriptに加える最大の価値は？",
          choices: ["実行速度が10倍になる", "静的な型チェックで実行前にバグを発見できる", "ファイルが軽くなる"],
          answer: 1,
          explain: "型注釈により、型の不一致などをコンパイル時に検出できます。",
        },
        {
          q: "データの形（プロパティと型）を定義するのに使うのは？",
          choices: ["interface / type", "for ループ", "console.log"],
          answer: 0,
          explain: "interface や type でオブジェクトの形を定義します。",
        },
      ],
    },
    {
      id: "js-16",
      title: "エラーハンドリングの基礎 ― 失敗にどう備えるか",
      level: 2,
      duration: "14分",
      body: `
# エラーハンドリングの基礎 ― 失敗にどう備えるか

プログラムでは**失敗が必ず起きます**。通信が切れる、入力が不正、ファイルが無い…。良いプログラムは「失敗しない」のではなく「**失敗にうまく備えている**」ものです。

## try / catch / finally

エラーが起きうる処理を \`try\` で囲み、起きたら \`catch\` で受け止めます。

\`\`\`javascript
try {
  const data = JSON.parse(input);   // 不正な文字列だと例外が飛ぶ
  console.log(data.name);
} catch (e) {
  console.log("解析に失敗:", e.message);  // 安全に処理を続けられる
} finally {
  console.log("成功・失敗にかかわらず実行される後始末");
}
\`\`\`

## エラーを投げる(throw)

おかしな状況では、自分で \`throw\` してエラーを知らせます。

\`\`\`javascript
function withdraw(balance, amount) {
  if (amount > balance) {
    throw new Error("残高不足です");
  }
  return balance - amount;
}
\`\`\`

## 非同期(async/await)でのエラー

\`await\` する処理も \`try/catch\` で囲めます。

\`\`\`javascript
async function load() {
  try {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("取得失敗: " + res.status);
    return await res.json();
  } catch (e) {
    console.error(e.message);
    return [];   // 失敗時の安全な既定値を返す
  }
}
\`\`\`

## やってはいけないこと

\`\`\`javascript
try { risky(); } catch (e) {}   // ❌ 握りつぶし(エラーを無視)
\`\`\`

エラーを黙って捨てると、バグの発見が絶望的に難しくなります。**最低でもログを出す**、あるいは適切に上位へ伝えること。

:::tip
「失敗しうる箇所」を意識し、ユーザーには分かりやすいメッセージを、開発者にはログを。入力の検証(サーバー側)と合わせて、堅牢なシステムの土台になります。
:::
`,
      exercises: [
        {
          type: "js",
          label: "✏️ 安全にJSONを解析する",
          spec: {
            starter: `// 文字列を受け取り、JSONとして解析して返す関数 safeParse(text) を作ってください。
// 正しいJSONならオブジェクト/値を返し、不正な文字列なら例外で落ちずに null を返すこと。
// ヒント: JSON.parse は不正な文字列で例外を投げるので try/catch で囲む
function safeParse(text) {
  // ここに書く
}`,
            tests: [
              { call: 'safeParse(\'{"a":1}\')', expect: { a: 1 } },
              { call: 'safeParse("[1,2,3]")', expect: [1, 2, 3] },
              { call: 'safeParse("これはJSONではない")', expect: null },
              { call: 'safeParse("{壊れた")', expect: null },
            ],
            requires: [
              { pattern: "try", hint: "try/catch で例外を受け止めましょう。" },
              { pattern: "catch", hint: "catch で失敗時に null を返しましょう。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "エラーが起きうる処理を囲み、起きたら受け止める構文は？",
          choices: ["try / catch", "if / else", "for / of"],
          answer: 0,
          explain: "try で囲み catch で受け止めます。finally は成否に関わらず実行されます。",
        },
        {
          q: "自分でエラーを発生させて知らせるキーワードは？",
          choices: ["throw", "return", "await"],
          answer: 0,
          explain: "throw new Error(...) で例外を投げます。",
        },
        {
          q: "`try { ... } catch (e) {}` のようにエラーを握りつぶすのが良くない理由は？",
          choices: ["バグの発見が困難になるから", "実行が速くなりすぎるから", "コードが長くなるから"],
          answer: 0,
          explain: "黙って無視すると原因究明が極めて困難に。最低限ログを出すか上位へ伝えます。",
        },
      ],
    },
    {
      id: "js-17",
      title: "正規表現の基礎",
      level: 3,
      duration: "15分",
      body: `
# 正規表現の基礎

**正規表現(regex)**は「文字列のパターン」を表す小さな言語です。検索・抽出・置換・入力チェックに使えます。最初は記号が呪文に見えますが、基本パターンは少しだけです。

## 基本パターン

- \`\\d\` 数字 / \`\\w\` 英数字とアンダースコア / \`\\s\` 空白
- \`.\` 任意の1文字
- \`+\` 1回以上 / \`*\` 0回以上 / \`?\` 0か1回
- \`[abc]\` いずれか1文字 / \`[0-9]\` 範囲
- \`^\` 先頭 / \`$\` 末尾
- \`( )\` グループ化 / \`|\` または

## JavaScriptでの使い方

\`\`\`javascript
const re = /\\d+/;            // 1つ以上の数字
re.test("abc123");           // true（含まれるか）
"abc123".match(/\\d+/)[0];    // "123"（最初の一致を取り出す）
"a1b2c3".replace(/\\d/g, "#"); // "a#b#c#"（g=すべて置換）
\`\`\`

- \`test()\` … マッチするか(true/false)
- \`match()\` … 一致部分を取り出す
- \`replace()\` … 置換する
- 末尾フラグ: \`g\`(全体) \`i\`(大小無視)

## 例: 簡単な書式チェック

\`\`\`javascript
const isZip = /^\\d{3}-\\d{4}$/.test("123-4567"); // 郵便番号(true)
\`\`\`

\`{3}\` は「ちょうど3回」を表します。

:::warn
正規表現は強力ですが、複雑にしすぎると読めず・直せずで自分が苦しみます(『問題が2つになる』)。メールアドレスの完全な検証などは正規表現だけで頑張らないこと。**シンプルに保つ**のが鉄則です。
:::
`,
      exercises: [
        {
          type: "js",
          label: "✏️ 数字だけかどうか判定する",
          spec: {
            starter: `// 文字列が「1文字以上で、すべて数字」のとき true を返す関数 isAllDigits(s) を
// 正規表現を使って作ってください。空文字は false。
// 例: isAllDigits("12345") → true, isAllDigits("12a") → false, isAllDigits("") → false
function isAllDigits(s) {
  // ここに書く（^ と $ と \\d と + を使う）
}`,
            tests: [
              { call: 'isAllDigits("12345")', expect: true },
              { call: 'isAllDigits("12a")', expect: false },
              { call: 'isAllDigits("")', expect: false },
              { call: 'isAllDigits("007")', expect: true },
            ],
            requires: [
              { pattern: "test\\(|match\\(|\\.exec\\(", hint: "正規表現の test() などで判定しましょう。" },
              { pattern: "\\\\d|\\[0-9\\]", hint: "数字は \\d または [0-9] で表します。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "正規表現で「1つ以上の数字」を表すのは？",
          choices: ["\\d+", "\\w*", "."],
          answer: 0,
          explain: "\\d が数字、+ が1回以上。合わせて \\d+ です。",
        },
        {
          q: "文字列がパターンにマッチするか(true/false)を確認するメソッドは？",
          choices: ["test()", "push()", "map()"],
          answer: 0,
          explain: "正規表現の test() が真偽を返します。match() は一致部分を取り出します。",
        },
        {
          q: "正規表現を使うときの心得として正しいのは？",
          choices: ["複雑にしすぎず、シンプルに保つ", "できるだけ長く書く", "すべての検証を正規表現だけで行う"],
          answer: 0,
          explain: "複雑な正規表現は保守困難。シンプルに保ち、難しい検証は他の手段と併用します。",
        },
      ],
    },
  ],
};
