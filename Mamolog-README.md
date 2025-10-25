# まもログ

## 📸 スクリーンショット
（※トップ画面、Todo一覧、日記投稿画面、カレンダー画面のキャプチャを後日追加予定）

---

## 📝 概要
日々のタスク管理と日記を一元管理できる、オリジナル開発のWebアプリケーションです。  
「予定を立て、実行し、振り返る」というPDCAサイクルを1つのアプリで完結できる仕組みを目指しました。

---

## 🎯 制作背景
### 開発動機
前職で業務改善に取り組む中で、**「タスク管理と振り返りを一元化するツールがあれば、もっと生産性が上がるのでは？」**と感じたことがきっかけです。

市販のTodoアプリには以下の課題がありました：
- Todoと日記が別アプリで管理が煩雑
- カレンダービューでの視覚化機能が弱い
- 写真付きの日記機能がない

これらを解決するため、**Spring Boot + React で完全オリジナルのアプリを開発**しました。

### 学習目的
1. **フロントエンドとバックエンドの完全分離**  
   REST API設計によるSPA（Single Page Application）の実装

2. **React Hooksの実践**  
   `useState`/`useEffect`を使った効率的な状態管理

3. **カレンダーUIの実装**  
   FullCalendar.jsを使った直感的なUI設計

4. **画像アップロード機能**  
   日記に写真を添付できる機能の実装

---

## 🛠️ 使用技術

### バックエンド
| 技術 | バージョン |
|------|-----------|
| **Java** | 21 |
| **Spring Boot** | 3.5.5 |
| **MySQL** | 8.0 |
| **MyBatis** | 3.0.3 |
| **Spring Security** | 6.2.0 |

### フロントエンド
| 技術 | バージョン |
|------|-----------|
| **React** | 18.2.0 |
| **TypeScript** | 5.0.2 |
| **FullCalendar.js** | 6.1.8 |
| **Axios** | 1.4.0 |

### インフラ
- **Heroku**（本番環境デプロイ）
- **GitHub Actions**（CI/CD）

---

## ✨ 実装機能

### Todo機能
- ✅ Todo登録・編集・削除
- ✅ 完了/未完了の切り替え
- ✅ 優先度設定（高/中/低）
- ✅ 期限設定・期限切れアラート
- ✅ カテゴリ分類（仕事/プライベート/学習など）

### 日記機能
- ✅ 日記投稿・編集・削除
- ✅ 写真添付機能（最大3枚）
- ✅ Markdown記法対応
- ✅ タグ付け機能
- ✅ 検索機能（タイトル・本文・タグで検索）

### カレンダー機能
- ✅ 月表示でのTodo・日記一覧
- ✅ 日付クリックで当日のTodo・日記を表示
- ✅ ドラッグ&ドロップでTodoの日付変更
- ✅ 色分け表示（完了/未完了/優先度別）

---

## 🔧 工夫した点

### 1. フロントエンドとバックエンドの完全分離
```javascript
// React側：REST APIでデータ取得
useEffect(() => {
  axios.get('/api/todos')
    .then(response => setTodos(response.data))
    .catch(error => console.error(error));
}, []);
```

```java
// Spring Boot側：REST APIエンドポイント
@RestController
@RequestMapping("/api/todos")
public class TodoController {
    
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.findAll();
    }
    
    @PostMapping
    public Todo createTodo(@RequestBody TodoForm form) {
        return todoService.create(form);
    }
}
```
- RESTful APIの設計により、フロントエンドとバックエンドを独立させた
- 将来的にモバイルアプリを開発する際も、同じAPIを使い回せる設計

### 2. React Hooksを使った効率的な状態管理
```javascript
const [todos, setTodos] = useState([]);
const [filter, setFilter] = useState('all'); // all / active / completed

// フィルタリング処理
const filteredTodos = todos.filter(todo => {
  if (filter === 'active') return !todo.completed;
  if (filter === 'completed') return todo.completed;
  return true;
});
```
- `useState`でTodoリスト・フィルター状態を管理
- `useEffect`でデータ取得・副作用処理を実装
- カスタムフックで共通ロジックを再利用

### 3. FullCalendar.jsを使った直感的なUI設計
```javascript
<FullCalendar
  plugins={[dayGridPlugin, interactionPlugin]}
  initialView="dayGridMonth"
  events={events}
  eventClick={handleEventClick}
  dateClick={handleDateClick}
  locale="ja"
/>
```
- カレンダーライブラリを活用し、実装コストを削減
- イベントクリック・日付クリックで詳細情報をモーダル表示
- ドラッグ&ドロップでTodoの日付変更を実装

### 4. 画像アップロード機能の実装
```java
@PostMapping("/api/diaries")
public Diary createDiary(
    @RequestPart("diary") DiaryForm form,
    @RequestPart(value = "images", required = false) List<MultipartFile> images
) {
    return diaryService.create(form, images);
}
```
- `MultipartFile`で画像ファイルを受け取り
- ファイル名の重複を防ぐためUUID付与
- 画像はサーバーの`static/images`に保存

### 5. TypeScriptによる型安全性の確保
```typescript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

interface TodoFormProps {
  onSubmit: (todo: Todo) => void;
  initialValue?: Todo;
}
```
- TypeScriptで型定義を徹底し、バグを未然に防止
- Propsの型チェックでコンポーネントの品質向上

---

## 📂 ディレクトリ構成

### バックエンド（Spring Boot）
```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/mamolog/
│   │   │       ├── controller/    # REST APIエンドポイント
│   │   │       │   ├── TodoController.java
│   │   │       │   └── DiaryController.java
│   │   │       ├── service/        # ビジネスロジック
│   │   │       │   ├── TodoService.java
│   │   │       │   └── DiaryService.java
│   │   │       ├── repository/     # データアクセス
│   │   │       │   ├── TodoRepository.java
│   │   │       │   └── DiaryRepository.java
│   │   │       ├── entity/         # エンティティ
│   │   │       │   ├── Todo.java
│   │   │       │   └── Diary.java
│   │   │       └── form/           # フォームクラス
│   │   │           ├── TodoForm.java
│   │   │           └── DiaryForm.java
│   │   └── resources/
│   │       ├── mapper/             # MyBatis XMLマッパー
│   │       ├── static/             # 画像保存先
│   │       └── application.properties
```

### フロントエンド（React）
```
frontend/
├── src/
│   ├── components/         # Reactコンポーネント
│   │   ├── TodoList.tsx
│   │   ├── TodoForm.tsx
│   │   ├── DiaryList.tsx
│   │   ├── DiaryForm.tsx
│   │   └── Calendar.tsx
│   ├── hooks/              # カスタムフック
│   │   ├── useTodos.ts
│   │   └── useDiaries.ts
│   ├── types/              # 型定義
│   │   ├── todo.ts
│   │   └── diary.ts
│   ├── api/                # API通信
│   │   ├── todoApi.ts
│   │   └── diaryApi.ts
│   ├── App.tsx
│   └── index.tsx
```

---

## 🚀 デプロイ
**Herokuで公開中**：https://mamolog-2025-8bc113ca827d.herokuapp.com/

### テストアカウント
- **Email**: papa@mamolog.com
- **Password**: password

---

## 🔍 データベース設計

### todos（Todo）
| カラム名 | 型 | 説明 |
|---------|-------|------|
| id | INT | 主キー |
| user_id | INT | ユーザーID（外部キー） |
| title | VARCHAR | タイトル |
| completed | BOOLEAN | 完了フラグ |
| priority | ENUM | 優先度（high/medium/low） |
| due_date | DATE | 期限 |
| category | VARCHAR | カテゴリ |

### diaries（日記）
| カラム名 | 型 | 説明 |
|---------|-------|------|
| id | INT | 主キー |
| user_id | INT | ユーザーID（外部キー） |
| title | VARCHAR | タイトル |
| content | TEXT | 本文（Markdown） |
| date | DATE | 日付 |
| image_path_1 | VARCHAR | 画像1のパス |
| image_path_2 | VARCHAR | 画像2のパス |
| image_path_3 | VARCHAR | 画像3のパス |

### diary_tags（日記タグ）
| カラム名 | 型 | 説明 |
|---------|-------|------|
| diary_id | INT | 日記ID（外部キー） |
| tag | VARCHAR | タグ名 |

---

## 📌 今後の実装予定
- [ ] **React版へのフルリファクタリング**（現在進行中）
- [ ] PWA化（オフラインでも使える）
- [ ] リマインダー通知機能（Todo期限のプッシュ通知）
- [ ] 日記のエクスポート機能（PDF/Markdown）
- [ ] AIによる日記の感情分析
- [ ] ダークモード対応

---

## 🎓 学んだこと
1. **REST API設計の実践**  
   RESTfulな設計原則に基づくエンドポイント設計

2. **React Hooksの深い理解**  
   `useState`/`useEffect`/`useContext`の使い分け

3. **TypeScriptによる型安全性**  
   型定義でバグを未然に防ぐ開発スタイル

4. **SPAのパフォーマンス最適化**  
   不要な再レンダリングを防ぐ`useMemo`/`useCallback`の活用

5. **画像処理の実装**  
   ファイルアップロード・保存・表示の一連の流れ

---

## 📧 Contact
質問・フィードバックは以下までお願いします：
- **GitHub**: https://github.com/atakuya-12915
- **Email**: atakuya.wan@gmail.com

---

## 📄 License
このプロジェクトは学習目的で作成されたものです。商用利用は禁止します。