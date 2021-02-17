import React, {useEffect, useState} from 'react'
import MappedPlaylists from './MappedPlaylists'
import PlaylistPagination from './PlaylistPagination'
import PlaylistFind from './PlaylistFind'
import {useSelector} from 'react-redux'
import {playlistsActions, playlistsThunks, selectPlaylists} from '../../p2-bll/playlistsReducer'
import {useHistory} from 'react-router-dom'
import {useActions} from '../../../../i1-main/m2-bll/helpers'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'

const Playlists = () => {
    const {name, tags, levelAccess, sort, pageNumber, itemForPageCount} = useSelector(selectPlaylists)
    const {isLoading} = useSelector(selectApp)
    const history = useHistory()
    const {setName, setLevelAccess, setTags, setSort, setPagination, getPlaylists} = useActions({
        ...playlistsActions, ...playlistsThunks
    })
    const [isFirstRendering, setFirstRendering] = useState(true)
    const [isChange, setIsChange] = useState(false)

    useEffect(() => {
        if (isChange && !isLoading) {
            getPlaylists()
            setIsChange(false)
        }
    }, [isLoading, isChange, setIsChange, getPlaylists])

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
        isFirstRendering, name, levelAccess, sort, pageNumber, itemForPageCount, tags, history
    ])

    return (
        <>
            <PlaylistFind/>
            <br/>

            <PlaylistPagination/>
            <br/>

            <MappedPlaylists/>

            <PlaylistPagination/>
        </>
    )
}

export default Playlists
