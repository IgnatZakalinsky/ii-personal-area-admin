import React, {useCallback, useEffect, useState} from 'react'
import s from './MappedPlaylists.module.css'
import s2 from './Playlist.module.css'
import Playlist from './Playlist'
import {useSelector} from 'react-redux'
import {playlistsThunks, selectPlaylists, playlistsActions} from '../../p2-bll/playlistsReducer'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import CustomSpin from '../../../../i1-main/m1-ui/u0-common/u5-spins/CustomSpin'
import {Button, Divider} from 'antd'
import PlaylistModal from './PlaylistModal'
import {useActions} from '../../../../i1-main/m2-bll/helpers'
import Sort from '../../../../i1-main/m1-ui/u0-common/u7-sort/Sort'

const MappedPlaylists = () => {
    const {playlists, sort} = useSelector(selectPlaylists)
    const {isLoading} = useSelector(selectApp)
    const [showAdd, setShowAdd] = useState(false)
    const {getPlaylists, addPlaylist, setSort} = useActions({...playlistsThunks, ...playlistsActions})
    const [isChange, setIsChange] = useState(true)

    useEffect(() => {
        if (isChange) {
            getPlaylists()
            setIsChange(false)
        }
    }, [isChange, setIsChange, getPlaylists])

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
    const setSortCallback = (s: string) => {
        setSort({sort: s})
        setIsChange(true)
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
                        <div className={s2.name}>
                            Name
                            <Sort sort={sort} onChange={setSortCallback} isLoading={isLoading} propsName={'name'}/>
                        </div>
                        <div className={s2.lvl}>
                            Lvl
                            <Sort
                                sort={sort}
                                onChange={setSortCallback}
                                isLoading={isLoading}
                                propsName={'levelAccess'}
                            />
                        </div>
                        <div className={s2.tags}>
                            Tags
                            <Sort sort={sort} onChange={setSortCallback} isLoading={isLoading} propsName={'tags'}/>
                        </div>
                        <div className={s2.updated}>
                            updated
                            <Sort sort={sort} onChange={setSortCallback} isLoading={isLoading} propsName={'updated'}/>
                        </div>
                        <div className={s2.created}>
                            created
                            <Sort sort={sort} onChange={setSortCallback} isLoading={isLoading} propsName={'created'}/>
                        </div>
                        <div className={s2.buttons}>
                            <Button disabled={isLoading} onClick={onAdd}>add</Button>
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
