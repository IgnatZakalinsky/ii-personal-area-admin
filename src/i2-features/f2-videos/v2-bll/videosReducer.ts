import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppStoreType} from '../../../i1-main/m2-bll/store'
import {appActions} from '../../../i1-main/m2-bll/appReducer'
import {message} from 'antd'
import {thunkTryCatch} from '../../../i1-main/m2-bll/helpers'
import {ForCreateVideoType, VideosAPI, VideoType} from '../v3-dal/VideosAPI'

export type GetVideosType = {
    videos: VideoType[]
    videosTotalCount: number
}

// < {answer}, {params}, {rejectValue {in catch}}>
export const getVideos = createAsyncThunk<GetVideosType, {}, { rejectValue: { error: string } }>(
    'videos/getVideos',
    async (payload, thunkAPI
    ) => {
        return thunkTryCatch(thunkAPI, async () => {
            const {videos} = thunkAPI.getState() as AppStoreType
            const {itemForPageCount, pageNumber, sort, levelAccess, tags, name, playlistId} = videos

            const p = await VideosAPI.getAll(
                itemForPageCount, pageNumber, sort,
                {levelAccess, tags, name, playlistId}
            )

            thunkAPI.dispatch(appActions.setLoading({isLoading: false}))

            return p
        })
    }
)
export const addVideo = createAsyncThunk<{}, { video: ForCreateVideoType }, { rejectValue: { error: string } }>(
    'videos/addVideo',
    async (payload, thunkAPI
    ) => {
        return thunkTryCatch(thunkAPI, async () => {
            await VideosAPI.add(payload.video)
            message.success('add video - ok')

            thunkAPI.dispatch(getVideos({}))

            return;
        })
    }
)
export const deleteVideo = createAsyncThunk<{}, { id: string }, { rejectValue: { error: any } }>(
    'videos/deleteVideo',
    async (payload, thunkAPI
    ) => {
        return thunkTryCatch(thunkAPI, async () => {
            await VideosAPI.delete(payload.id)


            thunkAPI.dispatch(getVideos({}))

            return;
        })
    }
)
export const updateVideo = createAsyncThunk<{}, { video: VideoType }, { rejectValue: { error: any } }>(
    'videos/updateVideo',
    async (payload, thunkAPI
    ) => {
        return thunkTryCatch(thunkAPI, async () => {
            await VideosAPI.update(payload.video)

            thunkAPI.dispatch(getVideos({}))

            return;
        })
    }
)

const slice = createSlice({
    name: 'videos',
    initialState: {
        playlistId: '',
        videos: [] as VideoType[],
        videosTotalCount: 0,
        itemForPageCount: 7,
        pageNumber: 1,
        sort: '0updated',
        name: '',
        tags: [] as string[],
        levelAccess: 0,
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
        setPlaylistId: (state, action: PayloadAction<{ playlistId: string }>) => {
            state.playlistId = action.payload.playlistId
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
                getVideos.fulfilled,
                (state, action) => {
                    state.videos = action.payload.videos
                    state.videosTotalCount = action.payload.videosTotalCount
                }
            )
        // .addCase() ...

    },
})

export const videosReducer = slice.reducer
export const videosActions = slice.actions
export const videosThunks = {getVideos, addVideo, deleteVideo, updateVideo}
// export const someThunkRej = someThunk.rejected

export const selectVideos = (state: AppStoreType) => state.videos
