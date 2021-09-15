import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// import { HtagsList } from './redux/reducers/HtagsReducer'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { HtagsList } from './redux/reducer'

const persistConfig = {
  key: 'root',
  // storage: storage,
  storage: storage,
}

const reducer = combineReducers({
  Htags: HtagsList,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const initialState = {}

const middleware = [thunk]

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

const persistor = persistStore(store)

export { store, persistor }
