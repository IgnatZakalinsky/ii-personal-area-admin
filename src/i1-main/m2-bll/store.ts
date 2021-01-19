import thunkMiddleware from 'redux-thunk'
import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from './appReducer'
import {playlistsReducer} from '../../i2-features/f1-playlists/p2-bll/playlistsReducer'

const reducers = combineReducers({
    app: appReducer,
    playlists: playlistsReducer,

})

const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for developers


