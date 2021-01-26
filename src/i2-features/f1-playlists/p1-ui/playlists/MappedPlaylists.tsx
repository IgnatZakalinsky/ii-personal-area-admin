import React, {useEffect} from 'react'
import s from './MappedPlaylists.module.css'
import s2 from './Playlist.module.css'
import Playlist from './Playlist'
import {useDispatch, useSelector} from 'react-redux'
import {playlistsThunks, selectPlaylists} from '../../p2-bll/playlistsReducer'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import CustomSpin from '../../../../i1-main/m1-ui/u0-common/u5-spins/CustomSpin'
import {Button, Divider} from 'antd'

const MappedPlaylists = () => {
    const {playlists} = useSelector(selectPlaylists)
    const {isLoading} = useSelector(selectApp)

    const dispatch = useDispatch()
    const {getPlaylists, addPlaylist} = playlistsThunks

    useEffect(() => {
        if (!playlists.length) {
            dispatch(getPlaylists({}))
        }
    }, [playlists.length, dispatch, getPlaylists])

    const addPlaylistCallback = () => {
        dispatch(addPlaylist({
            playlist: {
                name: 'testPl',
                levelAccess: 0,
                tags: ['testTg'],
            }
        }))
    }

    const mappedPlaylists = playlists.map(p => (<Playlist key={p._id} playlist={p}/>))

    return (
        <div className={s.main}>

            {isLoading && !playlists.length ? (
                <CustomSpin/>
            ) : (
                <>
                    {/*table header*/}
                    <div className={s2.pl}>
                        <div className={s2.name}>Name</div>
                        <div className={s2.tags}>Tags</div>
                        <div className={s2.updated}>updated</div>
                        <div className={s2.created}>created</div>
                        <div className={s2.buttons}>
                            <Button disabled={isLoading} onClick={addPlaylistCallback}>add</Button>
                            {/*<Button>add</Button>*/}
                        </div>
                    </div>
                    <Divider/>

                    {mappedPlaylists}
                </>
            )}

        </div>
    )
}

export default MappedPlaylists
