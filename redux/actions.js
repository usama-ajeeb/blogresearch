import {
  CREDITS_FETCH,
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
      // `api/urls`,
      {
        method: 'POST',
        body: JSON.stringify({ keyword: keyword, country: country.name }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    //
    const creditsRef = db.collection('users')
    let allCredits = await creditsRef.get()
    const id = allCredits.docs
      .map((i) => i.data())
      .filter((i) => i.uid?.includes(auth.currentUser.uid))
      .map((i) => i.docId)

    const credits = allCredits.docs
      .map((i) => i.data())
      .filter((i) => i.uid?.includes(auth.currentUser.uid))
      .map((i) => i.credits)

    await db
      .collection('users')
      .doc(String(id))
      .update({ credits: credits - 1 })
    // end

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

    setTimeout(() => {
      if (!emails.includes(user.email)) {
        db.collection('users')
          .add({
            email: user.email,
            name: user.displayName,
            credits: 15,
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

export const creditsAction = () => async (dispatch) => {
  try {
    const creditsRef = db.collection('users')
    let allCredits = await creditsRef.get()
    const credits = allCredits.docs
      .map((i) => i.data())
      .filter((i) => i.uid?.includes(auth.currentUser.uid))
      .map((i) => i.credits)

    dispatch({
      type: CREDITS_FETCH,
      payload: credits,
    })
  } catch (error) {}
}
