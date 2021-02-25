import {instance} from '../../../i1-main/m3-dal/instance'
import {PERS_AREA_ADMIN_TOKEN, restoreState} from '../../../i1-main/m4-helpers/localStorage'

export type ForCreateVideoType = {
    name: string
    levelAccess: number
    tags: string[]
    startDate: number
    endDate: number
    courseId: string

    playlistId: string
    url: string
}

export type VideoType = {
    _id: string

    name: string
    levelAccess: number
    tags: string[]

    startDate: number
    endDate: number
    courseId: string

    // position number

    created: string
    updated: string

    playlistId: string
    url: string
}

export type GetAllAnswerType = {
    videos: VideoType[]
    videosTotalCount: number
}
export type AddAnswerType = {}

export const VideosAPI = {
    getAll: (
        itemForPageCount: number,
        pageNumber: number,
        sort: string,
        find: { levelAccess: number, tags: string[], name: string }
    ) => {
        const token = restoreState(PERS_AREA_ADMIN_TOKEN, '')

        return instance.get<GetAllAnswerType>('videos', {
            params: {
                token,
                itemForPageCount,
                pageNumber,
                sort,
                ...find,
            }
        })
            .then(res => res.data)
    },
    add: (data: ForCreateVideoType) => {
        const token = restoreState(PERS_AREA_ADMIN_TOKEN, '')

        return instance.post<AddAnswerType>('videos', {
            video: data,
            token,
        })
            .then(res => res.data)
    },
    delete: (id: string) => {
        const token = restoreState(PERS_AREA_ADMIN_TOKEN, '')

        return instance.delete<GetAllAnswerType>('videos/' + id, {params: {token}})
            .then(res => res.data)
    },
    update: (video: VideoType) => {
        const token = restoreState(PERS_AREA_ADMIN_TOKEN, '')

        return instance.put<GetAllAnswerType>('videos', {
            video,
            token,
        })
            .then(res => res.data)
    },

}
