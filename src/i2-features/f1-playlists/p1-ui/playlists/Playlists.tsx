import React from 'react'
import MappedPlaylists from './MappedPlaylists'
import PlaylistPagination from './PlaylistPagination'
import PlaylistFind from './PlaylistFind'

const Playlists = () => {
    return (
        <>
            <PlaylistFind/>
            <br/>

            <PlaylistPagination/>
            <br/>

            <MappedPlaylists/>

            <PlaylistPagination/>
        </>
    )
}

export default Playlists
