import React from 'react'
import {Divider, PageHeader} from 'antd'
import {NavLink} from 'react-router-dom'
import {PATH} from '../u3-routes/Routes'
import {selectApp} from '../../m2-bll/appReducer'
import {useSelector} from 'react-redux'
import ItIncub from '../u0-common/u6-links/ItIncub'
import Laba from '../u0-common/u6-links/Laba'
import s from './Header.module.css'

const Header = React.memo(() => {
    const {isVerified, isLoading} = useSelector(selectApp)

    const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if(isLoading) e.preventDefault()
    }

    return (
        <>
            <PageHeader
                title={(
                    <>
                        Admin Personal Area
                    </>
                )}
                subTitle={(
                    <div className={s.subTitle}>
                        <div>
                            <ItIncub/>
                            <span className={s.comma}>,</span>
                        </div>
                        <Laba/>
                    </div>

                )}
                extra={[
                    isVerified && (
                        <NavLink to={PATH.PLAYLISTS} key={PATH.PLAYLISTS} onClick={onClick}>PLAYLISTS</NavLink>
                    ),
                    // <NavLink to={PATH.VIDEOS} key={PATH.VIDEOS} onClick={onClick}>VIDEOS</NavLink>,
                ]}
            />
            <Divider/>
        </>
    )
})

export default Header
