import {
  HTAGS_LIST_FAILED,
  HTAGS_LIST_REQUEST,
  HTAGS_LIST_SUCESS,
  LOGIN_SUCCESS,
} from './constants'
import db, { auth, provider } from '../utils/firebase/firebase'

// import axios from '../../axios/index'

export const HtagsAction = (keyword, country) => async (dispatch) => {
  try {
    dispatch({ type: HTAGS_LIST_REQUEST })

    const response = await fetch(
      `https://us-central1-blogresearch-c5bc2.cloudfunctions.net/api/blog`,
      {
        method: 'POST',
        body: JSON.stringify({ keyword: keyword, country: country.name }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    dispatch({
      type: HTAGS_LIST_SUCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: HTAGS_LIST_FAILED,
      payload: error.message,
    })
  }
}

export const loginAction = () => async (dispatch) => {
  try {
    const { user } = await auth.signInWithPopup(provider)

    // test
    const emails = []
    db.collection('users').onSnapshot((snapshot) =>
      snapshot.docs.map(async (i) => emails.push(i.data().email))
    )
    console.log(emails)

    setTimeout(() => {
      if (!emails.includes(user.email)) {
        db.collection('users')
          .add({
            email: user.email,
            name: user.displayName,
            credits: 3,
            uid: user.uid,
            docId: null,
          })
          .then((i) => db.collection('users').doc(i.id).update({ docId: i.id }))
      }
    }, 1000)

    // endTest

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    })
  } catch (error) {
    console.log(error.message)
  }
}
