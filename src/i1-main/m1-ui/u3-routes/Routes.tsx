import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import AuthRedirectPage from '../u0-common/u4-redirets/AuthRedirectPage'
import PlaylistsPage from '../../../i2-features/f1-playlists/p1-ui/PlaylistsPage'
// import VideosPage from '../../../i2-features/f3-videos/v1-ui/VideosPage'

export const PATH = {
    PLAYLISTS: '/playlists',
    VIDEOS: '/videos',
}

const Routes = () => {
    return (
        <Switch>
            <Route path={'/'} exact render={() => <Redirect to={PATH.PLAYLISTS}/>}/>

            <Route path={PATH.PLAYLISTS} render={() => <AuthRedirectPage><PlaylistsPage/></AuthRedirectPage>}/>
            {/*<Route*/}
            {/*    path={PATH.VIDEOS + '/:playlistId'}*/}
            {/*    render={() => <AuthRedirectPage><VideosPage/></AuthRedirectPage>}*/}
            {/*/>*/}

            <Route render={() => <AuthRedirectPage><div>404</div></AuthRedirectPage>}/>
        </Switch>
    )
}

export default Routes
