import React, {useCallback, useEffect, useState} from 'react'
// import s from './MappedPlaylists.module.css'
import s2 from './Video.module.css'
import {useSelector} from 'react-redux'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import CustomSpin from '../../../../i1-main/m1-ui/u0-common/u5-spins/CustomSpin'
import {Button, Divider} from 'antd'
import {useActions} from '../../../../i1-main/m2-bll/helpers'
import Sort from '../../../../i1-main/m1-ui/u0-common/u7-sort/Sort'
import {selectVideos, videosActions, videosThunks} from '../../v2-bll/videosReducer'
import Video from './Video'
import {useParams} from 'react-router-dom'
import VideoModal from './VideoModal'

const MappedVideos = () => {
    const {videos, sort, playlistId: plId} = useSelector(selectVideos)
    const {isLoading} = useSelector(selectApp)
    const [showAdd, setShowAdd] = useState(false)
    const {getVideos, addVideo, setSort, setPlaylistId} = useActions({...videosThunks, ...videosActions})
    const [isChange, setIsChange] = useState(false)
    const {playlistId} = useParams<{playlistId: string}>()
    const [isFirstRendering, setFirstRendering] = useState(true)

    useEffect(() => {
        if (isChange && !isLoading && ((playlistId === plId) || (!playlistId))) {
            getVideos()
            setIsChange(false)
        }
    }, [isLoading, isChange, setIsChange, getVideos, plId, playlistId])

    useEffect(() => {
        if ((playlistId || '') !== plId) {
            setPlaylistId({playlistId: playlistId || ''})
            !isFirstRendering && setIsChange(true)
        }
        if (isFirstRendering) setFirstRendering(false)
    }, [playlistId, plId, setPlaylistId, setIsChange])

    // const onAdd = useCallback(() => {
    //     addVideo({
    //                 video: {
    //                     name: 'test',
    //                     levelAccess: 0,
    //                     tags: [],
    //                     startDate: 0,
    //                     endDate: 0,
    //                     courseId: '1',
    //                     playlistId,
    //                     url: 'http://hz',
    //                 }
    //             })
    // }, [playlistId])
    const onAdd = useCallback(() => setShowAdd(true), [setShowAdd])
    const closeAdd = useCallback(() => setShowAdd(false), [setShowAdd])
    const addPlaylistCallback = (
        name: string,
        levelAccess: number,
        tags: string[],
        startDate: number,
        endDate: number,
        courseId: string,
        url: string,
        playlistId: string,
    ) => {
        addVideo({
            video: {
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
        closeAdd()
    }
    const setSortCallback = (s: string) => {
        setSort({sort: s})
        setIsChange(true)
    }

    const mappedVideos = videos.map(v => (<Video key={v._id} video={v}/>))

    return (
        <div>
        {/*<div className={s.main}>*/}
            {isLoading && !videos.length ? (
                <CustomSpin/>
            ) : (
                <>
                    <VideoModal
                        show={showAdd}
                        callback={addPlaylistCallback}
                        close={closeAdd}
                        defPlaylistId={playlistId}
                    />

                    {/*table header*/}
                    <div className={s2.vi}>
                        <div className={s2.courseId}>
                            c_id
                            <Sort sort={sort} onChange={setSortCallback} isLoading={isLoading} propsName={'courseId'}/>
                        </div>
                        <div className={s2.playlistId}>
                            playlistId
                            <Sort sort={sort} onChange={setSortCallback} isLoading={isLoading} propsName={'courseId'}/>
                        </div>

                        <div className={s2.name}>
                            Name
                            <Sort sort={sort} onChange={setSortCallback} isLoading={isLoading} propsName={'name'}/>
                        </div>

                        <div className={s2.url}>
                            Url
                            <Sort sort={sort} onChange={setSortCallback} isLoading={isLoading} propsName={'url'}/>
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

                        <div className={s2.date}>
                            startDate
                            <Sort sort={sort} onChange={setSortCallback} isLoading={isLoading} propsName={'startDate'}/>
                        </div>
                        <div className={s2.date}>
                            endDate
                            <Sort sort={sort} onChange={setSortCallback} isLoading={isLoading} propsName={'endDate'}/>
                        </div>

                        <div className={s2.date}>
                            updated
                            <Sort sort={sort} onChange={setSortCallback} isLoading={isLoading} propsName={'updated'}/>
                        </div>
                        <div className={s2.date}>
                            created
                            <Sort sort={sort} onChange={setSortCallback} isLoading={isLoading} propsName={'created'}/>
                        </div>

                        <div className={s2.buttons}>
                            <Button disabled={isLoading} onClick={onAdd}>add</Button>
                        </div>
                    </div>
                    <Divider/>

                    {mappedVideos}
                </>
            )}

        </div>
    )
}

export default MappedVideos
