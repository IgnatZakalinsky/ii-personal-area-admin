import React, {useCallback, useState} from 'react'
import s from './Video.module.css'
import {Button, Divider, Modal} from 'antd'
import {useSelector} from 'react-redux'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import {useActions} from '../../../../i1-main/m2-bll/helpers'
import {VideoType} from '../../v3-dal/VideosAPI'
import {videosThunks} from '../../v2-bll/videosReducer'
import VideoModal from './VideoModal'

type VideoPropsType = {
    video: VideoType
}

const Video: React.FC<VideoPropsType> = React.memo(({video}) => {
    const [showDel, setShowDel] = useState(false)
    const [showUpd, setShowUpd] = useState(false)
    const {deleteVideo, updateVideo} = useActions(videosThunks)
    const {isLoading} = useSelector(selectApp)
    const [isShow, setShow] = useState(false)

    const setShowSwitch = () => setShow(s => !s)

    const mappedTags = video.tags.map((t, i) => (
        <span key={video._id + i}>#{t} </span>
    ))

    const onDel = useCallback(() => setShowDel(true), [setShowDel])
    const closeDel = useCallback(() => setShowDel(false), [setShowDel])
    const delPlaylist = () => {
        deleteVideo({id: video._id})

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
        url: string,
        playlistId: string,
        ) => {
        updateVideo({
            video: {
                ...video,
                name,
                levelAccess,
                tags,
                startDate,
                endDate,
                courseId,
                url,
                playlistId,
            }
        })
        closeUpd()
    }

    const updated = new Date(video.updated).toLocaleDateString()
    const created = new Date(video.created).toLocaleDateString()

    const startDate = new Date(video.startDate).toLocaleDateString()
    const endDate = new Date(video.endDate).toLocaleDateString()

    return (
        <>
            {showUpd && (
                <VideoModal
                    show={showUpd}
                    callback={updPlaylistCallback}
                    close={closeUpd}
                    defName={video.name}
                    defLevelAccess={video.levelAccess}
                    defTags={video.tags}
                    defPlaylistId={video.playlistId}
                    defUrl={video.url}
                />
            )}
            <Modal
                visible={showDel}
                onOk={delPlaylist}
                onCancel={closeDel}
            >
                delete video {video.name}?
            </Modal>

            <div className={s.vi}>
                <div className={s.courseId}>
                    {video.courseId}
                </div>
                <div className={s.playlistId}>
                    {video.playlistId}
                </div>

                <div className={s.name} onClick={setShowSwitch}>{video.name}</div>
                <div className={s.url}>{video.url}</div>
                {/*<NavLink to={PATH.VIDEOS + '/' + video._id} className={s.name}>{video.name}</NavLink>*/}

                <div className={s.lvl}>{video.levelAccess}</div>

                <div className={s.tags}>{mappedTags}</div>

                <div className={s.date}>{startDate}</div>
                <div className={s.date}>{endDate}</div>

                <div className={s.date}>{updated}</div>
                <div className={s.date}>{created}</div>

                <div className={s.buttons}>
                    <Button disabled={isLoading} onClick={onUpd}>upd</Button>
                    <Button disabled={isLoading} danger onClick={onDel}>del</Button>
                </div>
            </div>
            {isShow && (
                <iframe
                    width='560'
                    height='315'
                    src={video.url} // ?start=61 (1:01)
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                />
            )}
            <Divider/>
        </>
    )
})

export default Video
