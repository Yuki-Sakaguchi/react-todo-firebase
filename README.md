# React + FirebaseでTODOを作る
https://qiita.com/mooriii/items/758c469dc176d542fdd2#firestore%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E6%B0%B8%E7%B6%9A%E5%8C%96%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B

# 実装
```
npm start
```

```
npm run build
firebase deploy
```

# style
- Material UI
- styled-components

# DEMO
https://todolist-402ab.firebaseapp.com

# 勉強するもの
## React
- [x] useEffectの第２引数

## Firebase-cli
- [x] firebase login
- [x] firebase init
- [x] firebase deploy

## Firebase
- [x] firebase.firestore()
- [x] db.collection()
  - [x] get()
  - [x] update()

# やってないけどやりたいこと
- [ ] gmailアカウントログイン

---

# React
## useEffect
- 第２引数を渡さないと毎回描画後に実行される
- useEffectでreturnした関数はコンポーネントがアンマウントされる時に実行される
  - classで書いていた時の`componentDidMount`と`componentWillUnmount`みたいなもの
- 第2引数は配列を受け取る
  - 配列には値を渡すことができる
  - その値が前回実行時と異なる時だけ実行されるようになる
  - 値が変わっていなければスキップされるので、変更されるであろうstate, propsの値を想定している
  - 初回のマウント、アンマウントの時だけ実行させたいときは`[]`を渡す
  - 配列には複数値を入れることができ、どれか一つでの変わっていれば実行される

## 設定ファイルの`.env`化
- `create-react-app`で作ったプロジェクトだと`.env`を作るだけで勝手に読み取ってくれるらしい
- 変数名の頭には`REACT_APP`をつけないといけないみたい
- firebaseのデプロイでも対応するために参考にした記事
  - https://qiita.com/babie/items/a90f479298fb3997549c

# Firebase CLI
基本、ここ見ればわかる
https://firebase.google.com/docs/cli?hl=ja

## firebase login
- コマンドラインからFirebaseのプロジェクトにアクセスするための認証
- これをやることで

## firebase init
- Firebaseのプロジェクトへのデプロイなどのタスクを行うためのプロジェクトの初期化
- `firebase.json`が作られたりと、プロジェクトがFirebaseを使うための準備
- `firebase init`コマンドでは新規ディレクトリは作られないので、存在するディレクトリ上でコマンドを叩く

## firebase deploy
- `firebase.json`が必要
- 設定をしないとプロジェクト全てのものがリリースされてしまうので、部分デプロイをするのも検討する


# Firebase
## firebase.firestore
- `Cloud Firestore`の機能を使う時のやつ
- `firebase.initializeApp({})`で作ったいスタンスのfirestoreにアクセスするための関数

## db.collection()
- firestore上のコレクションを指定して取得する
- 今回の場合は`todolist`という名前のコレクションを取得した

## get()
- 引数なしで使うとコレクションの全体が取得できる
- promiseで動いているので、thenで繋いで取得したデータを操作する

## update()
- 他の子ノードを上書きすることなく、特定の複数の子を同時に書き込む
- 