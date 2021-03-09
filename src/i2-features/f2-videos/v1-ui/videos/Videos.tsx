import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {useActions} from '../../../../i1-main/m2-bll/helpers'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import {selectVideos, videosActions, videosThunks} from '../../v2-bll/videosReducer'
import MappedVideos from './MappedVideos'
import VideoFind from './VideoFind'
import VideoPagination from './VideoPagination'

const Videos = () => {
    const {name, tags, levelAccess, sort, pageNumber, itemForPageCount} = useSelector(selectVideos)
    const {isLoading} = useSelector(selectApp)
    const history = useHistory()
    const {setName, setLevelAccess, setTags, setSort, setPagination, getVideos} = useActions({
        ...videosActions, ...videosThunks
    })
    const [isFirstRendering, setFirstRendering] = useState(true)
    const [isChange, setIsChange] = useState(false)
    // const [isChange, setIsChange] = useState(false)
    const {playlistId} = useParams<{playlistId: string}>()

    useEffect(() => {
        if (isChange && !isLoading) {
            getVideos()
            setIsChange(false)
        }
    }, [isLoading, isChange, setIsChange, getVideos])

    useEffect(() => {
        if (isFirstRendering && !isLoading) {
            const search: { [key: string]: string } = {}

            new URLSearchParams(history.location.search).forEach((value, key) => {
                search[key] = value
            })

            if (search.name) {
                setName({name: search.name})
            }
            if (search.levelAccess) {
                setLevelAccess({levelAccess: +search.levelAccess})
            }
            if (search.sort) {
                setSort({sort: search.sort})
            }
            if (search.pageNumber || search.itemForPageCount) {
                setPagination({
                    pageNumber: search.pageNumber ? +search.pageNumber : 1,
                    itemForPageCount: search.itemForPageCount ? +search.itemForPageCount : 7,
                })
            }
            if (search.tags) {
                setTags({tags: search.tags.split(',')})
            }

            setFirstRendering(false)
            setIsChange(true)
        }
    }, [
        isFirstRendering, history.location.search, isLoading,
        setTags, setSort, setLevelAccess, setPagination, setName
    ])

    useEffect(() => {
        if (!isFirstRendering) {
            const searchObj: {[key: string]: string} = {}

            if (name) searchObj.name = name
            if (sort !== '0updated') searchObj.sort = sort
            if (tags.length) searchObj.tags = tags.toString()
            if (levelAccess) searchObj.levelAccess = levelAccess.toString()
            if (pageNumber !== 1) searchObj.pageNumber = pageNumber.toString()
            if (itemForPageCount !== 7) searchObj.itemForPageCount = itemForPageCount.toString()

            const search = new URLSearchParams(searchObj)

            history.push({
                // pathname: history.location.pathname,
                search: search.toString(),
            })
            // console.log(search.toString(), history.location.pathname)
        }
    }, [
        isFirstRendering, name, levelAccess, sort, pageNumber, itemForPageCount, tags, history, playlistId,
    ])

    return (
        <>
            <VideoFind/>
            <br/>

            <VideoPagination/>
            <br/>

            <MappedVideos/>

            <VideoPagination/>
        </>
    )
}

export default Videos
