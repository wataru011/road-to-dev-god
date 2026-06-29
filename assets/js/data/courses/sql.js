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
    {
      id: "sql-6",
      title: "サブクエリと集合演算",
      level: 3,
      duration: "16分",
      body: `
# サブクエリと集合演算

上級では「クエリの中にクエリを書く」サブクエリで、複雑な問いに答えます。

## サブクエリ（クエリの中のクエリ）

「平均より高い商品」を求めるには、まず平均を求め、その結果を条件に使います。

\`\`\`sql
SELECT name, price FROM products
WHERE price > (SELECT AVG(price) FROM products);
\`\`\`

## IN を使ったサブクエリ

「一度でも注文された商品」を求める：

\`\`\`sql
SELECT name FROM products
WHERE id IN (SELECT product_id FROM orders);
\`\`\`

## 相関サブクエリ

外側の行ごとに内側を評価します。「自分のカテゴリの平均より高い商品」など。

\`\`\`sql
SELECT name, category, price FROM products p
WHERE price > (
  SELECT AVG(price) FROM products WHERE category = p.category
);
\`\`\`

## NOT IN / EXISTS

「一度も注文していないユーザー」：

\`\`\`sql
SELECT name FROM users
WHERE id NOT IN (SELECT user_id FROM orders);
\`\`\`

:::tip
サブクエリは強力ですが、JOINで書ける場合はJOINの方が速いことが多いです。「読みやすさ」と「速度」のバランスを意識しましょう（次レッスンのインデックスにもつながります）。
:::
`,
      exercises: [
        {
          type: "sql",
          label: "▶ 平均より高い商品",
          spec: { starter: "SELECT name, price FROM products\nWHERE price > (SELECT AVG(price) FROM products);" },
        },
        {
          type: "sql",
          label: "✏️ 練習: 一度も注文されていない商品",
          spec: {
            starter: "-- products のうち、orders に一度も現れない商品の name を取得してください\n-- ヒント: WHERE id NOT IN (SELECT ... FROM orders)\n",
            expected: "SELECT name FROM products WHERE id NOT IN (SELECT product_id FROM orders);",
            requires: [
              { pattern: "select[\\s\\S]*select", hint: "サブクエリ（SELECTの中のSELECT）を使いましょう。" },
              { pattern: "not\\s+in", hint: "NOT IN で「含まれないもの」を表現しましょう。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "「全体の平均より高い行」を1つのクエリで求めるのに使うのは？",
          choices: ["サブクエリ", "INSERT", "LIMIT"],
          answer: 0,
          explain: "WHERE price > (SELECT AVG(price) ...) のようにサブクエリを使います。",
        },
        {
          q: "外側の行ごとに内側を評価するサブクエリを何という？",
          choices: ["相関サブクエリ", "集約関数", "ビュー"],
          answer: 0,
          explain: "外側の値を参照するものを相関サブクエリと呼びます。",
        },
      ],
    },
    {
      id: "sql-7",
      title: "インデックス・正規化・実行計画",
      level: 3,
      duration: "15分",
      body: `
# インデックス・正規化・実行計画

データが増えても速いシステムを作るための、データベース設計の核心です。

## インデックス（索引）

本の索引と同じで、特定の列の検索を高速化します。

\`\`\`sql
CREATE INDEX idx_users_city ON users(city);
\`\`\`

- \`WHERE city = '東京'\` のような検索が劇的に速くなる
- ただし**書き込みは少し遅くなり、容量も増える**ため貼りすぎ注意
- よく検索/結合する列（外部キーなど）に貼るのが定石

## 実行計画を見る

クエリがインデックスを使っているか確認できます。

\`\`\`sql
EXPLAIN QUERY PLAN
SELECT * FROM users WHERE city = '東京';
\`\`\`

\`SEARCH ... USING INDEX\` と出ればインデックスが効いています（\`SCAN\` は全件走査）。

## 正規化（おさらい＋一歩先）

- **第1正規形**: 1つのセルに複数値を入れない
- **第2・第3正規形**: 重複・部分的な依存を排除
- 目的は「1つの事実は1か所」。更新時の不整合を防ぐ

## 非正規化という選択

読み取りが極端に多い場合、あえて重複を持たせて高速化することも（トレードオフ）。
「正しさ」と「速さ」のどちらを優先するか、設計判断が問われます。

:::warn
インデックスは万能薬ではありません。小さなテーブルでは効果が薄く、むしろオーバーヘッドに。**計測してから貼る**のが鉄則です。
:::
`,
      exercises: [
        {
          type: "sql",
          label: "▶ 実行計画を確認する",
          spec: { starter: "EXPLAIN QUERY PLAN\nSELECT * FROM users WHERE city = '東京';" },
        },
        {
          type: "sql",
          label: "✏️ 練習: インデックスを作る",
          spec: {
            starter: "-- orders テーブルの user_id 列にインデックス idx_orders_user を作成してください\n",
            expected: "CREATE INDEX idx_orders_user ON orders(user_id);",
            requires: [
              { pattern: "create\\s+index", hint: "CREATE INDEX でインデックスを作成します。" },
              { pattern: "user_id", hint: "対象は orders(user_id) です。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "特定の列の検索を高速化する仕組みは？",
          choices: ["インデックス", "トリガー", "ビュー"],
          answer: 0,
          explain: "インデックス（索引）が検索を高速化します。",
        },
        {
          q: "インデックスのデメリットとして正しいのは？",
          choices: ["検索が遅くなる", "書き込みが遅くなり容量も増える", "データが消える"],
          answer: 1,
          explain: "読み取りは速くなりますが、書き込みコストと容量が増えます。貼りすぎ注意です。",
        },
        {
          q: "クエリがインデックスを使っているか調べるには？",
          choices: ["EXPLAIN QUERY PLAN", "DELETE", "COUNT"],
          answer: 0,
          explain: "EXPLAIN QUERY PLAN で実行計画を確認できます。",
        },
      ],
    },
    {
      id: "sql-8",
      title: "CASE式と条件付き集計",
      level: 2,
      duration: "13分",
      body: `
# CASE式と条件付き集計

\`CASE\` を使うと、SQLの中で「もし〜なら」という分岐ができます。レポート作成で大活躍します。

## CASE 式の基本

\`\`\`sql
SELECT name, price,
  CASE
    WHEN price >= 50000 THEN '高価格'
    WHEN price >= 5000  THEN '中価格'
    ELSE '低価格'
  END AS 価格帯
FROM products;
\`\`\`

## 条件付き集計（ピボット的な集計）

\`SUM\` と \`CASE\` を組み合わせると、「条件ごとの件数/合計」を1行にまとめられます。

\`\`\`sql
SELECT
  COUNT(*) AS 全体,
  SUM(CASE WHEN city = '東京' THEN 1 ELSE 0 END) AS 東京,
  SUM(CASE WHEN city = '大阪' THEN 1 ELSE 0 END) AS 大阪
FROM users;
\`\`\`

:::tip
\`CASE\` は SELECT だけでなく ORDER BY や WHERE でも使えます。「特定の値を先頭に並べる」など柔軟な制御が可能です。
:::
`,
      exercises: [
        {
          type: "sql",
          label: "▶ 価格帯でラベル付け",
          spec: {
            starter: `SELECT name, price,
  CASE WHEN price >= 50000 THEN '高価格'
       WHEN price >= 5000  THEN '中価格'
       ELSE '低価格' END AS 価格帯
FROM products;`,
          },
        },
        {
          type: "sql",
          label: "✏️ 練習: 在庫ありなしを分類",
          spec: {
            starter: `-- products に対し、name と、stock が 0 なら '在庫なし'、それ以外は '在庫あり' を
-- 「在庫状況」という列名で表示してください。
`,
            expected: "SELECT name, CASE WHEN stock = 0 THEN '在庫なし' ELSE '在庫あり' END AS 在庫状況 FROM products;",
            requires: [
              { pattern: "case", hint: "CASE 式で分岐しましょう。" },
              { pattern: "stock", hint: "stock の値で判定しましょう。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "SQLの中で「もし〜なら」という分岐を表現するのは？",
          choices: ["IF文", "CASE式", "WHILE"],
          answer: 1,
          explain: "標準SQLでは CASE WHEN ... THEN ... END を使います。",
        },
        {
          q: "`SUM(CASE WHEN city='東京' THEN 1 ELSE 0 END)` が求めるものは？",
          choices: ["東京の人数", "全体の人数", "東京以外の人数"],
          answer: 0,
          explain: "条件に合う行だけ1を足すので、東京の件数になります。条件付き集計の定番です。",
        },
      ],
    },
    {
      id: "sql-9",
      title: "ウィンドウ関数と CTE(WITH)",
      level: 3,
      duration: "17分",
      body: `
# ウィンドウ関数と CTE(WITH)

上級SQLの花形。「グループ集計しつつ、各行も残す」「ランキング」「累計」が書けます。

## ウィンドウ関数

\`GROUP BY\` は行をまとめてしまいますが、ウィンドウ関数は**各行を残したまま**集計を横に付けられます。

\`\`\`sql
SELECT name, city, age,
  AVG(age) OVER (PARTITION BY city) AS 同じ市の平均年齢,
  RANK()   OVER (ORDER BY age DESC) AS 年齢ランク
FROM users;
\`\`\`

- \`OVER (PARTITION BY ...)\` … グループごとに計算
- \`RANK() / ROW_NUMBER()\` … 順位付け
- \`SUM(...) OVER (ORDER BY ...)\` … 累計

## CTE（WITH句）― 名前付きの一時結果

複雑なクエリを「段階」に分けて読みやすくします。

\`\`\`sql
WITH city_avg AS (
  SELECT city, AVG(age) AS avg_age FROM users GROUP BY city
)
SELECT u.name, u.city, c.avg_age
FROM users u
JOIN city_avg c ON u.city = c.city;
\`\`\`

:::tip
サブクエリのネストが深くなったら CTE の出番。「上から読める」クエリは、未来の自分とチームを救います。
:::
`,
      exercises: [
        {
          type: "sql",
          label: "▶ 年齢ランキング",
          spec: {
            starter: `SELECT name, age,
  RANK() OVER (ORDER BY age DESC) AS 年齢順位
FROM users;`,
          },
        },
        {
          type: "sql",
          label: "✏️ 練習: 都市ごとの平均を各行に付ける",
          spec: {
            starter: `-- users の各行に、name, city, age と、
-- 「同じ city の平均年齢」を avg_age という列で付けてください（ウィンドウ関数を使用）。
`,
            expected: "SELECT name, city, age, AVG(age) OVER (PARTITION BY city) AS avg_age FROM users;",
            requires: [
              { pattern: "over", hint: "OVER (...) のウィンドウ関数を使いましょう。" },
              { pattern: "partition\\s+by", hint: "PARTITION BY city で市ごとに区切りましょう。" },
            ],
          },
        },
      ],
      quiz: [
        {
          q: "各行を残したまま、グループ集計を横に付けられるのは？",
          choices: ["GROUP BY", "ウィンドウ関数(OVER)", "DELETE"],
          answer: 1,
          explain: "ウィンドウ関数(OVER句)は行を集約せずに集計値を付与できます。",
        },
        {
          q: "複雑なクエリを名前付きの段階に分けて読みやすくするのは？",
          choices: ["CTE(WITH句)", "INDEX", "TRIGGER"],
          answer: 0,
          explain: "WITH句(CTE)で一時的な名前付き結果を作れます。",
        },
      ],
    },
    {
      id: "sql-10",
      title: "【神】データベース設計の実践",
      level: 4,
      duration: "17分",
      body: `
# 【神】データベース設計の実践

良いシステムは良いテーブル設計から。後から変えにくいからこそ、最初の設計が神の腕の見せ所です。

## 設計のステップ

1. **エンティティ**を洗い出す（ユーザー、商品、注文…）
2. **関連(リレーション)**を決める（1対多、多対多）
3. **正規化**で重複を排除（1つの事実は1か所）
4. よく使う検索に**インデックス**

## 多対多は「中間テーブル」で

「ユーザーは複数の商品を買い、商品は複数のユーザーに買われる」＝多対多。これは中間テーブルで表現します。

\`\`\`sql
-- orders が users と products をつなぐ中間テーブル
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,     -- FK → users.id
  product_id INTEGER NOT NULL,  -- FK → products.id
  quantity INTEGER NOT NULL
);
\`\`\`

## 制約でデータを守る

- \`NOT NULL\` … 必須
- \`UNIQUE\` … 重複禁止（例: email）
- \`FOREIGN KEY\` … 関連の整合性
- \`CHECK\` … 値の範囲（例: \`CHECK(quantity > 0)\`）

## 設計のトレードオフ

正規化は整合性に強いが、読み取りでJOINが増える。超高頻度の読み取りでは**あえて非正規化**することも。「正しさ」と「速さ」の判断が神の領域。

:::warn
「とりあえず1つの巨大テーブル」は将来の地獄。最初に関連を整理することが、後の自分を救います。
:::
`,
      exercises: [
        {
          type: "sql",
          label: "▶ 設計を確認する（中間テーブル経由の集計）",
          spec: {
            starter: `-- 多対多を中間テーブル orders 経由で結合し、商品ごとの販売数量を集計
SELECT p.name AS 商品, SUM(o.quantity) AS 販売数
FROM products p
JOIN orders o ON o.product_id = p.id
GROUP BY p.id
ORDER BY 販売数 DESC;`,
          },
        },
      ],
      quiz: [
        {
          q: "「多対多」の関連を表現するのに使うのは？",
          choices: ["中間テーブル", "1つの巨大テーブル", "インデックス"],
          answer: 0,
          explain: "中間テーブル（例: orders）で多対多を1対多×2に分解します。",
        },
        {
          q: "email の重複登録を防ぐのに使う制約は？",
          choices: ["UNIQUE", "DEFAULT", "ORDER BY"],
          answer: 0,
          explain: "UNIQUE 制約で重複を禁止できます。",
        },
        {
          q: "超高頻度の読み取りで、あえて重複を持たせる設計判断は？",
          choices: ["非正規化", "全文検索", "削除"],
          answer: 0,
          explain: "読み取り最適化のための非正規化。整合性とのトレードオフを判断します。",
        },
      ],
    },
    {
      id: "sql-11",
      title: "【神】トランザクションと同時実行制御",
      level: 4,
      duration: "16分",
      body: `
# 【神】トランザクションと同時実行制御

複数人が同時に使うシステムで、データを壊さないための深い知識です。

## ACID特性

トランザクションが守るべき4つの性質。

- **A** 原子性 … 全部成功か全部取消（中途半端を作らない）
- **C** 一貫性 … ルール（制約）を常に満たす
- **I** 独立性 … 同時実行でも互いに干渉しない
- **D** 永続性 … コミットしたら消えない

## 送金の例

\`\`\`sql
BEGIN;
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;
COMMIT;   -- 失敗時は ROLLBACK で取消
\`\`\`

片方だけ実行されたら大惨事。だから不可分にします。

## 同時実行の問題と分離レベル

同時アクセスで起きうる現象：

- **ダーティリード** … 未コミットの値を読む
- **ノンリピータブルリード** … 同じ行を2回読むと値が違う
- **ファントムリード** … 2回読むと行数が違う

これを **分離レベル**（Read Committed / Repeatable Read / Serializable）で制御します。厳しくするほど安全だが遅くなるトレードオフ。

## デッドロックと楽観/悲観ロック

- **デッドロック**: 互いの解放を待ち合って固まる → 取得順を統一して回避
- **悲観ロック**: 先にロック（競合が多い場面）
- **楽観ロック**: バージョン番号で衝突検知（競合が少ない場面）

:::tip
「お金・在庫・予約」が絡む処理は必ずトランザクション。神は同時実行を制する者なり。
:::
`,
      quiz: [
        {
          q: "トランザクションの「全部成功か全部取消」という性質は？",
          choices: ["原子性(Atomicity)", "永続性(Durability)", "独立性(Isolation)"],
          answer: 0,
          explain: "原子性です。中途半端な状態を作らないことを保証します。",
        },
        {
          q: "未コミットのデータを他のトランザクションが読んでしまう問題は？",
          choices: ["ダーティリード", "デッドロック", "インデックススキャン"],
          answer: 0,
          explain: "ダーティリードです。分離レベルを上げると防げます。",
        },
        {
          q: "互いにロックの解放を待ち続けて処理が固まる状態は？",
          choices: ["デッドロック", "正規化", "キャッシュヒット"],
          answer: 0,
          explain: "デッドロックです。ロック取得順を統一するなどで回避します。",
        },
      ],
    },
    {
      id: "sql-12",
      title: "【神】スケールするデータ基盤",
      level: 4,
      duration: "16分",
      body: `
# 【神】スケールするデータ基盤

データ量とアクセスが爆発しても耐えるDBの作り方。システム設計の集大成です。

## 読み取りを増やす：レプリケーション

DBを「主(Primary)」と「複製(Replica)」に分け、書き込みは主へ、読み取りは複製へ振り分けます。読み取りが多いサービスで有効。

\`\`\`
書き込み → [Primary] ──複製──▶ [Replica] [Replica]
読み取り ←────────────────────┘（複数で分散）
\`\`\`

## 巨大化を分割：シャーディング / パーティショニング

1つのテーブルを複数に分割して負荷を分散。

- **水平分割(シャーディング)**: 行で分ける（user_id の範囲やハッシュで別DBへ）
- **垂直分割**: 列で分ける（あまり使わない列を別テーブルへ）

## キャッシュ層

頻繁に読むデータは Redis などのインメモリに置き、DBへの問い合わせを減らす。

## RDB と NoSQL の使い分け

- **RDB（MySQL/PostgreSQL）**: 強い整合性・複雑なJOIN・トランザクション
- **NoSQL（MongoDB/DynamoDB/Redis）**: 柔軟なスキーマ・水平スケール・超高速read

「銀行口座はRDB、SNSのタイムラインはNoSQL＋キャッシュ」のように、**特性で選ぶ**のが神。

:::warn
スケール対策は複雑さを増やす。まずはインデックスとクエリ改善（上級編）で足りないか確認。**早すぎる最適化は害**。計測してから分散へ。
:::
`,
      quiz: [
        {
          q: "書き込みを主、読み取りを複製に振り分けて読み取りを増やす手法は？",
          choices: ["レプリケーション", "正規化", "デッドロック"],
          answer: 0,
          explain: "レプリケーション（主/複製構成）です。読み取り負荷を分散できます。",
        },
        {
          q: "1つの巨大テーブルを行で分割して負荷分散するのは？",
          choices: ["シャーディング(水平分割)", "インデックス", "CASE式"],
          answer: 0,
          explain: "シャーディング（水平分割）です。user_idのハッシュ等で分けます。",
        },
        {
          q: "強い整合性・複雑なJOIN・トランザクションが必要な領域に向くのは？",
          choices: ["RDB(リレーショナルDB)", "画像ファイル", "CSV"],
          answer: 0,
          explain: "RDBが得意分野です。柔軟さ・超高速readはNoSQLが得意で、特性で使い分けます。",
        },
      ],
    },
  ],
};
