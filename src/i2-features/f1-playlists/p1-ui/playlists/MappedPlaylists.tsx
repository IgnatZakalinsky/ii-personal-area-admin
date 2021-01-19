import React from 'react'
import s from './MappedPlaylists.module.css'
import Playlist from './Playlist'
import {useSelector} from 'react-redux'
import {selectPlaylists} from '../../p2-bll/playlistsReducer'

const MappedPlaylists = () => {
    const {playlists} = useSelector(selectPlaylists)

    const mappedPlaylists = playlists.map(p => (<Playlist key={p._id} playlist={p}/>))

    return (
        <div className={s.main}>

            {mappedPlaylists}

        </div>
    )
}

export default MappedPlaylists
