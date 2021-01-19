import React from 'react'
import s from './MappedPlaylists.module.css'
import Playlist from './Playlist'

export type PlaylistType = {
    _id: string

    name: string //
    levelAccess: number
    tags: string[] //
    // courseType: string
    // position: number
    // access start/end date

    created: number //
    updated: number //
}

const playlists: PlaylistType[] = [
    {
        _id: '1',
        name: 'Курс "React JS - путь самурая 1.0", уроки, практика',
        levelAccess: 0,
        tags: ['react', 'redux',],
        created: Date.now(),
        updated: Date.now(),
    },
    {
        _id: '2',
        name: '#lesson_01',
        levelAccess: 100,
        tags: ['start', 'component', 'props',],
        created: Date.now(),
        updated: Date.now(),
    },

]

const MappedPlaylists = () => {
    const mappedPlaylists = playlists.map(p => (<Playlist key={p._id} playlist={p}/>))

    return (
        <div className={s.main}>

            {mappedPlaylists}

        </div>
    )
}

export default MappedPlaylists
