import React from 'react'
import s from './Playlist.module.css'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../../../i1-main/m1-ui/u3-routes/Routes'
import {Divider} from 'antd'
import {PlaylistType} from '../../p3-dal/PlaylistsAPI'

type PlaylistPropsType = {
    playlist: PlaylistType
}

const Playlist: React.FC<PlaylistPropsType> = ({playlist}) => {
    const mappedTags = playlist.tags.map((t, i) => (
        <span key={playlist._id + i}>#{t} </span>
    ))

    const updated = new Date(playlist.updated).toLocaleDateString().split('.')
    const created = new Date(playlist.created).toLocaleDateString().split('.')

    return (
        <>
            <div className={s.pl}>
                <NavLink to={PATH.VIDEOS + '/' + playlist._id} className={s.name}>{playlist.name}</NavLink>
                <div className={s.tags}>{mappedTags}</div>
                <div className={s.updated}>
                    <span>
                        {updated[0]}.{updated[1]}
                    </span>
                    <span>
                        .{updated[2]}
                    </span>
                </div>
                <div className={s.created}>
                    <span>
                        {created[0]}.{created[1]}
                    </span>
                    <span>
                        .{created[2]}
                    </span>
                </div>
            </div>
            <Divider/>
        </>
    )
}

export default Playlist
