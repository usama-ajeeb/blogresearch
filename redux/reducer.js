import {
  HTAGS_LIST_FAILED,
  HTAGS_LIST_REQUEST,
  HTAGS_LIST_SUCESS,
} from './constants'

export const HtagsList = (state = { data: null }, action) => {
  switch (action.type) {
    case HTAGS_LIST_REQUEST:
      return { loading: true, data: [] }
    case HTAGS_LIST_SUCESS:
      return { loading: false, data: action.payload }
    case HTAGS_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
