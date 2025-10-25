# NAGOYAMESHI

## 📸 スクリーンショット
（トップ画面、検索画面、レビュー投稿画面のキャプチャを配置）

## 📝 概要
食べログ風のレストラン検索・レビュー投稿アプリです。
「ユーザーが飲食店を探しやすく、信頼できるレビューを投稿できる仕組み」を目指しました。

## 🎯 制作背景
- Spring Bootでの認証機能実装を学ぶため
- 複雑なデータベース設計（多対多リレーション）の実践
- 実務で使えるレベルのCRUD操作を習得

## 🛠️ 使用技術
- Java 17
- Spring Boot 3.2.0
- MySQL 8.0
- Thymeleaf
- Spring Security
- MyBatis

## ✨ 実装機能
### 一般ユーザー
- 会員登録・ログイン認証
- レストラン検索（エリア・価格帯・評価での絞り込み）
- レビュー投稿・編集・削除
- お気に入り登録

### 管理者
- レストラン情報のCRUD操作
- ユーザー管理
- レビューの承認・削除

## 🔧 工夫した点
### 1. MyBatisでの複雑なJOIN処理
複数テーブルを結合した検索クエリを実装。
エリア・価格帯・評価の3条件での動的SQL生成。

### 2. Spring Securityでのロール別アクセス制御
一般ユーザーと管理者で表示内容・操作権限を分離。
認証情報をセッションで管理し、不正アクセスを防止。

### 3. Thymeleafでの動的UI生成
検索条件に応じて表示内容を切り替え。
ページネーション実装で大量データにも対応。

## 📂 ディレクトリ構成

src/ ├── main/ │ ├── java/ │ │ └── com/example/nagoyameshi/ │ │ ├── controller/ # コントローラー層 │ │ ├── service/ # ビジネスロジック層 │ │ ├── repository/ # データアクセス層 │ │ ├── entity/ # エンティティ │ │ └── form/ # フォームクラス │ └── resources/ │ ├── templates/ # Thymeleafテンプレート │ ├── static/ # CSS/JS/画像 │ └── application.properties

## 🚀 デプロイ
Herokuで公開中: https://nagoyameshi-app-2025-6a8adc2eb863.herokuapp.com/

### テストアカウント
- 一般ユーザー: samuraitaro.samurai@example.com / password
- 管理者: admin@example.com / password

## 📌 今後の実装予定
- [ ] レビューへの返信機能
- [ ] レストランの写真アップロード
- [ ] お気に入りレストランのメール通知

