import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppStoreType} from './store'
import {MainAPI} from '../m3-dal/MainAPI'
import {message} from 'antd'
import {thunkTryCatch} from "./helpers";
// import {LoginAPI} from '../../i2-features/f1-login/l3-dal/LoginAPI'

const defUser: UserType = {
    id: 0,
    level: 0,
    telegramId: 700000000,
    lastUpdateDate: '2020-12-30T10:09:01.0488913Z',
    inactive: false,
    courseId: 1,
    courseTitle: 'Front-end developer',
    firstName: 'Fake',
    lastName: 'Anonymous',
    isAdmin: false,
}

// < {answer}, {params}, {rejectValue {in catch}}>
// export const someThunk = createAsyncThunk<{ z: number }, { x: number }, { rejectValue: { y: number } }>(
//     'app/someThunk',
//     async (payload, thunkAPI
//     ) => {
//         // thunkAPI.getState() as AppStoreType
//         // thunkAPI.dispatch(setX(payload))
//
//         try {
//             const p = await new Promise<{ z: number }>(((res, rej) => {
//                 if (payload.x < 10) res({z: payload.x})
//
//                 rej({z: payload.x})
//             }))
//
//             // thunkAPI.dispatch(someThunk.fulfilled({z: 1}, 'reqId', {x: 1}))
//
//             return p
//             // return {z: 1}
//         } catch (er) {
//
//             console.log('er', {...er}, er)
//             return thunkAPI.rejectWithValue({y: payload.x})
//         }
//     }
// )
export const loginThunk = createAsyncThunk<{ user: UserType }, void, { rejectValue: { error: string } }>(
    'app/loginThunk',
    async (payload, thunkAPI
    ) => {
        return thunkTryCatch(thunkAPI, async () => {
            const {token} = await MainAPI.login()
            message.success('Login ok')

            // const p = await MainAPI.me(token)
            const p = {user: defUser}

            thunkAPI.dispatch(appActions.setVerified({isVerified: true, user: p.user}))

            return p
        })
    }
)
// export const meThunk = createAsyncThunk<{ error?: string }, void, { rejectValue: void }>(
//     'app/meThunk',
//     async (payload, thunkAPI
//     ) => {
//         thunkAPI.dispatch(appActions.setLoading({isLoading: true}))
//
//         try {
//             const p = await LoginAPI.me()
//
//             thunkAPI.dispatch(appActions.setVerified({isVerified: true, user: p.user}))
//
//             return p
//         } catch (er) {
//             const error = er.response ? er.response.data.error : (er.message + ', more details in the console')
//             thunkAPI.dispatch(meThunk.fulfilled({error}, 'xzId2'))
//
//             console.log('er', {...er}, er)
//             console.log('error:', error)
//             return thunkAPI.rejectWithValue()
//         }
//     }
// )
// export const logoutThunk = createAsyncThunk<{ error?: string }, void, { rejectValue: void }>(
//     'app/logoutThunk',
//     async (payload, thunkAPI
//     ) => {
//         thunkAPI.dispatch(appActions.setLoading({isLoading: true}))
//
//         try {
//             const p = await LoginAPI.logout()
//
//             thunkAPI.dispatch(appActions.setVerified({isVerified: false, user: defUser}))
//
//             return p
//         } catch (er) {
//             const error = er.response ? er.response.data.error : (er.message + ', more details in the console')
//             thunkAPI.dispatch(meThunk.fulfilled({error}, 'xzId3'))
//
//             console.log('er', {...er}, er)
//             console.log('error:', error)
//             return thunkAPI.rejectWithValue()
//         }
//     }
// )

export type UserType = {
    id: number // 3,
    level: number // 0,
    telegramId: number // 700000000,
    lastUpdateDate: string // '2020-12-30T10:09:01.0488913Z',
    inactive: boolean // false,
    courseId: number // 1,
    courseTitle: string // 'Front-end developer',
    firstName: string // 'Игн',
    lastName: string // 'Зак'
    isAdmin: boolean
}

const slice = createSlice({
    name: 'app',
    initialState: {
        // isAuth: false,
        error: '',
        isVerified: false,
        user: defUser,
        // x: 1, y: 2, z: 3,
        isLoading: false,
    },
    reducers: {
        // setAuth: (state, action: PayloadAction<{ isAuth: boolean }>) => {
        //     state.isAuth = action.payload.isAuth
        // },
        setVerified: (
            state,
            action: PayloadAction<{ isVerified: boolean, user: UserType, error?: string }>
        ) => {
            // state.isAuth = action.payload.isVerified
            state.isVerified = action.payload.isVerified
            state.isLoading = false
            state.user = action.payload.user
            state.error = action.payload.error || ''
        },
        // setX: (state, action: PayloadAction<{ x: number }>) => {
        //     state.x = action.payload.x
        // },
        setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading
            state.error = ''
        }

    },
    // extraReducers: (builder) => {
    //     builder
    //         // .addCase(
    //         //     someThunk.fulfilled,
    //         //     (state, action) => {
    //         //         state.z = action.payload.z
    //         //     }
    //         // )
    //         // .addCase(
    //         //     meThunk.rejected,
    //         //     (state, action) => {
    //         //         if (action.payload) {
    //         //             state.error = action.payload.error || ''
    //         //         }
    //         //         state.isLoading = false
    //         //     }
    //         // )
    //
    // },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
// export const someThunkRej = someThunk.rejected
export const appThunks = {
    loginThunk,
    // someThunk,  logoutThunk
}

export const selectApp = (state: AppStoreType) => state.app
