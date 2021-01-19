import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {message} from 'antd'
// import {Redirect} from 'react-router-dom'
import CustomSpin from '../u5-spins/CustomSpin'
import {appThunks, selectApp} from '../../../m2-bll/appReducer'
// import {PATH} from '../../u3-routes/Routes'
import {useActions} from '../../../m2-bll/helpers'
import s from './AuthRedirectPage.module.css'
import Laba from '../u6-links/Laba'

type DivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

type AuthRedirectPagePropsType = DivPropsType & {

}

const AuthRedirectPage: React.FC<AuthRedirectPagePropsType> = React.memo((
    {

        ...restProps
    }
) => {
    const {isVerified, isLoading, error} = useSelector(selectApp)
    const [isFirstRendering, setFirstRendering] = useState<boolean>(true)
    const [isRedirect, setRedirect] = useState<boolean>(false)
    const [spin, setSpin] = useState<boolean>(!isVerified)
    const {loginThunk} = useActions({...appThunks})

    useEffect(() => {
        if (isFirstRendering) {

            if (!isVerified) {
                loginThunk({})
            }
            setFirstRendering(false) // + rerender
        } else {
            if (!isVerified && !isLoading && !isRedirect) {
                message.error('Not logged in! ' + error)
                setTimeout(() => setRedirect(true), 1500);
            } else {
                spin && isVerified && setSpin(false)
            }
        }
    }, [
        isFirstRendering, setFirstRendering, isVerified, setRedirect, spin, setSpin, isLoading, isRedirect, loginThunk,
        error
    ]);

    if (isRedirect) {
        // return <Redirect to={PATH.LOGIN}/>
        return (
            <div className={s.redirect}>
                <span className={s.text}>For login - go to:</span>
                <Laba/>
            </div>
        )
    }
    if (spin) return <CustomSpin/>

    return (
        <div style={{padding: 24}}>
            <div {...restProps}/>
        </div>
    )
})

export default AuthRedirectPage
