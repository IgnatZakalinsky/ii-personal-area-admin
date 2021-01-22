import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppStoreType} from '../../../i1-main/m2-bll/store'
import {PlaylistsAPI, PlaylistType, MockPlaylistsAPI} from '../p3-dal/PlaylistsAPI'
import {appActions} from '../../../i1-main/m2-bll/appReducer'
import {message} from "antd";
import {thunkTryCatch} from "../../../i1-main/m2-bll/helpers";

export type GetPlaylistsType = {
    playlists: PlaylistType[]
    playlistsTotalCount: number
}

// < {answer}, {params}, {rejectValue {in catch}}>
export const getPlaylists = createAsyncThunk<GetPlaylistsType, {}, { rejectValue: { error: string } }>(
    'playlists/getPlaylists',
    async (payload, thunkAPI
    ) => {
        // thunkAPI.getState() as AppStoreType
        return thunkTryCatch(thunkAPI, async () => {
            const p = await PlaylistsAPI.getAll()
            // const p = await MockPlaylistsAPI.getAll()

            thunkAPI.dispatch(appActions.setLoading({isLoading: false}))

            return p
        })
    }
)
export const addPlaylist = createAsyncThunk<{}, {}, { rejectValue: { error: string } }>(
    'playlists/addPlaylist',
    async (payload, thunkAPI
    ) => {
        return thunkTryCatch(thunkAPI, async () => {
            await PlaylistsAPI.add(undefined)
            message.success('add playlist - ok')

            thunkAPI.dispatch(getPlaylists({}))

            return;
        })
    }
)
// export const deletePlaylist = createAsyncThunk<{}, {id: string}, { rejectValue: { error: any } }>(
//     'playlists/deletePlaylist',
//     async (payload, thunkAPI
//     ) => {
//         thunkAPI.dispatch(appActions.setLoading({isLoading: true}))
//         try {
//             await PlaylistsAPI.delete(payload.id)
//
//
//             thunkAPI.dispatch(getPlaylists({}))
//
//             return;
//         } catch (e) {
//             const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
//
//             console.log('Nya, ' + 'playlists' + ' Error!', {...e})
//
//             console.log('error: ', error)
//             thunkAPI.dispatch(appActions.setLoading({isLoading: false}))
//             return thunkAPI.rejectWithValue({error: error})
//         }
//     })
// export const updatePlaylist = createAsyncThunk<{}, {id: string}, { rejectValue: { error: any } }>(
//     'playlists/updatePlaylist',
//     async (payload, thunkAPI
//     ) => {
//         thunkAPI.dispatch(appActions.setLoading({isLoading: true}))
//         try {
//             await PlaylistsAPI.update(payload.id)
//
//
//             thunkAPI.dispatch(getPlaylists({}))
//
//             return;
//         } catch (e) {
//             const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
//
//             console.log('Nya, ' + 'playlists' + ' Error!', {...e})
//
//             console.log('error: ', error)
//             thunkAPI.dispatch(appActions.setLoading({isLoading: false}))
//             return thunkAPI.rejectWithValue({error: error})
//         }
//     })

const slice = createSlice({
    name: 'playlists',
    initialState: {
        playlists: [] as PlaylistType[],
        playlistsTotalCount: 0,

    },
    reducers: {
        // setX: (state, action: PayloadAction<{ x: number }>) => {
        //     state.x = action.payload.x
        // },

    },
    // extraReducers: {
    //     // 'blabla': state => {},
    //     // [someAC.type]: state => {},
    // },
    extraReducers: (builder) => {
        // builder.addCase(setX, (state, action) => {
        //     state.y = action.payload.x
        // })

        builder
            .addCase(
                getPlaylists.fulfilled,
                (state, action) => {
                    state.playlists = action.payload.playlists
                    state.playlistsTotalCount = action.payload.playlistsTotalCount
                }
            )
        // .addCase() ...

    },
})

export const playlistsReducer = slice.reducer
export const playlistsActions = slice.actions
export const playlistsThunks = {
    getPlaylists, addPlaylist,
    // deletePlaylist, updatePlaylist
}
// export const someThunkRej = someThunk.rejected
// export const appThunks = {someThunk}
//
export const selectPlaylists = (state: AppStoreType) => state.playlists
