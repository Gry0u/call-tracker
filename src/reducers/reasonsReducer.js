import {
  ADD_REASON,
  FETCH_REASONS
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_REASON:
      return { ...state, ...action.payload }
    case FETCH_REASONS:
      return {...state, ...action.payload }
    default:
      return state
  }
}
