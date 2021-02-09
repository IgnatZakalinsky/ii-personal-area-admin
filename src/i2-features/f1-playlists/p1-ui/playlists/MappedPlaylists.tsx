import React, {useCallback, useEffect, useState} from 'react'
import s from './MappedPlaylists.module.css'
import s2 from './Playlist.module.css'
import Playlist from './Playlist'
import {useSelector} from 'react-redux'
import {playlistsThunks, selectPlaylists} from '../../p2-bll/playlistsReducer'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import CustomSpin from '../../../../i1-main/m1-ui/u0-common/u5-spins/CustomSpin'
import {Button, Divider} from 'antd'
import PlaylistModal from './PlaylistModal'
import {useActions} from '../../../../i1-main/m2-bll/helpers'

const MappedPlaylists = () => {
    const {playlists} = useSelector(selectPlaylists)
    const {isLoading} = useSelector(selectApp)
    const [showAdd, setShowAdd] = useState(false)
    const {getPlaylists, addPlaylist} = useActions(playlistsThunks)

    useEffect(() => {
        if (!playlists.length) {
            getPlaylists()
        }
    }, [playlists.length, getPlaylists])

    const onAdd = useCallback(() => setShowAdd(true), [setShowAdd])
    const closeAdd = useCallback(() => setShowAdd(false), [setShowAdd])
    const addPlaylistCallback = (name: string, levelAccess: number, tags: string[]) => {
        addPlaylist({
            playlist: {
                name,
                levelAccess,
                tags,
            }
        })
        closeAdd()
    }

    const mappedPlaylists = playlists.map(p => (<Playlist key={p._id} playlist={p}/>))

    return (
        <div className={s.main}>

            {isLoading && !playlists.length ? (
                <CustomSpin/>
            ) : (
                <>
                    <PlaylistModal show={showAdd} callback={addPlaylistCallback} close={closeAdd}/>

                    {/*table header*/}
                    <div className={s2.pl}>
                        <div className={s2.name}>Name</div>
                        <div className={s2.tags}>Tags</div>
                        <div className={s2.updated}>updated</div>
                        <div className={s2.created}>created</div>
                        <div className={s2.buttons}>
                            <Button disabled={isLoading} onClick={onAdd}>add</Button>
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
