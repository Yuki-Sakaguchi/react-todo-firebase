export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const loginAction = (user) => {
  return {
    type: LOGIN,
    payload: {
      user: user
    }
  }
}

export const logoutAction = () => {
  return {
    type: LOGOUT
  }
}