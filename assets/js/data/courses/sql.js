export default {
  id: "sql",
  tag: "sql",
  icon: "🗄️",
  title: "SQL",
  short: "データベースを自在に操る問い合わせ言語",
  description:
    "ブラウザ内のSQLiteで本物のクエリを実行しながら学びます。サンプルDB（users / products / orders）を相手に、検索・集計・結合を手で覚えましょう。",
  lessons: [
    {
      id: "sql-1",
      title: "SELECT ― データを取り出す",
      duration: "12分",
      body: `
# SELECT ― データを取り出す

データベースは「表（テーブル）」の集まりです。データを読み出す基本が \`SELECT\` です。

このコースでは下記3つのサンプルテーブルを使います（エディタの「テーブル定義を表示」でも確認できます）。

- **users**: id, name, email, age, city
- **products**: id, name, price, category, stock
- **orders**: id, user_id, product_id, quantity, ordered_at

## 全件取得

\`\`\`sql
SELECT * FROM users;
\`\`\`

\`*\` は「すべての列」を意味します。

## 列を選ぶ

\`\`\`sql
SELECT name, city FROM users;
\`\`\`

実際にエディタで実行してみましょう。
`,
      exercises: [
        {
          type: "sql",
          label: "▶ 全件見てみる",
          spec: { starter: "SELECT * FROM products;" },
        },
        {
          type: "sql",
          label: "✏️ 練習: 名前と価格だけ",
          spec: {
            starter: "-- products テーブルから name と price の列だけ取得してください\n",
            expected: "SELECT name, price FROM products;",
            requires: [
              { pattern: "\\bname\\b", hint: "name 列を選択しましょう。" },
              { pattern: "\\bprice\\b", hint: "price 列を選択しましょう。" },
            ],
            forbids: [
              { pattern: "\\*", hint: "SELECT * ではなく、必要な列(name, price)だけを指定しましょう。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "テーブルからデータを取り出すSQL命令は？",
          choices: ["GET", "SELECT", "FETCH"],
          answer: 1,
          explain: "SQLでデータを取得するのはSELECTです。",
        },
        {
          q: "`SELECT *` の `*` の意味は？",
          choices: ["先頭1件", "すべての列", "件数"],
          answer: 1,
          explain: "* はすべての列を表します。",
        },
      ],
    },
    {
      id: "sql-2",
      title: "WHERE ― 条件で絞り込む",
      duration: "13分",
      body: `
# WHERE ― 条件で絞り込む

必要な行だけを取り出すのが \`WHERE\` です。

\`\`\`sql
SELECT * FROM users WHERE city = '東京';
SELECT * FROM products WHERE price >= 10000;
\`\`\`

## 条件の組み合わせ

- \`AND\` … 両方を満たす
- \`OR\` … どちらかを満たす
- \`BETWEEN a AND b\` … 範囲
- \`IN (..)\` … いずれかに一致
- \`LIKE '%語%'\` … 部分一致（\`%\` は任意の文字列）

\`\`\`sql
SELECT * FROM users WHERE age BETWEEN 25 AND 35;
SELECT * FROM products WHERE category IN ('家具', '食品');
SELECT * FROM users WHERE name LIKE '佐%';
\`\`\`

## 並び替えと件数制限

\`\`\`sql
SELECT * FROM products ORDER BY price DESC LIMIT 3;
\`\`\`

- \`ORDER BY 列 ASC|DESC\` … 昇順／降順
- \`LIMIT n\` … 先頭n件
`,
      exercises: [
        {
          type: "sql",
          label: "▶ 例を動かす",
          spec: { starter: "SELECT * FROM products WHERE category = '電子機器' ORDER BY price DESC;" },
        },
        {
          type: "sql",
          label: "✏️ 練習: 東京在住で30歳未満",
          spec: {
            starter: "-- users から city が '東京' かつ age が 30未満 の行を取得\n",
            expected: "SELECT * FROM users WHERE city = '東京' AND age < 30;",
            requires: [
              { pattern: "where", hint: "WHERE 句で条件を指定しましょう。" },
              { pattern: "and", hint: "AND で2つの条件をつなげましょう。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "行を条件で絞り込む句は？",
          choices: ["WHERE", "ORDER BY", "GROUP BY"],
          answer: 0,
          explain: "WHERE で条件に合う行だけを抽出します。",
        },
        {
          q: "価格が高い順に並べたいとき正しいのは？",
          choices: ["ORDER BY price ASC", "ORDER BY price DESC", "SORT price"],
          answer: 1,
          explain: "DESC が降順（大きい順）です。ASC は昇順。",
        },
      ],
    },
    {
      id: "sql-3",
      title: "集計関数と GROUP BY",
      duration: "15分",
      body: `
# 集計関数と GROUP BY

データを「数える・合計する・平均する」のが集計です。

## 集計関数

- \`COUNT(*)\` … 件数
- \`SUM(列)\` … 合計
- \`AVG(列)\` … 平均
- \`MAX / MIN\` … 最大・最小

\`\`\`sql
SELECT COUNT(*) FROM users;
SELECT AVG(price) FROM products;
\`\`\`

## GROUP BY ― グループごとに集計

「都市ごとの人数」「カテゴリごとの平均価格」のように、グループ単位で集計します。

\`\`\`sql
SELECT city, COUNT(*) AS 人数
FROM users
GROUP BY city;
\`\`\`

## HAVING ― 集計結果で絞り込む

\`WHERE\` は集計前、\`HAVING\` は集計後の絞り込みです。

\`\`\`sql
SELECT category, COUNT(*) AS 件数
FROM products
GROUP BY category
HAVING COUNT(*) >= 2;
\`\`\`

:::tip
\`AS\` で列に別名をつけると結果が読みやすくなります。
:::
`,
      exercises: [
        {
          type: "sql",
          label: "▶ 都市ごとの人数",
          spec: { starter: "SELECT city, COUNT(*) AS 人数 FROM users GROUP BY city;" },
        },
        {
          type: "sql",
          label: "✏️ 練習: カテゴリごとの平均価格",
          spec: {
            starter: "-- products をカテゴリ(category)ごとに、平均価格 AVG(price) を求めてください\n-- 列は category, AVG(price)\n",
            expected: "SELECT category, AVG(price) FROM products GROUP BY category;",
            requires: [
              { pattern: "group\\s+by", hint: "GROUP BY でカテゴリごとにグループ化しましょう。" },
              { pattern: "avg", hint: "AVG() で平均を計算しましょう。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "行数を数える集計関数は？",
          choices: ["SUM", "COUNT", "AVG"],
          answer: 1,
          explain: "COUNT が件数を数えます。SUMは合計、AVGは平均。",
        },
        {
          q: "GROUP BY による集計結果に対して条件を付ける句は？",
          choices: ["WHERE", "HAVING", "LIMIT"],
          answer: 1,
          explain: "集計後の絞り込みはHAVINGを使います。WHEREは集計前です。",
        },
      ],
    },
    {
      id: "sql-4",
      title: "JOIN ― テーブルを結合する",
      duration: "16分",
      body: `
# JOIN ― テーブルを結合する

データは複数のテーブルに分かれて保存されます。それらを繋ぐのが \`JOIN\` です。

例えば \`orders\` には \`user_id\` と \`product_id\` しかありません。「誰が何を買ったか」を名前で見るには users / products と結合します。

## INNER JOIN

両方のテーブルで一致する行だけを結合します。

\`\`\`sql
SELECT users.name, products.name, orders.quantity
FROM orders
JOIN users ON orders.user_id = users.id
JOIN products ON orders.product_id = products.id;
\`\`\`

## 別名(エイリアス)で短く

\`\`\`sql
SELECT u.name AS 購入者, p.name AS 商品, o.quantity AS 数量
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN products p ON o.product_id = p.id;
\`\`\`

## LEFT JOIN

左側のテーブルの行をすべて残し、相手が無ければ NULL になります。「一度も注文していないユーザー」を探すときなどに使います。

:::note
\`ON\` には「どの列同士が対応するか」を書きます。これがリレーショナルデータベースの心臓部です。
:::
`,
      exercises: [
        {
          type: "sql",
          label: "▶ 注文を名前付きで見る",
          spec: {
            starter: `SELECT u.name AS 購入者, p.name AS 商品, o.quantity AS 数量
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN products p ON o.product_id = p.id;`,
          },
        },
        {
          type: "sql",
          label: "✏️ 練習: 各注文の購入者名と商品名",
          spec: {
            starter: `-- orders と users を結合し、ユーザー名(users.name)と商品ID(orders.product_id)を表示
-- 列は users.name, orders.product_id の順
`,
            expected: "SELECT users.name, orders.product_id FROM orders JOIN users ON orders.user_id = users.id;",
            requires: [
              { pattern: "join", hint: "JOIN で orders と users を結合しましょう。" },
              { pattern: "\\bon\\b", hint: "ON で結合条件（user_id = users.id）を指定しましょう。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "複数テーブルを関連する列で繋げる操作は？",
          choices: ["UNION", "JOIN", "GROUP BY"],
          answer: 1,
          explain: "JOIN で関連するテーブルを結合します。",
        },
        {
          q: "両テーブルで一致する行だけを返す結合は？",
          choices: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN"],
          answer: 0,
          explain: "INNER JOIN は両方に一致がある行だけを返します。",
        },
      ],
    },
    {
      id: "sql-5",
      title: "INSERT / UPDATE / DELETE",
      duration: "13分",
      body: `
# INSERT / UPDATE / DELETE ― データを変更する

読み出すだけでなく、データを「追加・更新・削除」できてこそ実用です。

## 追加 INSERT

\`\`\`sql
INSERT INTO users (id, name, email, age, city)
VALUES (6, '山田 涼', 'ryo@example.com', 26, '名古屋');
\`\`\`

## 更新 UPDATE

\`\`\`sql
UPDATE users SET city = '横浜' WHERE id = 6;
\`\`\`

:::warn
\`UPDATE\` と \`DELETE\` で **WHERE を忘れると全行が対象**になります。実務で最も怖いミスのひとつ。必ず条件を確認！
:::

## 削除 DELETE

\`\`\`sql
DELETE FROM users WHERE id = 6;
\`\`\`

## トランザクションの考え方

複数の変更を「ひとまとまり（全部成功 or 全部取消）」にするのがトランザクションです。送金処理のように「片方だけ実行されたら困る」場面で必須です。

\`\`\`sql
BEGIN;
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;
COMMIT;
\`\`\`

下のエディタでは追加→確認を試せます（このDBはページ内のみ・リロードで初期化されます）。
`,
      exercises: [
        {
          type: "sql",
          label: "▶ 追加して確認",
          spec: {
            starter: `INSERT INTO users (id, name, email, age, city)
VALUES (6, '山田 涼', 'ryo@example.com', 26, '名古屋');
SELECT * FROM users WHERE id = 6;`,
          },
        },
        {
          type: "sql",
          label: "✏️ 練習: 価格を更新する",
          spec: {
            starter: `-- products の id=2（マウス）の price を 3000 に更新し、
-- そのあと id=2 の行を SELECT で確認してください
`,
            expected: "UPDATE products SET price = 3000 WHERE id = 2; SELECT * FROM products WHERE id = 2;",
            requires: [
              { pattern: "update", hint: "UPDATE 文で値を更新しましょう。" },
              { pattern: "where", hint: "WHERE で対象を id=2 に限定しましょう（全行更新を防ぐため必須）。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "既存データの値を書き換えるSQLは？",
          choices: ["INSERT", "UPDATE", "SELECT"],
          answer: 1,
          explain: "UPDATE で既存行を更新します。INSERTは追加、SELECTは取得です。",
        },
        {
          q: "UPDATE/DELETEで絶対に確認すべき句は？",
          choices: ["ORDER BY", "WHERE", "LIMIT"],
          answer: 1,
          explain: "WHEREを忘れると全行が変更・削除されます。最重要の確認ポイントです。",
        },
        {
          q: "複数の変更を「全部成功か全部取消」にまとめる仕組みは？",
          choices: ["インデックス", "トランザクション", "ビュー"],
          answer: 1,
          explain: "トランザクション(BEGIN〜COMMIT)で一連の処理を不可分にします。",
        },
      ],
    },
  ],
};
