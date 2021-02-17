import {instance} from '../../../i1-main/m3-dal/instance'
import {PERS_AREA_ADMIN_TOKEN, restoreState} from '../../../i1-main/m4-helpers/localStorage'

export type ForCreatePlaylistType = {
    name: string
    levelAccess: number
    tags: string[]
}

export type PlaylistType = {
    _id: string

    name: string
    levelAccess: number
    tags: string[]
    // position number
    // start/end date access

    created: string
    updated: string
}

export type GetAllAnswerType = {
    playlists: PlaylistType[]
    playlistsTotalCount: number
}
export type AddAnswerType = {}

export const PlaylistsAPI = {
    getAll: (
        itemForPageCount: number,
        pageNumber: number,
        sort: string,
        find: { levelAccess: number, tags: string[], name: string }
    ) => {
        const token = restoreState(PERS_AREA_ADMIN_TOKEN, '')

        return instance.get<GetAllAnswerType>('playlists', {
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
    add: (data: ForCreatePlaylistType) => {
        const token = restoreState(PERS_AREA_ADMIN_TOKEN, '')

        return instance.post<AddAnswerType>('playlists', {
            playlist: data,
            token,
        })
            .then(res => res.data)
    },
    delete: (id: string) => {
        const token = restoreState(PERS_AREA_ADMIN_TOKEN, '')

        return instance.delete<GetAllAnswerType>('playlists/' + id, {params: {token}})
            .then(res => res.data)
    },
    update: (playlist: PlaylistType) => {
        const token = restoreState(PERS_AREA_ADMIN_TOKEN, '')

        return instance.put<GetAllAnswerType>('playlists', {
            playlist,
            token,
        })
            .then(res => res.data)
    },

}

// export const MockPlaylistsAPI = {
//     getAll: () => {
//         return new Promise<GetAllAnswerType>((resolve, reject) => {
//             const playlists = [
//                 {
//                     _id: '1',
//                     name: 'Курс "React JS - путь самурая 1.0", уроки, практика',
//                     levelAccess: 0,
//                     tags: ['react', 'redux',],
//                     created: new Date().toString(),
//                     updated: new Date().toString(),
//                 },
//                 {
//                     _id: '2',
//                     name: '#lesson_01',
//                     levelAccess: 100,
//                     tags: ['start', 'component', 'props',],
//                     created: new Date().toString(),
//                     updated: new Date().toString(),
//                 },
//             ] as PlaylistType[]
//             setTimeout(() => {
//                 // ok
//                 resolve({playlists, playlistsTotalCount: 2})
//
//                 // error
//                 // reject({message: 'x'})
//             }, 5000)
//         })
//     },
//     add: (data: any) => {
//         return new Promise<AddAnswerType>((resolve, reject) => {
//             console.log(data)
//             setTimeout(() => {
//                 // ok
//                 // resolve({})
//
//                 // error
//                 reject({message: 'x'})
//             }, 5000)
//         })
//     },
// }
