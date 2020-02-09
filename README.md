# React + FirebaseでTODOを作る
https://qiita.com/mooriii/items/758c469dc176d542fdd2#firestore%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E6%B0%B8%E7%B6%9A%E5%8C%96%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B

# style
- Material UI
- styled-components

# DEMO
https://todolist-402ab.firebaseapp.com

# 勉強するもの
## React
- [x] useEffectの第２引数

## Firebase-cli
- [ ] firebase login
- [ ] firebase init
- [ ] firebase deploy

## Firebase
- [ ] firebase.firestore
- [ ] db.collection
  - [ ] get()
  - [ ] update()

# やってないけどやりたいこと
- [ ] gmailアカウントログイン

---

# useEffect
- 第２引数を渡さないと毎回描画後に実行される
- useEffectでreturnした関数はコンポーネントがアンマウントされる時に実行される
  - classで書いていた時の`componentDidMount`と`componentWillUnmount`みたいなもの
- 第2引数は配列を受け取る
  - 配列には値を渡すことができる
  - その値が前回実行時と異なる時だけ実行されるようになる
  - 値が変わっていなければスキップされるので、変更されるであろうstate, propsの値を想定している
  - 初回のマウント、アンマウントの時だけ実行させたいときは`[]`を渡す
  - 配列には複数値を入れることができ、どれか一つでの変わっていれば実行される
