import React from 'react'
import {Divider, PageHeader} from 'antd'
import {NavLink} from 'react-router-dom'
import {PATH} from '../u3-routes/Routes'
import {selectApp} from '../../m2-bll/appReducer'
import {useSelector} from 'react-redux'

const Header = React.memo(() => {
    const {isVerified} = useSelector(selectApp)

    return (
        <>
            <PageHeader
                title={(
                    <>
                        Admin Personal Area
                    </>
                )}
                subTitle={(
                    <a
                        href={'https://it-incubator.by/'}
                        rel='noopener noreferrer'
                        target='_blank'
                    >
                        it-incub
                    </a>
                )}
                extra={[
                    isVerified && <NavLink to={PATH.PLAYLISTS} key={PATH.PLAYLISTS}>PLAYLISTS</NavLink>,

                ]}
            />
            <Divider/>
        </>
    )
})

export default Header
