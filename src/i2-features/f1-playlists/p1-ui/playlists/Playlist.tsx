import React, {useCallback, useState} from 'react'
import s from './Playlist.module.css'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../../../i1-main/m1-ui/u3-routes/Routes'
import {Button, Divider, Modal} from 'antd'
import {PlaylistType} from '../../p3-dal/PlaylistsAPI'
import {playlistsThunks} from '../../p2-bll/playlistsReducer'
import {useSelector} from 'react-redux'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import {useActions} from '../../../../i1-main/m2-bll/helpers'
import PlaylistModal from './PlaylistModal'

type PlaylistPropsType = {
    playlist: PlaylistType
}

const Playlist: React.FC<PlaylistPropsType> = React.memo(({playlist}) => {
    const [showDel, setShowDel] = useState(false)
    const [showUpd, setShowUpd] = useState(false)
    const {deletePlaylist, updatePlaylist} = useActions(playlistsThunks)
    const {isLoading} = useSelector(selectApp)

    const mappedTags = playlist.tags.map((t, i) => (
        <span key={playlist._id + i}>#{t} </span>
    ))

    const onDel = useCallback(() => setShowDel(true), [setShowDel])
    const closeDel = useCallback(() => setShowDel(false), [setShowDel])
    const delPlaylist = () => {
        deletePlaylist({id: playlist._id})

        closeDel()
    }
    const onUpd = useCallback(() => setShowUpd(true), [setShowUpd])
    const closeUpd = useCallback(() => setShowUpd(false), [setShowUpd])
    const updPlaylistCallback = (
        name: string,
        levelAccess: number,
        tags: string[],
        startDate: number,
        endDate: number,
        courseId: string,
        ) => {
        updatePlaylist({
            playlist: {
                ...playlist,
                name,
                levelAccess,
                tags,
                startDate,
                endDate,
                courseId,
            }
        })
        closeUpd()
    }

    // const updated = new Date(playlist.updated).toLocaleDateString().split('.')
    const updated = new Date(playlist.updated).toLocaleDateString()
    const created = new Date(playlist.created).toLocaleDateString()

    const startDate = new Date(playlist.startDate).toLocaleDateString()
    const endDate = new Date(playlist.endDate).toLocaleDateString()

    return (
        <>
            {showUpd && (
                <PlaylistModal
                    show={showUpd}
                    callback={updPlaylistCallback}
                    close={closeUpd}
                    defName={playlist.name}
                    defLevelAccess={playlist.levelAccess}
                    defTags={playlist.tags}
                />
            )}
            <Modal
                visible={showDel}
                onOk={delPlaylist}
                onCancel={closeDel}
            >
                delete playlist {playlist.name}?
            </Modal>

            <div className={s.pl}>
                <div className={s.courseId}>
                    {playlist.courseId}
                </div>

                <NavLink to={PATH.VIDEOS + '/' + playlist._id} className={s.name}>{playlist.name}</NavLink>

                <div className={s.lvl}>{playlist.levelAccess}</div>

                <div className={s.tags}>{mappedTags}</div>

                {/*<div className={s.updated}>*/}
                {/*    <span>{updated[0]}.{updated[1]}</span>*/}
                {/*    <span>.{updated[2]}</span>*/}
                {/*</div>*/}

                <div className={s.date}>{startDate}</div>
                <div className={s.date}>{endDate}</div>

                <div className={s.date}>{updated}</div>
                <div className={s.date}>{created}</div>

                <div className={s.buttons}>
                    <Button disabled={isLoading} onClick={onUpd}>upd</Button>
                    <Button disabled={isLoading} danger onClick={onDel}>del</Button>
                </div>
            </div>
            <Divider/>
        </>
    )
})

export default Playlist
