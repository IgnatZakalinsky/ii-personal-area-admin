import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import s from './MappedPlaylists.module.css'
import s2 from './Playlist.module.css'
import Playlist from './Playlist'
import {useDispatch, useSelector} from 'react-redux'
import {playlistsThunks, selectPlaylists} from '../../p2-bll/playlistsReducer'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import CustomSpin from '../../../../i1-main/m1-ui/u0-common/u5-spins/CustomSpin'
import {Button, Divider, Input, InputNumber, Modal, Tag} from 'antd'

const MappedPlaylists = () => {
    const {playlists} = useSelector(selectPlaylists)
    const {isLoading} = useSelector(selectApp)
    const [showAdd, setShowAdd] = useState(false)
    const [name, setName] = useState('')
    const [levelAccess, setLevelAccess] = useState(0)
    const [tags, setTags] = useState<string[]>([])
    const [isAddingTag, setIsAddingTag] = useState(false)
    const [tag, setTag] = useState('')

    const dispatch = useDispatch()
    const {getPlaylists, addPlaylist} = playlistsThunks

    useEffect(() => {
        if (!playlists.length) {
            dispatch(getPlaylists({}))
        }
    }, [playlists.length, dispatch, getPlaylists])

    const onAdd = useCallback(() => setShowAdd(true), [setShowAdd])
    const clear = useCallback(() => {
        setName('')
        setLevelAccess(0)
        setTags([])
    }, [setName, setLevelAccess, setTags])

    const closeAdd = useCallback(() => setShowAdd(false), [setShowAdd])
    const changeName = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value),
        [setName]
    )
    const changeTag = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setTag(e.currentTarget.value),
        [setTag]
    )
    const confirmTag = () => {
        setTags([...tags, tag])
        setTag('')
        setIsAddingTag(false)
    }
    const addingTag = useCallback(() => setIsAddingTag(true), [setIsAddingTag])

    const changeLevelAccess = useCallback(
        (value: string | number | null | undefined) => setLevelAccess(value ? +value : 0),
        [setLevelAccess]
    )
    const addPlaylistCallback = () => {
        dispatch(addPlaylist({
            playlist: {
                name,
                levelAccess,
                tags,
            }
        }))

        closeAdd()
    }

    const mappedPlaylists = playlists.map(p => (<Playlist key={p._id} playlist={p}/>))
    const mappedTags = tags.map((t, i) => (
        <Tag
            className="edit-tag"
            key={t + i}
            closable
            onClose={() => setTags(tags.filter((t2, i2) => i2 !== i))}
        >
            {/*<span*/}
            {/*    onDoubleClick={e => {*/}
            {/*        if (index !== 0) {*/}
            {/*            this.setState({ editInputIndex: index, editInputValue: tag }, () => {*/}
            {/*                this.editInput.focus();*/}
            {/*            });*/}
            {/*            e.preventDefault();*/}
            {/*        }*/}
            {/*    }}*/}
            {/*>*/}
            {/*  {isLongTag ? `${tag.slice(0, 20)}...` : tag}*/}
            {/*</span>*/}
            {t}
        </Tag>
    ))

    return (
        <div className={s.main}>

            {isLoading && !playlists.length ? (
                <CustomSpin/>
            ) : (
                <>
                    <Modal
                        visible={showAdd}
                        onOk={addPlaylistCallback}
                        okButtonProps={{
                            disabled: !name,
                        }}
                        onCancel={closeAdd}
                    >
                        <div>NEW PLAYLIST</div>
                        <Button danger onClick={clear}>clear</Button>

                        <div>name:</div>
                        <Input value={name} onChange={changeName}/>

                        <div>level access:</div>
                        <InputNumber min={0} value={levelAccess} onChange={changeLevelAccess}/>

                        <div>tags:</div>
                        {mappedTags}

                        {isAddingTag ? (
                            <Input
                                autoFocus
                                type="text"
                                size="small"
                                className="tag-input"
                                value={tag}
                                onChange={changeTag}
                                onBlur={confirmTag}
                                onPressEnter={confirmTag}
                            />
                        ) : (
                            <Tag className="site-tag-plus" onClick={addingTag}>
                                + New Tag
                            </Tag>
                        )}

                    </Modal>

                    {/*table header*/}
                    <div className={s2.pl}>
                        <div className={s2.name}>Name</div>
                        <div className={s2.tags}>Tags</div>
                        <div className={s2.updated}>updated</div>
                        <div className={s2.created}>created</div>
                        <div className={s2.buttons}>
                            <Button disabled={isLoading} onClick={onAdd}>add</Button>
                            {/*<Button>add</Button>*/}
                        </div>
                    </div>
                    <Divider/>

                    {mappedPlaylists}
                </>
            )}

        </div>
    )
}

export default MappedPlaylists
