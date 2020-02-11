import firebase from 'firebase'
import 'firebase/firestore'

import { connect } from 'react-redux'
import { loginAction, logoutAction } from '../actions/Auth'
import App from '../components/App'


const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },

    refLogin (noUserCallback) {
      const db = firebase.firestore()
      firebase.auth().onAuthStateChanged(async user => {
        console.log(user)
        if (!user) {
          noUserCallback()
          return false;
        }
        // 対象のコレクションがなければ作る
        const collection = await db.collection('todolist').doc(user.uid).get();
        if (!collection.exists) {
          db.collection('todolist').doc(user.uid).set({
            todo: {
              tasks: []
            },
            finishedTodo: {
              tasks: []
            },
          })
        }
        dispatch(loginAction(user))
      })
    },

    logout () {
      firebase.auth().signOut()
      dispatch(logoutAction())
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer