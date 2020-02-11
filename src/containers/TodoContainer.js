import { connect } from 'react-redux'
import Todo from '../components/Todo/'

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const TodoContainer = connect(
  mapStateToProps,
)(Todo)

export default TodoContainer