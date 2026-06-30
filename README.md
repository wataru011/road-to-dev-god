# ⚡ Road to Dev God ― システム開発の神への道

新人プログラマーを **Webシステム開発の神** に育てるための、ブラウザだけで学べる学習Webアプリです。
**Java / JavaScript / SQL** の3言語を軸に、HTML/CSS・Webインフラ・設計・テスト・運用まで、Webシステム開発に必要な知識を体系的に学べます。

🔗 **公開URL**: `https://wataru011.github.io/road-to-dev-god/`
（リポジトリの Settings → Pages で「Source = GitHub Actions」に設定すると自動公開されます）

---

## 特徴

- 🧭 **全体像から学べる** ― Webシステムの仕組み（フロント／バック／DB、HTTP、JSON）を最初に俯瞰
- 🎨 **HTML / CSS はライブプレビュー** ― 入力するとその場で表示に反映
- ✨ **JavaScript はその場で実行** ― ブラウザ内のサンドボックスでコードを書いて即実行
- 🗄️ **SQL も本物を実行** ― 同梱の `sql.js`（ブラウザ版SQLite）でサンプルDBに対し実際にクエリ
- ☕ **Java はコード読解＋出力予想** ― ブラウザで動かせないJavaは、解説と理解度クイズで習得
- 🧩 **総合演習** ― 3言語を1つのシステムとして繋ぎ、設計・セキュリティの基本まで
- 📖 **面白小話100本** ― 学びの息抜きに、システム開発にまつわる史実・由来・障害事例を読み物として収録
- 🏆 **ゲーミフィケーション** ― レッスン完了やクイズ正解でXPが貯まり、「見習い」から「システム開発の神」へランクアップ。進捗とバッジは端末に保存

## 段階的にレベルアップする学習の道

初級から神まで、**4段階の難易度**で少しずつ実力を上げていきます。

| レベル | テーマ | レッスン数 / 読み時間 |
| --- | --- | --- |
| 🌱 初級編 (Lv.1) | プログラミングの第一歩 | 15 / 約3.1h |
| 🔧 中級編 (Lv.2) | 動くものを作れるようになる | 28 / 約6.8h |
| 🚀 上級編 (Lv.3) | 設計と仕組みを理解する | 18 / 約4.5h |
| 👑 神レベル (Lv.4) | システム全体を統べる | 22 / 約5.9h |
| **合計** | | **83 / 約20.3h** |

学習は「レベル別」でも「言語別トラック」でも進められます。

## トラック一覧（全10コース・83レッスン・読み時間 約20.3時間）

| コース | 内容 |
| --- | --- |
| 🌐 Web開発の基礎 | システムの全体像、HTTP、JSON、開発の流れ |
| 🎨 フロントエンド基礎(HTML/CSS) | 初級〜神の4段階：HTML/CSS基礎・レイアウト・レスポンシブ・フォーム・Ajax・セマンティック/アクセシビリティ・CSS設計・モダンCSS・デザインシステム・レンダリング性能 |
| ✨ JavaScript | 変数〜関数・配列/DOM・非同期/API・JSON・クロージャ・OOP・エラーハンドリング・正規表現・設計/テスト・TypeScript |
| 🗄️ SQL | SELECT〜JOIN・集計・更新/トランザクション・テーブル設計・サブクエリ・インデックス・ウィンドウ関数・DB設計・スケール |
| ☕ Java | 型・制御・クラス・継承/IF・コレクション/例外・Spring・Stream・並行処理・TDD |
| 🛠️ 開発ツールと実務 | コマンドライン・Git/GitHub・パッケージ管理・開発工程(ウォーターフォール)・クリーンコード・テストの基礎・デバッグ |
| 🌍 Webの仕組みとインフラ | Webサーバーとアプリサーバーの違い・ネットワーク・HTTPS・認証認可・REST設計・サーバー側入力検証・Docker・デプロイ |
| 🧮 アルゴリズムとデータ構造 | 計算量(Big-O)・基本データ構造・探索/整列 |
| 🧩 総合演習 | 1機能を端から端まで・データ設計・セキュリティ・次の一歩 |
| 🏛️ 総合・実戦(神) | 設計原則SOLID・システム設計・セキュリティ・性能・テスト/CI・最終課題 |

> 学習は「🛤️ 4段階のレベル（初級→中級→上級→神）」でも「📚 トラック別」でも進められます。
> HTML/CSS はブラウザ内ライブプレビュー、JavaScript はサンドボックス実行、SQL は同梱の sql.js で実行、Java はコード読解＋出力予想で学びます。
> さらに **📖 面白小話100本**（カテゴリ別・前後ページ送り対応の読み物）と、ホームの「今日の小話」も収録。

## 技術構成

- **ビルド不要の静的サイト**（バニラ HTML / CSS / ES Modules）。フレームワーク・バンドラなしで GitHub Pages にそのまま公開できます。
- ブラウザ内実行エンジン
  - JavaScript: `sandbox` 属性付き iframe で安全に実行し、`console` 出力を捕捉
  - SQL: **リポジトリ同梱**の `sql.js`（SQLite WASM）を読み込み実行（外部CDNに依存しない）
  - HTML / CSS: サンドボックス iframe でライブプレビュー
- 答え合わせ: 関数を複数入力でテスト、または要件(`requires`/`forbids`)・出力一致で判定
- キャッシュ対策: デプロイ時にアセットURLへコミットSHAのクエリ(`?v=`)を自動付与
- 進捗管理: `localStorage`

```
road-to-dev-god/
├─ index.html
├─ .nojekyll                      # Jekyll処理を無効化（assets配信のため）
├─ .github/workflows/deploy.yml   # GitHub Pages 自動デプロイ（mainのみ）
└─ assets/
   ├─ css/styles.css
   ├─ vendor/sqljs/               # 同梱の sql.js（sql-wasm.js / .wasm）
   └─ js/
      ├─ app.js                   # ルーター + 画面描画
      ├─ progress.js              # XP・ランク・バッジ・進捗(localStorage)
      ├─ markdown.js              # 軽量Markdownレンダラ
      ├─ runners/                 # js / sql / html / quiz 実行エンジン
      └─ data/                    # カリキュラム + 面白小話
         ├─ curriculum.js         # コース構成・レベル定義
         ├─ trivia.js             # 面白小話100本
         └─ courses/              # 各コースのレッスン定義
```

## ローカルで動かす

ES Modules を使うため、`file://` ではなく簡易サーバー経由で開きます。

```bash
# 例: Python が入っていれば
python3 -m http.server 8000
# → ブラウザで http://localhost:8000 を開く
```

## GitHub Pages への公開手順

1. このリポジトリの **Settings → Pages** を開く
2. **Build and deployment → Source** を **GitHub Actions** に設定
3. `main` に push（PRをマージ）すると `.github/workflows/deploy.yml` が自動でデプロイ
   （デプロイは `main` のみで実行。GitHub Pages 環境の保護のため、開発ブランチでは実行しません）

## コンテンツを追加・拡張する

レッスンはすべて `assets/js/data/courses/` 内のデータとして定義されています。
オブジェクトを1つ追加するだけでレッスンが増えます（コード不要）。

```js
{
  id: "js-99",
  title: "新しいレッスン",
  level: 2,            // 1=初級 2=中級 3=上級 4=神（コース内はレベル順に自動整列）
  duration: "10分",
  body: `# 見出し\n本文をMarkdownで...`,
  exercises: [{ type: "js", label: "演習", spec: { starter: "console.log(1)" } }],
  quiz: [{ q: "問題?", choices: ["A", "B"], answer: 0, explain: "解説" }],
}
```

面白小話は `assets/js/data/trivia.js` に1件追加するだけで増やせます（`{ id, cat, title, body, detail }`）。

---

> 神とは、完璧な人ではなく「学び続けることをやめない人」のこと。⚡
