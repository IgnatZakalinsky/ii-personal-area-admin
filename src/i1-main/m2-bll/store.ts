import thunkMiddleware from 'redux-thunk'
import {combineReducers} from 'redux'
import {appReducer} from './appReducer'
import {configureStore} from '@reduxjs/toolkit'

const reducers = combineReducers({
    app: appReducer,

})

const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for developers


