export default {
  id: "java",
  tag: "java",
  icon: "☕",
  title: "Java",
  short: "堅牢なバックエンドを支える定番言語",
  description:
    "型のある世界で、変数・制御構文・クラス・コレクション、そしてWebバックエンド(Spring)の考え方までを学びます。コードはブラウザでは実行できないため、コード読解と「出力予想」クイズで力をつけます。",
  note: "JavaはJVM上で動くためブラウザ内では実行できません。本コースは解説・コード読解・出力予想で学びます。手元で動かす場合は JDK と `javac`/`java` を使ってください。",
  lessons: [
    {
      id: "java-1",
      title: "Javaとは／最初のプログラム",
      duration: "12分",
      body: `
# Javaとは／最初のプログラム

Javaは**型がしっかりした**コンパイル言語です。書いたコードを \`javac\` でコンパイルし、JVM（Java仮想マシン）上で実行します。大規模システムや企業の基幹システムで広く使われています。

## なぜバックエンドにJava？

- **静的型付け**: 変数の型が決まっており、コンパイル時に多くのミスを発見できる
- **堅牢・高速**: 大量アクセスにも耐える成熟したエコシステム
- **豊富なライブラリ**: Spring など強力なフレームワークが揃う

## 最初のプログラム

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Dev God!");
    }
}
\`\`\`

- すべてのコードは **クラス** の中に書く
- \`main\` メソッドがプログラムの入口
- \`System.out.println(...)\` で1行出力（JSの \`console.log\` に相当）

## 実行の流れ

\`\`\`
Main.java  --(javac)-->  Main.class  --(java)-->  実行
  ソース       コンパイル    バイトコード    JVMが実行
\`\`\`

:::note
JavaScriptが「すぐ動く」のに対し、Javaは「コンパイルしてから動く」。この一手間が、実行前にエラーを見つけてくれる安心につながります。
:::
`,
      quiz: [
        {
          q: "Javaプログラムの実行の入口となるメソッドは？",
          choices: ["start()", "main()", "run()"],
          answer: 1,
          explain: "public static void main(String[] args) が実行の起点です。",
        },
        {
          q: "1行出力する命令（JSのconsole.logに相当）は？",
          choices: ["print(...)", "System.out.println(...)", "echo(...)"],
          answer: 1,
          explain: "System.out.println(...) を使います。",
        },
        {
          q: "Javaがコンパイル時にミスを発見しやすい理由は？",
          choices: ["動的型付けだから", "静的型付け（型が決まっている）だから", "型が無いから"],
          answer: 1,
          explain: "静的型付けにより、型の不一致などをコンパイル時に検出できます。",
        },
      ],
    },
    {
      id: "java-2",
      title: "変数・型・演算",
      duration: "13分",
      body: `
# 変数・型・演算

Javaでは変数を宣言するときに**型を明示**します。ここがJavaScriptとの大きな違いです。

## 基本型（プリミティブ型）

\`\`\`java
int age = 28;            // 整数
double price = 1980.5;   // 小数
boolean isMember = true; // 真偽値
char grade = 'A';        // 1文字
\`\`\`

## 参照型

\`\`\`java
String name = "太郎";    // 文字列（Stringは特別なクラス）
\`\`\`

## 型を間違えると…

\`\`\`java
int x = "hello"; // コンパイルエラー！ 文字列は int に入らない
\`\`\`

JavaScriptなら実行時まで気づかないミスを、Javaは**書いた瞬間〜コンパイル時**に教えてくれます。

## 文字列の連結と出力

\`\`\`java
String name = "花子";
int age = 34;
System.out.println(name + "さんは" + age + "歳");
// → 花子さんは34歳
\`\`\`

:::tip
迷ったらまず \`int\`（整数）、\`double\`（小数）、\`boolean\`（真偽）、\`String\`（文字列）の4つを押さえればOKです。
:::
`,
      quiz: [
        {
          q: "Javaで整数を表す基本型は？",
          choices: ["int", "string", "number"],
          answer: 0,
          explain: "整数は int です。小数は double、真偽は boolean。",
        },
        {
          q: "次のコードの出力は？\n```\nint a = 7;\nint b = 2;\nSystem.out.println(a / b);\n```",
          choices: ["3.5", "3", "4"],
          answer: 1,
          explain: "int同士の割り算は整数除算になり小数点以下が切り捨てられるため 3 です。3.5 が欲しければ double を使います。",
        },
        {
          q: "`int x = \"hello\";` を書くとどうなる？",
          choices: ["問題なく動く", "コンパイルエラー", "x が0になる"],
          answer: 1,
          explain: "文字列をint型に代入できないため、コンパイル時にエラーになります。",
        },
      ],
    },
    {
      id: "java-3",
      title: "制御構文（if / for / while）",
      duration: "13分",
      body: `
# 制御構文（if / for / while）

考え方はJavaScriptとよく似ていますが、型と書式がより厳格です。

## if 文

\`\`\`java
int score = 75;
if (score >= 80) {
    System.out.println("優");
} else if (score >= 60) {
    System.out.println("良");
} else {
    System.out.println("不可");
}
\`\`\`

## for 文

\`\`\`java
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
\`\`\`

## 拡張for文（配列・リストの巡回）

\`\`\`java
int[] nums = {10, 20, 30};
for (int n : nums) {
    System.out.println(n);
}
\`\`\`

## while 文

\`\`\`java
int i = 0;
while (i < 3) {
    System.out.println(i);
    i++;
}
\`\`\`

:::note
JavaScriptの \`for...of\` に当たるのが、Javaの「拡張for文」 \`for (型 変数 : コレクション)\` です。
:::
`,
      quiz: [
        {
          q: "次のループは何回 println を実行する？\n```\nfor (int i = 0; i < 4; i++) { System.out.println(i); }\n```",
          choices: ["3回", "4回", "5回"],
          answer: 1,
          explain: "i=0,1,2,3 の4回です（i<4 が条件）。",
        },
        {
          q: "配列の全要素を順に処理する拡張for文の書き方は？",
          choices: ["for (n in nums)", "for (int n : nums)", "foreach nums"],
          answer: 1,
          explain: "Javaの拡張for文は for (型 変数 : コレクション) と書きます。",
        },
      ],
    },
    {
      id: "java-4",
      title: "クラスとオブジェクト",
      duration: "16分",
      body: `
# クラスとオブジェクト

Javaは**オブジェクト指向**言語です。「データ（フィールド）」と「処理（メソッド）」をまとめた設計図が **クラス**、それを実体化したものが **オブジェクト（インスタンス）** です。

## クラスを定義する

\`\`\`java
public class User {
    String name;   // フィールド（属性）
    int age;

    // コンストラクタ（生成時の初期化）
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // メソッド（振る舞い）
    public String greet() {
        return name + "さん（" + age + "歳）です";
    }
}
\`\`\`

## オブジェクトを作って使う

\`\`\`java
User u = new User("太郎", 28);
System.out.println(u.greet());
// → 太郎さん（28歳）です
\`\`\`

## カプセル化

フィールドを \`private\` にして、外部からはメソッド経由でのみ触らせるのが定石です。これにより不正な値の混入を防げます。

\`\`\`java
public class Account {
    private int balance = 0;

    public void deposit(int amount) {
        if (amount > 0) balance += amount;
    }
    public int getBalance() {
        return balance;
    }
}
\`\`\`

:::tip
JSのオブジェクト \`{ name, age }\` が「データの入れ物」なら、Javaのクラスは「データ＋振る舞い＋ルール」をまとめた、より厳格な設計図です。
:::
`,
      quiz: [
        {
          q: "クラスを実体化（インスタンス化）するキーワードは？",
          choices: ["new", "class", "this"],
          answer: 0,
          explain: "new User(...) のように new でインスタンスを生成します。",
        },
        {
          q: "オブジェクト生成時に呼ばれ、フィールドを初期化する特別なメソッドは？",
          choices: ["main", "コンストラクタ", "getter"],
          answer: 1,
          explain: "クラス名と同名のコンストラクタが生成時に呼ばれます。",
        },
        {
          q: "フィールドを private にして外部から直接触れないようにする考え方は？",
          choices: ["継承", "カプセル化", "ポリモーフィズム"],
          answer: 1,
          explain: "カプセル化です。内部状態を守り、メソッド経由でのみ操作させます。",
        },
      ],
    },
    {
      id: "java-5",
      title: "コレクションと例外処理",
      duration: "15分",
      body: `
# コレクションと例外処理

実務で頻出する「複数データの扱い」と「エラーへの備え」を学びます。

## List（可変長の配列）

\`\`\`java
import java.util.*;

List<String> names = new ArrayList<>();
names.add("太郎");
names.add("花子");
System.out.println(names.size()); // 2
for (String n : names) {
    System.out.println(n);
}
\`\`\`

\`List<String>\` の \`<String>\` は「中身は文字列だけ」という型の指定（ジェネリクス）です。

## Map（キーと値のペア）

\`\`\`java
Map<String, Integer> ages = new HashMap<>();
ages.put("太郎", 28);
ages.put("花子", 34);
System.out.println(ages.get("花子")); // 34
\`\`\`

JSのオブジェクトや連想配列に近い使い方ができます。

## 例外処理 try-catch

エラー（例外）が起きうる処理は \`try-catch\` で囲んで安全に扱います。

\`\`\`java
try {
    int result = 10 / 0;          // ゼロ除算
} catch (ArithmeticException e) {
    System.out.println("エラー: " + e.getMessage());
} finally {
    System.out.println("後始末はここで必ず実行");
}
\`\`\`

:::note
\`finally\` は成功・失敗にかかわらず必ず実行されます。ファイルやDB接続を閉じる処理などに使います。
:::
`,
      quiz: [
        {
          q: "要素を順番に追加できる可変長リストのクラスは？",
          choices: ["ArrayList", "int[]", "String"],
          answer: 0,
          explain: "ArrayList は要素を動的に追加できるListの実装です。",
        },
        {
          q: "キーと値のペアでデータを管理するのは？",
          choices: ["List", "Map", "boolean"],
          answer: 1,
          explain: "Map（HashMapなど）はキーから値を引く構造です。",
        },
        {
          q: "try-catch の finally ブロックはいつ実行される？",
          choices: ["例外が出たときだけ", "成功時だけ", "成功・失敗にかかわらず必ず"],
          answer: 2,
          explain: "finally は必ず実行され、後始末（クローズ処理など）に使います。",
        },
      ],
    },
    {
      id: "java-6",
      title: "Webバックエンド入門（Spring の考え方）",
      duration: "14分",
      body: `
# Webバックエンド入門（Spring の考え方）

Javaでは **Spring Boot** がWebバックエンドのデファクトスタンダードです。ここでは「どう繋がるか」のイメージを掴みます。

## コントローラ ― リクエストの受け口

ブラウザからのHTTPリクエストを受け、レスポンスを返す部品です。基礎編で学んだ GET/POST がコードに現れます。

\`\`\`java
@RestController
public class UserController {

    @GetMapping("/api/users/{id}")
    public User getUser(@PathVariable int id) {
        return userService.findById(id);
    }

    @PostMapping("/api/users")
    public User create(@RequestBody User user) {
        return userService.save(user);
    }
}
\`\`\`

- \`@GetMapping("/api/users/{id}")\` … このURLへのGETを処理
- 戻り値の \`User\` オブジェクトは自動的に **JSON** に変換されて返る
- これがフロントの \`fetch("/api/users/1")\` と繋がる

## 3層アーキテクチャ

\`\`\`
Controller（受け口） → Service（業務ロジック） → Repository（DB操作=SQL）
\`\`\`

- **Controller**: HTTPの入出力だけを担当
- **Service**: 「在庫を引く」などの業務ルール
- **Repository**: データベースへの読み書き（SQLはここ）

## すべてが繋がる

> ブラウザのJavaScript が \`fetch\` でリクエスト → Java の Controller が受ける → Service が判断 → Repository が SQL を実行 → 結果をJSONで返す → JavaScript が画面を更新。

この一連の流れこそ、あなたが本講座で学んできた Java・JavaScript・SQL の**合流点**です。総合演習コースでさらに深掘りします。
`,
      quiz: [
        {
          q: "Springでブラウザからのリクエストを受け取る部品は？",
          choices: ["Repository", "Controller", "Entity"],
          answer: 1,
          explain: "Controllerがリクエストの受け口です。",
        },
        {
          q: "3層アーキテクチャで、実際にSQLを実行してDBとやり取りするのは？",
          choices: ["Controller層", "Service層", "Repository層"],
          answer: 2,
          explain: "Repository層がデータベースアクセス（SQL）を担当します。",
        },
        {
          q: "コントローラが返したJavaオブジェクトは、フロントへ何形式で返るのが一般的？",
          choices: ["JSON", "画像", "CSVのみ"],
          answer: 0,
          explain: "オブジェクトは自動的にJSONへ変換されてレスポンスされます。",
        },
      ],
    },
    {
      id: "java-7",
      title: "ジェネリクスと Stream API",
      level: 3,
      duration: "16分",
      body: `
# ジェネリクスと Stream API

上級のJavaでは、型安全な再利用と、宣言的なデータ処理を学びます。JavaScriptの \`map\`/\`filter\` に通じる世界です。

## ジェネリクス（型のパラメータ化）

\`<T>\` で「どんな型でも扱えるが、型安全」な部品を作れます。

\`\`\`java
public class Box<T> {
    private T value;
    public void set(T v) { this.value = v; }
    public T get() { return value; }
}

Box<String> b = new Box<>();
b.set("hello");
String s = b.get();   // キャスト不要・型安全
\`\`\`

\`List<String>\` の \`<String>\` も同じ仕組み。間違った型を入れるとコンパイルエラーになります。

## Stream API（宣言的なデータ処理）

ループを書かずに「何をしたいか」を表現します。

\`\`\`java
import java.util.*;
import java.util.stream.*;

List<Integer> nums = List.of(1, 2, 3, 4, 5);
int sum = nums.stream()
              .filter(n -> n % 2 == 0)   // 偶数だけ
              .mapToInt(n -> n * 10)      // 10倍
              .sum();                     // 合計
// (2*10) + (4*10) = 60
\`\`\`

- \`filter\` … 条件で絞る（JSと同じ発想）
- \`map\` / \`mapToInt\` … 変換
- \`collect(Collectors.toList())\` … 結果をリストに
- \`sum\` / \`count\` / \`reduce\` … 集約

## ラムダ式とメソッド参照

\`n -> n * 10\` がラムダ式（JSのアロー関数に相当）。\`User::getName\` のようなメソッド参照も使えます。

:::tip
Stream は「中間操作（filter/map）」を重ねて「終端操作（sum/collect）」で実行されます。JSの配列メソッドチェーンとそっくり。言語が変わっても考え方は共通です。
:::
`,
      quiz: [
        {
          q: "`List<String>` の `<String>` のように型をパラメータ化する仕組みは？",
          choices: ["ジェネリクス", "アノテーション", "インターフェース"],
          answer: 0,
          explain: "ジェネリクスです。型安全かつ再利用可能な部品を作れます。",
        },
        {
          q: "次のStreamの結果は？\n```\nList.of(1,2,3,4).stream().filter(n -> n%2==0).mapToInt(n -> n).sum()\n```",
          choices: ["10", "6", "4"],
          answer: 1,
          explain: "偶数 2 と 4 を合計して 6 です。",
        },
        {
          q: "`n -> n * 10` のような短い無名関数をJavaで何という？",
          choices: ["ラムダ式", "コンストラクタ", "ジェネリクス"],
          answer: 0,
          explain: "ラムダ式です。JavaScriptのアロー関数に相当します。",
        },
      ],
    },
    {
      id: "java-8",
      title: "継承・インターフェース・ポリモーフィズム",
      level: 2,
      duration: "16分",
      body: `
# 継承・インターフェース・ポリモーフィズム

オブジェクト指向の3本柱のうち、カプセル化に続く2つを学びます。

## 継承（共通部分をまとめる）

\`\`\`java
class Animal {
    String name;
    Animal(String name) { this.name = name; }
    String sound() { return "..."; }
}

class Dog extends Animal {
    Dog(String name) { super(name); }
    @Override
    String sound() { return "ワン"; }
}
\`\`\`

\`extends\` で親を継承し、\`@Override\` でメソッドを上書きします。

## インターフェース（できることの契約）

「何ができるか」だけを定義し、実装はクラスに任せます。

\`\`\`java
interface Greetable {
    String greet();          // 実装は持たない（契約のみ）
}

class User implements Greetable {
    public String greet() { return "こんにちは"; }
}
\`\`\`

## ポリモーフィズム（多態性）

同じ型として扱い、実際の中身に応じて振る舞いが変わります。

\`\`\`java
List<Animal> animals = List.of(new Dog("ポチ"), new Animal("謎"));
for (Animal a : animals) {
    System.out.println(a.sound());  // ポチは「ワン」、謎は「...」
}
\`\`\`

:::tip
インターフェースに依存して具体クラスに依存しない設計は、神レベルの「依存性逆転」につながります。差し替え・テストが容易になります。
:::
`,
      quiz: [
        {
          q: "親クラスのメソッドを子クラスで上書きすることを何という？",
          choices: ["オーバーライド", "オーバーロード", "キャスト"],
          answer: 0,
          explain: "オーバーライド(@Override)です。オーバーロードは同名で引数違いの定義です。",
        },
        {
          q: "「できること（メソッドの契約）」だけを定義し実装はクラスに任せるのは？",
          choices: ["インターフェース", "コンストラクタ", "フィールド"],
          answer: 0,
          explain: "インターフェースです。implements で実装を約束します。",
        },
        {
          q: "同じ型として扱い、実体に応じて振る舞いが変わる性質は？",
          choices: ["ポリモーフィズム", "カプセル化", "正規化"],
          answer: 0,
          explain: "ポリモーフィズム（多態性）です。",
        },
      ],
    },
    {
      id: "java-9",
      title: "ラムダ・関数型インターフェース・Optional",
      level: 3,
      duration: "15分",
      body: `
# ラムダ・関数型インターフェース・Optional

モダンJavaの書き味。JavaScriptで学んだ関数の感覚がここで活きます。

## ラムダ式

メソッドが1つだけのインターフェース（関数型インターフェース）を、短く書けます。

\`\`\`java
Runnable r = () -> System.out.println("実行");
Comparator<String> byLen = (a, b) -> a.length() - b.length();
\`\`\`

## 関数型インターフェース

\`java.util.function\` の代表：

- \`Function<T,R>\` … T を受け R を返す
- \`Predicate<T>\` … T を受け boolean（条件）
- \`Consumer<T>\` … T を受け何も返さない
- \`Supplier<T>\` … 引数なしで T を返す

\`\`\`java
Predicate<Integer> isEven = n -> n % 2 == 0;
System.out.println(isEven.test(4)); // true
\`\`\`

## Optional ― nullとの戦いに終止符

「値が無いかもしれない」を型で表し、ぬるぽ(NullPointerException)を防ぎます。

\`\`\`java
Optional<User> found = repository.findById(3);
String name = found.map(User::getName)
                   .orElse("(不明)");
\`\`\`

:::warn
\`null\` を返す代わりに \`Optional\` を返す設計にすると、呼び出し側が「無い場合」を必ず意識するようになり、バグが激減します。
:::
`,
      quiz: [
        {
          q: "メソッドが1つだけのインターフェースを短く実装する記法は？",
          choices: ["ラムダ式", "アノテーション", "ジェネリクス"],
          answer: 0,
          explain: "ラムダ式です。関数型インターフェースに対して使えます。",
        },
        {
          q: "T を受け取り boolean（条件）を返す関数型インターフェースは？",
          choices: ["Predicate<T>", "Supplier<T>", "Consumer<T>"],
          answer: 0,
          explain: "Predicate<T> は条件判定（test）に使います。",
        },
        {
          q: "「値が無いかもしれない」を型で表しNPEを防ぐのは？",
          choices: ["Optional", "ArrayList", "HashMap"],
          answer: 0,
          explain: "Optional です。null の代わりに使うと安全性が上がります。",
        },
      ],
    },
    {
      id: "java-10",
      title: "【神】Spring 深掘り ― DI・AOP・JPA",
      level: 4,
      duration: "18分",
      body: `
# 【神】Spring 深掘り ― DI・AOP・JPA

実戦のJavaバックエンドを支える、Spring の核心3つ。

## DI（依存性注入）

オブジェクトの生成と組み立てをSpringに任せ、クラスは「必要なもの」を受け取るだけ。

\`\`\`java
@Service
public class OrderService {
    private final OrderRepository repo;
    // コンストラクタでSpringが自動的に注入してくれる
    public OrderService(OrderRepository repo) {
        this.repo = repo;
    }
}
\`\`\`

依存が外から渡るため、テスト時は**偽のRepository**に差し替え可能。神レベルの「依存性逆転」の実践形です。

## AOP（横断的関心事の分離）

ログ・トランザクション・認証など「あちこちで必要な処理」を本体から切り離します。

\`\`\`java
@Transactional   // このメソッドを自動でトランザクション化
public void transfer(...) { ... }
\`\`\`

\`@Transactional\` を付けるだけで、内部で例外が出れば自動ロールバック。

## JPA / ORM（オブジェクトとDBの橋渡し）

SQLを直接書かず、オブジェクト操作でDBを扱えます。

\`\`\`java
@Entity
public class User {
    @Id @GeneratedValue
    private Long id;
    private String name;
}

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByName(String name);  // メソッド名からSQLを自動生成
}
\`\`\`

:::warn
ORMは便利ですが、生成されるSQLを意識しないと **N+1問題**（神レベル・パフォーマンス参照）を招きます。便利さの裏側を理解するのが神。
:::
`,
      quiz: [
        {
          q: "オブジェクトの生成・組み立てをフレームワークに任せ、必要なものを受け取る仕組みは？",
          choices: ["DI（依存性注入）", "継承", "再帰"],
          answer: 0,
          explain: "DIです。テスト時の差し替えが容易になり、依存性逆転を実現します。",
        },
        {
          q: "メソッドに付けるだけで自動的にトランザクション化できるSpringのAOP的注釈は？",
          choices: ["@Transactional", "@Override", "@Id"],
          answer: 0,
          explain: "@Transactional です。例外時に自動でロールバックします。",
        },
        {
          q: "ORM(JPA)を不用意に使うと招きやすい性能問題は？",
          choices: ["N+1問題", "文字化け", "デッドコード"],
          answer: 0,
          explain: "関連を都度取得するとN+1問題になります。生成SQLの意識が必要です。",
        },
      ],
    },
    {
      id: "java-11",
      title: "【神】並行処理とスレッド安全",
      level: 4,
      duration: "17分",
      body: `
# 【神】並行処理とスレッド安全

サーバーは多数のリクエストを**同時に**処理します。並行処理を制する者が高性能を制します。

## スレッド

処理の流れ。複数スレッドで同時に仕事を進められます。

\`\`\`java
Runnable task = () -> System.out.println("別スレッドで実行");
new Thread(task).start();
\`\`\`

## 競合状態（レースコンディション）

複数スレッドが同じデータを同時に変更すると壊れます。

\`\`\`java
// ❌ スレッド安全でない：count++ は「読んで+1して書く」3手で割り込まれる
int count = 0;
// 複数スレッドが count++ → 数が合わなくなる
\`\`\`

## 対策

- **synchronized**: 同時に1スレッドだけ通す（ロック）
- **AtomicInteger** など: 不可分な操作を提供
- **不変オブジェクト**: そもそも変更しなければ競合しない（最強の対策）
- **java.util.concurrent**: ConcurrentHashMap、ExecutorService など安全な道具

\`\`\`java
AtomicInteger count = new AtomicInteger();
count.incrementAndGet();  // スレッド安全に+1
\`\`\`

## スレッドプール

スレッドを毎回作るのは高コスト。プールで使い回します。

\`\`\`java
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(task);
\`\`\`

:::tip
「共有して変更する状態」が諸悪の根源。状態を共有しない／不変にする設計が、最も確実なスレッド安全策です。
:::
`,
      quiz: [
        {
          q: "複数スレッドが同じデータを同時に書き換えて壊れる問題は？",
          choices: ["競合状態(レースコンディション)", "コンパイルエラー", "正規化"],
          answer: 0,
          explain: "レースコンディションです。ロックや不可分操作、不変設計で防ぎます。",
        },
        {
          q: "スレッド安全に整数をインクリメントできるクラスは？",
          choices: ["AtomicInteger", "ArrayList", "String"],
          answer: 0,
          explain: "AtomicInteger は不可分な加算を提供します。",
        },
        {
          q: "最も確実なスレッド安全策の考え方は？",
          choices: ["状態を共有しない・不変にする", "コメントを増やす", "変数名を長くする"],
          answer: 0,
          explain: "共有変更状態をなくす（不変化）のが根本対策です。",
        },
      ],
    },
    {
      id: "java-12",
      title: "【神】テスト駆動開発（JUnit / Mockito）",
      level: 4,
      duration: "16分",
      body: `
# 【神】テスト駆動開発（JUnit / Mockito）

神のコードは「壊れても即わかる」。Javaの自動テストで品質を守ります。

## JUnit ― 単体テスト

\`\`\`java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class CalculatorTest {
    @Test
    void 足し算ができる() {
        Calculator c = new Calculator();
        assertEquals(5, c.add(2, 3));
    }
}
\`\`\`

## TDD（テスト駆動開発）のサイクル

1. **Red**: 失敗するテストを先に書く
2. **Green**: テストが通る最小限の実装をする
3. **Refactor**: テストが通る状態を保ったまま整理する

「テストを先に書く」と、仕様が明確になり、過剰実装(YAGNI)も防げます。

## Mockito ― 依存を偽物に差し替える

DB やAPIなど「本物を呼びたくない依存」を偽物(モック)にして、対象だけをテストします。DIにしておくと差し替えが簡単です。

\`\`\`java
OrderRepository repo = mock(OrderRepository.class);
when(repo.findById(1L)).thenReturn(Optional.of(new Order()));

OrderService service = new OrderService(repo);  // 偽物を注入
// repo は本物のDBを叩かない
\`\`\`

## テストの価値

- リファクタリングを**怖くなくする**
- 仕様の**実行可能なドキュメント**になる
- 「テストの無いコードはレガシーコード」

:::tip
このプラットフォーム自身も GitHub Actions で push のたびに自動チェックしています。神への道は、自動化された安全網の上を歩む道です。
:::
`,
      quiz: [
        {
          q: "TDDの正しいサイクルは？",
          choices: ["Green → Red → Delete", "Red（失敗テスト）→ Green（実装）→ Refactor（整理）", "実装してからテストを書かない"],
          answer: 1,
          explain: "失敗するテストを先に書き、通す実装をし、整理する、を繰り返します。",
        },
        {
          q: "DBなど本物の依存を偽物に差し替えてテストする道具は？",
          choices: ["Mockito（モック）", "インデックス", "for文"],
          answer: 0,
          explain: "Mockitoでモックを作り、対象だけを隔離してテストします。DIが前提です。",
        },
        {
          q: "自動テストがもたらす最大の価値は？",
          choices: ["リファクタリングを怖くなくする", "コードが短くなる", "コメントが不要になる"],
          answer: 0,
          explain: "安全網があることで、安心して変更・改善できます。",
        },
      ],
    },
  ],
};
