/**
 * 認証
 */
import { LOGIN, LOGOUT } from '../actions/Auth'

const initialState = {
  user: null
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

export default auth