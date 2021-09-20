import db, { auth, provider } from '../utils/firebase/firebase'
import {
  CREDITS_FETCH,
  HTAGS_LIST_FAILED,
  HTAGS_LIST_REQUEST,
  HTAGS_LIST_SUCESS,
  LOGIN_SUCCESS,
  UPDATE_CREDIT_SUCCESS,
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

export const logIn = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { userInfo: action.payload }

    default:
      return state
  }
}

export const fetchCredits = (state = { credits: null }, action) => {
  switch (action.type) {
    case CREDITS_FETCH:
      return { credits: action.payload }
    default:
      return state
  }
}

// test

export const updateCredits = (
  state = {
    updatedCredits: null,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_CREDIT_SUCCESS:
      return { updatedCredits: action.payload }
    default:
      return state
  }
}
