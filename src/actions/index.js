import firebase from '../firebase'

import {
  SIGN_IN,
  SIGN_OUT,
  ADD_REASON,
  FETCH_REASONS
} from './types'

const databaseRef = firebase.database().ref()

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  }
}

export const signOut = (userId) => {
  return {
    type: SIGN_OUT,
  }
}

export const addReason = formValues => async dispatch => {
  await databaseRef.push(formValues)
  dispatch({ type: ADD_REASON })
}

export const fetchReasons = () => async dispatch => {
  databaseRef.on('value', (snapshot) => {
    dispatch({ type: FETCH_REASONS, payload: snapshot.val() })
  })
}
