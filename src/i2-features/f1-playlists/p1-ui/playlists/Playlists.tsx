import React from 'react'
import MappedPlaylists from './MappedPlaylists'
import PlaylistPagination from './PlaylistPagination'

const Playlists = () => {

    return (
        <>
            {/*find*/}

            <PlaylistPagination/>
            <br/>
            <MappedPlaylists/>

            <PlaylistPagination/>
        </>
    )
}

export default Playlists
