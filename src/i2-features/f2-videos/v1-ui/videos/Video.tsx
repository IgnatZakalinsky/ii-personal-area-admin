import React, {useCallback, useState} from 'react'
import s from './Video.module.css'
import {PATH} from '../../../../i1-main/m1-ui/u3-routes/Routes'
import {Button, Divider, Modal} from 'antd'
import {useSelector} from 'react-redux'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import {useActions} from '../../../../i1-main/m2-bll/helpers'
import {VideoType} from '../../v3-dal/VideosAPI'

type VideoPropsType = {
    video: VideoType
}

const Video: React.FC<VideoPropsType> = React.memo(({video}) => {
    // const [showDel, setShowDel] = useState(false)
    // const [showUpd, setShowUpd] = useState(false)
    // const {deletePlaylist, updatePlaylist} = useActions(playlistsThunks)
    const {isLoading} = useSelector(selectApp)

    const mappedTags = video.tags.map((t, i) => (
        <span key={video._id + i}>#{t} </span>
    ))

    // const onDel = useCallback(() => setShowDel(true), [setShowDel])
    // const closeDel = useCallback(() => setShowDel(false), [setShowDel])
    // const delPlaylist = () => {
    //     deletePlaylist({id: playlist._id})
    //
    //     closeDel()
    // }
    // const onUpd = useCallback(() => setShowUpd(true), [setShowUpd])
    // const closeUpd = useCallback(() => setShowUpd(false), [setShowUpd])
    // const updPlaylistCallback = (
    //     name: string,
    //     levelAccess: number,
    //     tags: string[],
    //     startDate: number,
    //     endDate: number,
    //     courseId: string,
    //     ) => {
    //     updatePlaylist({
    //         playlist: {
    //             ...playlist,
    //             name,
    //             levelAccess,
    //             tags,
    //             startDate,
    //             endDate,
    //             courseId,
    //         }
    //     })
    //     closeUpd()
    // }

    const updated = new Date(video.updated).toLocaleDateString()
    const created = new Date(video.created).toLocaleDateString()

    const startDate = new Date(video.startDate).toLocaleDateString()
    const endDate = new Date(video.endDate).toLocaleDateString()

    return (
        <>
            {/*{showUpd && (*/}
            {/*    <PlaylistModal*/}
            {/*        show={showUpd}*/}
            {/*        callback={updPlaylistCallback}*/}
            {/*        close={closeUpd}*/}
            {/*        defName={playlist.name}*/}
            {/*        defLevelAccess={playlist.levelAccess}*/}
            {/*        defTags={playlist.tags}*/}
            {/*    />*/}
            {/*)}*/}
            {/*<Modal*/}
            {/*    visible={showDel}*/}
            {/*    onOk={delPlaylist}*/}
            {/*    onCancel={closeDel}*/}
            {/*>*/}
            {/*    delete playlist {playlist.name}?*/}
            {/*</Modal>*/}

            <div className={s.vi}>
                <div className={s.courseId}>
                    {video.courseId}
                </div>

                <div className={s.name}>{video.name}</div>
                {/*<NavLink to={PATH.VIDEOS + '/' + video._id} className={s.name}>{video.name}</NavLink>*/}

                <div className={s.lvl}>{video.levelAccess}</div>

                <div className={s.tags}>{mappedTags}</div>

                <div className={s.date}>{startDate}</div>
                <div className={s.date}>{endDate}</div>

                <div className={s.date}>{updated}</div>
                <div className={s.date}>{created}</div>

                <div className={s.buttons}>
                    {/*<Button disabled={isLoading} onClick={onUpd}>upd</Button>*/}
                    {/*<Button disabled={isLoading} danger onClick={onDel}>del</Button>*/}
                </div>
            </div>
            <Divider/>
        </>
    )
})

export default Video
