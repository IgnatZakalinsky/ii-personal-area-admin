import React, {useEffect, useState} from 'react'
import {Pagination} from 'antd'
import {useSelector} from 'react-redux'
import {playlistsActions, playlistsThunks, selectPlaylists} from '../../p2-bll/playlistsReducer'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import {useActions} from '../../../../i1-main/m2-bll/helpers'

const PlaylistPagination = () => {
    const {playlistsTotalCount, itemForPageCount, pageNumber} = useSelector(selectPlaylists)
    const {isLoading} = useSelector(selectApp)
    const {setPagination, getPlaylists} = useActions({...playlistsActions, ...playlistsThunks})
    const [isChange, setIsChange] = useState(false)

    const onChange = (page: number, pageSize?: number) => {
        setPagination({pageNumber: page, itemForPageCount: pageSize || 7})
        setIsChange(true)
    }

    useEffect(() => {
        if (isChange) {
            getPlaylists()
            setIsChange(false)
        }
    }, [isChange, setIsChange, getPlaylists])

    return (
        <Pagination
            total={playlistsTotalCount}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} playlists`}

            pageSizeOptions={['4', '7', '10', '15', '100']}
            showSizeChanger
            pageSize={itemForPageCount}

            current={pageNumber}

            disabled={isLoading}
            onChange={onChange}
        />
    )
}

export default PlaylistPagination
