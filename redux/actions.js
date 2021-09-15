import {
  HTAGS_LIST_FAILED,
  HTAGS_LIST_REQUEST,
  HTAGS_LIST_SUCESS,
} from './constants'

// import axios from '../../axios/index'

export const HtagsAction = (keyword, country) => async (dispatch) => {
  try {
    dispatch({ type: HTAGS_LIST_REQUEST })

    const response = await fetch(`/api/urls`, {
      method: 'POST',
      body: JSON.stringify({ keyword: keyword, country: country.name }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

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
