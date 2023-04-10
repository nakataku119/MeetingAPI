1on1やチームミーティングの調整を行うための社内ツールのバックエンド。

## 使用技術
- Express
- TypeScript
- MySQL
- Auth0
- AWS
- Docker

## 機能概要
- フロントからデータを受け取り、データの作成、更新、削除機能。

## 実装で学んだことや苦労したこと、工夫したこと
- DockerでExpressとMySQLの環境構築
- `userId.ts`でリクエストヘッダーのアクセストークンを解析しユーザーIDを取得、キャッシュにセットする処理を共通化。
- AWS Elastic Beanstalk へデプロイ、GithubActions で自動化。
