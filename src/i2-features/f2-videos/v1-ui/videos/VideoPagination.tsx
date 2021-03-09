import React, {useEffect, useState} from 'react'
import {Pagination} from 'antd'
import {useSelector} from 'react-redux'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import {useActions} from '../../../../i1-main/m2-bll/helpers'
import {selectVideos, videosActions, videosThunks} from '../../v2-bll/videosReducer'

const VideoPagination = () => {
    const {videosTotalCount, itemForPageCount, pageNumber} = useSelector(selectVideos)
    const {isLoading} = useSelector(selectApp)
    const {setPagination, getVideos} = useActions({...videosActions, ...videosThunks})
    const [isChange, setIsChange] = useState(false)
    const [isFirstRendering, setFirstRendering] = useState(true)

    const onChange = (page: number, pageSize?: number) => {
        setPagination({pageNumber: page, itemForPageCount: pageSize || 7})
        setIsChange(true)
    }

    useEffect(() => {
        if (isChange) {
            getVideos()
            setIsChange(false)
        }
    }, [isChange, setIsChange, getVideos])

    useEffect(() => {
        if (isFirstRendering) {
            if (pageNumber !== 1) {
                setPagination({itemForPageCount, pageNumber: 1})
            }
            setFirstRendering(false)
        }
    }, [isFirstRendering, setFirstRendering, setPagination, setIsChange, itemForPageCount, pageNumber])

    return (
        <Pagination
            total={videosTotalCount}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} videos`}

            pageSizeOptions={['4', '7', '10', '15', '100']}
            showSizeChanger
            pageSize={itemForPageCount}

            current={pageNumber}

            disabled={isLoading}
            onChange={onChange}
        />
    )
}

export default VideoPagination
