# 桜のこもれびキッズランド HP

日本全国の認証・認可保育園「桜のこもれびキッズランド」のコーポレートサイトです。(仮)

## 技術スタック

- **フレームワーク**: [Nuxt 4](https://nuxt.com/) (Vue 3)
- **スタイル**: SCSS (Sass)
- **バックエンド**: Firebase (Firestore)
- **テスト**: Vitest + @nuxt/test-utils
- **デプロイ**: Vercel

## ページ構成

| パス | ページ名 |
|---|---|
| `/` | トップ |
| `/about` | わたしたちのこと |
| `/introduction` | 各園のご紹介 |
| `/introduction/[id]` | 各園詳細 |
| `/letter` | こもれびだより一覧 |
| `/letter/[id]` | こもれびだより詳細 |
| `/info` | お知らせ一覧 |
| `/info/[id]` | お知らせ詳細 |
| `/recruit` | 採用情報 |
| `/contact` | お問い合わせ |
| `/privacy` | プライバシーポリシー |
| `/admin` | 管理者画面（URLから直接アクセス） |

## セットアップ

### 環境変数

プロジェクトルートに `.env` ファイルを作成し、以下を設定してください。

```env
NUXT_PUBLIC_FIREBASE_API_KEY=
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NUXT_PUBLIC_FIREBASE_PROJECT_ID=
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NUXT_PUBLIC_FIREBASE_APP_ID=
```

### インストール

```bash
npm install
```

## 開発

```bash
npm run dev
```

`http://localhost:3000` で開発サーバーが起動します。

## ビルド・プレビュー

```bash
# 本番ビルド
npm run build

# ローカルでプレビュー
npm run preview
```

## テスト

```bash
npx vitest
```

## 管理者画面

`/admin` にアクセスするとログイン画面が表示されます。サイト内のナビゲーションからはアクセスできません。

管理者画面でできること:

- お知らせの投稿・編集
- こもれびだよりの投稿・編集
- 各園情報の投稿・編集
- タグの編集
