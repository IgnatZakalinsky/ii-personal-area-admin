import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {message} from 'antd'
import {Redirect} from 'react-router-dom'
import CustomSpin from '../u5-spins/CustomSpin'
import {appThunks, selectApp} from '../../../m2-bll/appReducer'
import {PATH} from '../../u3-routes/Routes'
import {useActions} from '../../../m2-bll/helpers'

type DivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

type AuthRedirectPagePropsType = DivPropsType & {

}

const AuthRedirectPage: React.FC<AuthRedirectPagePropsType> = React.memo((
    {

        ...restProps
    }
) => {
    const {isVerified, isLoading, error} = useSelector(selectApp);
    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [spin, setSpin] = useState<boolean>(!isVerified)
    // const {meThunk} = useActions({...appThunks})

    useEffect(() => {
        if (firstRendering) {

            if (!isVerified) {
                // meThunk({})
            }
            setFirstRendering(false) // + rerender
        } else {
            if (!isVerified && !isLoading && !redirect) {
                message.error('Not logged in! ' + error)
                setTimeout(() => setRedirect(true), 1500);
            } else {
                spin && !isLoading && setSpin(false)
            }
        }
    }, [firstRendering, setFirstRendering, isVerified, setRedirect, spin, setSpin, isLoading, redirect,
        // meThunk,
        error]);

    // if (redirect) return <Redirect to={PATH.LOGIN}/>
    if (spin) return <CustomSpin/>

    return (
        <>
            <div {...restProps}/>
        </>
    )
})

export default AuthRedirectPage
