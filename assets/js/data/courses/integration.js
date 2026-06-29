export default {
  id: "integration",
  tag: "integration",
  icon: "🧩",
  title: "総合演習 ― 3つを繋ぐ",
  short: "Java・JS・SQLを1つのシステムとして考える",
  description:
    "学んだ3つの言語を、1本のWebシステムとして繋ぎます。1機能を端から端まで設計し、開発の全体像を自分の言葉で説明できることがゴールです。",
  lessons: [
    {
      id: "int-1",
      title: "1つの機能を端から端まで追う",
      duration: "15分",
      body: `
# 1つの機能を端から端まで追う

「ユーザー一覧を表示する」というシンプルな機能を、フロントからDBまで通して見てみましょう。これが見えれば、あなたはもう全体像を掴んでいます。

## ① フロントエンド（JavaScript）

画面表示時にサーバーへデータを要求し、受け取ったJSONを画面に描画します。

\`\`\`javascript
async function loadUsers() {
  const res = await fetch("/api/users");      // ② へリクエスト
  const users = await res.json();             // JSONを受け取る
  const ul = document.querySelector("#list");
  users.forEach(u => {
    const li = document.createElement("li");
    li.textContent = u.name + "（" + u.city + "）";
    ul.appendChild(li);                        // 画面に追加
  });
}
loadUsers();
\`\`\`

## ② バックエンド（Java / Spring）

リクエストを受け、ServiceとRepositoryに処理を委ね、結果をJSONで返します。

\`\`\`java
@GetMapping("/api/users")
public List<User> getUsers() {
    return userService.findAll();  // → ③ を呼ぶ
}
\`\`\`

## ③ データベース（SQL）

Repositoryが実際に発行するクエリ。

\`\`\`sql
SELECT id, name, city FROM users ORDER BY id;
\`\`\`

## 流れの全体図

\`\`\`
画面表示
  → JS: fetch("/api/users")          [HTTP GET]
    → Java: Controller → Service
      → SQL: SELECT ... FROM users
    ← 結果(行) を User に詰める
  ← JSON で返す
← JS: 受け取って <li> を生成し表示
\`\`\`

:::tip
どんなに複雑なシステムも、この「1機能の縦の流れ」の積み重ねです。1本通せれば、あとは横に増やしていくだけ。
:::
`,
      exercises: [
        {
          type: "sql",
          label: "▶ ③のSQLを実行してみる",
          spec: { starter: "SELECT id, name, city FROM users ORDER BY id;" },
        },
        {
          type: "js",
          label: "▶ ①のJS処理を模擬する",
          spec: {
            starter: `// サーバーから返ってきたと仮定したJSON
const users = [
  { name: "佐藤 太郎", city: "東京" },
  { name: "鈴木 花子", city: "大阪" },
];
// 画面に出す代わりに整形して出力
users.forEach(u => console.log(u.name + "（" + u.city + "）"));`,
          },
        },
      ],
      quiz: [
        {
          q: "フロントがサーバーからデータを受け取る形式は一般的に？",
          choices: ["JSON", "Javaバイトコード", "画像"],
          answer: 0,
          explain: "API通信のデータはJSONが標準です。",
        },
        {
          q: "実際にデータベースから行を取り出しているのはどの言語／層？",
          choices: ["JavaScript（フロント）", "SQL（DB層）", "CSS"],
          answer: 1,
          explain: "データの取り出しはSQLが担います（Repository層で発行）。",
        },
      ],
    },
    {
      id: "int-2",
      title: "データ設計とセキュリティの基本",
      duration: "14分",
      body: `
# データ設計とセキュリティの基本

神への道は「動けばOK」では終わりません。**壊れにくく・安全な**作りを意識しましょう。

## データ設計（正規化）の考え方

同じ情報を複数の場所に重複して持たないようにします。

- ❌ orders テーブルに購入者名を直接コピーして持つ（名前変更時に全部直す羽目に）
- ✅ orders には user_id だけ持ち、名前は users から JOIN で引く

「1つの事実は1か所に」――これが正規化の心です。

## 主キーと外部キー

- **主キー(PK)**: 各行を一意に識別する列（例: users.id）
- **外部キー(FK)**: 他テーブルを参照する列（例: orders.user_id → users.id）

## セキュリティ最重要トピック

### SQLインジェクション

ユーザー入力をそのままSQLに連結すると、悪意ある入力でDBを乗っ取られます。

\`\`\`java
// ❌ 危険：文字列連結
String sql = "SELECT * FROM users WHERE name = '" + input + "'";

// ✅ 安全：プレースホルダ（バインド変数）
String sql = "SELECT * FROM users WHERE name = ?";
// input は別途バインドする
\`\`\`

### その他の基本

- **パスワードは必ずハッシュ化**して保存（平文厳禁）
- **入力値の検証**（型・長さ・範囲）をサーバー側でも行う
- **認証と認可**を分けて考える（誰か／何をして良いか）

:::warn
フロント側だけのチェックは突破されます。検証・認可は必ず**サーバー側でも**行うこと。
:::
`,
      quiz: [
        {
          q: "「1つの事実は1か所にだけ持つ」データ設計の考え方は？",
          choices: ["正規化", "圧縮", "難読化"],
          answer: 0,
          explain: "正規化です。重複を排し、更新時の不整合を防ぎます。",
        },
        {
          q: "ユーザー入力を文字列連結でSQLに埋め込むと起きうる攻撃は？",
          choices: ["SQLインジェクション", "圧縮エラー", "型変換"],
          answer: 0,
          explain: "プレースホルダ（バインド変数）を使うことで防げます。",
        },
        {
          q: "パスワードの保存方法として正しいのは？",
          choices: ["平文のまま保存", "ハッシュ化して保存", "URLに含める"],
          answer: 1,
          explain: "必ずハッシュ化（できればソルト付き）して保存します。平文保存は厳禁です。",
        },
      ],
    },
    {
      id: "int-3",
      title: "次の一歩 ― 神への道は続く",
      duration: "10分",
      body: `
# 次の一歩 ― 神への道は続く

ここまでで、Webシステムの全体像と Java・JavaScript・SQL の基礎、そして3つを繋ぐ感覚を手に入れました。おめでとうございます。ここからが本当のスタートです。

## 力を伸ばし続けるために

1. **小さくても完成させる**: ToDoアプリ、メモ帳、簡単な掲示板など。1本通すと一気に伸びる。
2. **Gitを使う**: コードの変更履歴を管理し、GitHubで公開する（この教材自身もそうです）。
3. **エラーと友達になる**: メッセージを読む→検索する→仮説を立てる、を習慣に。
4. **読む量を増やす**: 良いコードをたくさん読むことが、良いコードを書く近道。

## 次に学ぶとよいテーマ

- **フレームワーク**: フロントは React / Vue、バックは Spring Boot
- **テスト**: JUnit（Java）、Jest（JS）で自動テストを書く
- **インフラ**: Docker、クラウド（AWS など）、CI/CD
- **設計**: REST API設計、データベース設計、認証(OAuth/JWT)

## 学びのサイクル

\`\`\`
作る → 詰まる → 調べる → 理解する → また作る
\`\`\`

> 神とは、完璧な人ではなく「学び続けることをやめない人」のこと。
> あなたのランクが「システム開発の神」に届く日まで、このサイクルを回し続けましょう。

:::tip
この教材はオープンに作られています。物足りなくなったら、自分でレッスンを追加してみてください。「教えられるようになる」ことが、最強の学習法です。
:::

お疲れさまでした。さあ、何か1つ作りに行きましょう。⚡
`,
      quiz: [
        {
          q: "コードの変更履歴を管理し、公開・共同開発を支えるツールは？",
          choices: ["Git", "Excel", "Photoshop"],
          answer: 0,
          explain: "Git（とGitHubなどのホスティング）が標準です。",
        },
        {
          q: "本講座が勧める上達のサイクルとして適切なのは？",
          choices: ["読むだけを繰り返す", "作る→詰まる→調べる→理解する→また作る", "完璧になるまで何も作らない"],
          answer: 1,
          explain: "手を動かして詰まり、調べて理解する循環が最速の上達法です。",
        },
      ],
    },
  ],
};
