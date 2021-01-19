import {instance} from '../../../i1-main/m3-dal/instance'

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

export const PlaylistsAPI = {
    getAll: () => {
        return instance.get<GetAllAnswerType>('playlists')
            .then(res => res.data)
    },
    add: (data: any) => {
        return instance.post<GetAllAnswerType>('playlists2', data)
            .then(res => res.data)
    },
    delete: (id: string) => {
        return instance.delete<GetAllAnswerType>('playlists/' + id)
            .then(res => res.data)
    },
    update: (id: string) => {
        return instance.put<GetAllAnswerType>('playlists', {
            playlist: {
                _id: id,
                name: 'new Pl',
            }
        })
            .then(res => res.data)
    },

}
