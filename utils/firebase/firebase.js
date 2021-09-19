import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBmRxZlhTcEGpjBUSlm-mRBPf8xN_ywsnk',
  authDomain: 'blogresearch-c5bc2.firebaseapp.com',
  projectId: 'blogresearch-c5bc2',
  storageBucket: 'blogresearch-c5bc2.appspot.com',
  messagingSenderId: '267504451100',
  appId: '1:267504451100:web:b1b8dd9ba3e4881bad69d9',
  measurementId: 'G-55BT3H4Y2R',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }

export default db
