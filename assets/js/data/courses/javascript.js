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
            starter: `// city という変数に "東京" を代入し、
// テンプレートリテラルを使って "私は東京に住んでいます" と出力してください。
// （答えの文を直接書くのではなく、変数 city を埋め込んで組み立てましょう）
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
  ],
};
