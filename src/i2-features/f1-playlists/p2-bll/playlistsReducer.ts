import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppStoreType} from '../../../i1-main/m2-bll/store'
import {PlaylistsAPI, PlaylistType, ForCreatePlaylistType} from '../p3-dal/PlaylistsAPI'
import {appActions} from '../../../i1-main/m2-bll/appReducer'
import {message} from 'antd'
import {thunkTryCatch} from '../../../i1-main/m2-bll/helpers'

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
            const {playlists} = thunkAPI.getState() as AppStoreType
            const {itemForPageCount, pageNumber, sort, levelAccess, tags, name} = playlists

            const p = await PlaylistsAPI.getAll(itemForPageCount, pageNumber, sort, {levelAccess, tags, name})
            // const p = await MockPlaylistsAPI.getAll()

            thunkAPI.dispatch(appActions.setLoading({isLoading: false}))

            return p
        })
    }
)
export const addPlaylist = createAsyncThunk<{}, { playlist: ForCreatePlaylistType }, { rejectValue: { error: string } }>(
    'playlists/addPlaylist',
    async (payload, thunkAPI
    ) => {
        return thunkTryCatch(thunkAPI, async () => {
            await PlaylistsAPI.add(payload.playlist)
            message.success('add playlist - ok')

            thunkAPI.dispatch(getPlaylists({}))

            return;
        })
    }
)
export const deletePlaylist = createAsyncThunk<{}, { id: string }, { rejectValue: { error: any } }>(
    'playlists/deletePlaylist',
    async (payload, thunkAPI
    ) => {
        return thunkTryCatch(thunkAPI, async () => {
            await PlaylistsAPI.delete(payload.id)


            thunkAPI.dispatch(getPlaylists({}))

            return;
        })
    }
)
export const updatePlaylist = createAsyncThunk<{}, { playlist: PlaylistType }, { rejectValue: { error: any } }>(
    'playlists/updatePlaylist',
    async (payload, thunkAPI
    ) => {
        return thunkTryCatch(thunkAPI, async () => {
            await PlaylistsAPI.update(payload.playlist)

            thunkAPI.dispatch(getPlaylists({}))

            return;
        })
    }
)

const slice = createSlice({
    name: 'playlists',
    initialState: {
        playlists: [] as PlaylistType[],
        playlistsTotalCount: 0,
        itemForPageCount: 7,
        pageNumber: 1,
        sort: '0updated',
        name: '',
        tags: [] as string[],
        levelAccess: 100,
    },
    reducers: {
        // setX: (state, action: PayloadAction<{ x: number }>) => {
        //     state.x = action.payload.x
        // },
        setPagination: (state, action: PayloadAction<{ pageNumber: number, itemForPageCount: number }>) => {
            state.itemForPageCount = action.payload.itemForPageCount
            state.pageNumber = action.payload.pageNumber
        },
        setSort: (state, action: PayloadAction<{ sort: string }>) => {
            state.sort = action.payload.sort
        },
        setName: (state, action: PayloadAction<{ name: string }>) => {
            state.name = action.payload.name
        },
        setTags: (state, action: PayloadAction<{ tags: string[] }>) => {
            state.tags = action.payload.tags
        },
        setLevelAccess: (state, action: PayloadAction<{ levelAccess: number }>) => {
            state.levelAccess = action.payload.levelAccess
        },

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
export const playlistsThunks = {getPlaylists, addPlaylist, deletePlaylist, updatePlaylist}
// export const someThunkRej = someThunk.rejected

export const selectPlaylists = (state: AppStoreType) => state.playlists
