import React, {useEffect} from 'react'
import s from './MappedPlaylists.module.css'
import Playlist from './Playlist'
import {useDispatch, useSelector} from 'react-redux'
import {playlistsThunks, selectPlaylists} from '../../p2-bll/playlistsReducer'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import CustomSpin from '../../../../i1-main/m1-ui/u0-common/u5-spins/CustomSpin'

const MappedPlaylists = () => {
    const {playlists} = useSelector(selectPlaylists)
    const {isLoading} = useSelector(selectApp)

    const dispatch = useDispatch()
    const {getPlaylists} = playlistsThunks

    useEffect(() => {
        if (!playlists.length) {
            dispatch(getPlaylists({}))
        }
    }, [playlists.length, dispatch, getPlaylists])

    const mappedPlaylists = playlists.map(p => (<Playlist key={p._id} playlist={p}/>))

    return (
        <div className={s.main}>

            {isLoading ? (
                <CustomSpin/>
            ) : (
                <>
                    {mappedPlaylists}
                </>
            )}

        </div>
    )
}

export default MappedPlaylists
