import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import s from './Playlist.module.css'
import {Button, Input, InputNumber, Tag} from 'antd'
import {useSelector} from 'react-redux'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import {playlistsActions, playlistsThunks, selectPlaylists} from '../../p2-bll/playlistsReducer'
import {useActions} from '../../../../i1-main/m2-bll/helpers'

const PlaylistFind = () => {
    const {isLoading} = useSelector(selectApp)
    const {name, tags, levelAccess} = useSelector(selectPlaylists)
    const {setName, setTags, setLevelAccess, getPlaylists} = useActions({...playlistsActions, ...playlistsThunks})
    const [isChange, setIsChange] = useState(false)
    const [idTimeout, setIdTimeout] = useState(0)

    const [isAddingTag, setIsAddingTag] = useState(false)
    const [tag, setTag] = useState('')

    const setChange = useCallback(() => {
        clearTimeout(idTimeout)
        const id = window.setTimeout(() => {
            setIsChange(true)
            setIdTimeout(0)
        }, 1500)
        setIdTimeout(id)
    }, [idTimeout])

    useEffect(() => {
        if (isChange && !isLoading) {
            getPlaylists()
            setIsChange(false)
        }
    }, [setChange, isChange, setIsChange, getPlaylists, isLoading])

    const changeName = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setName({name: e.currentTarget.value})
            setChange()
        },
        [setChange, setName]
    )
    const changeTag = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setTag(e.currentTarget.value),
        [setTag]
    )
    const confirmTag = () => {
        setTags({tags: [...tags, tag]})
        setTag('')
        setIsAddingTag(false)
        setChange()
    }
    const addingTag = useCallback(() => setIsAddingTag(true), [setIsAddingTag])
    const changeLevelAccess = useCallback(
        (value: string | number | null | undefined) => {
            setLevelAccess({levelAccess: value ? +value : 0})
            setChange()
        },
        [setChange, setLevelAccess]
    )

    const mappedTags = tags.map((t, i) => (
        <Tag
            className="edit-tag"
            key={t + i}
            closable
            onClose={() => {
                setTags({tags: tags.filter((t2, i2) => i2 !== i)})
                setChange()
            }}
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
        <div className={s.pl}>
            <div className={s.name}>
                <Input value={name} onChange={changeName}/>
            </div>

            <div className={s.lvl}>
                <InputNumber min={0} value={levelAccess} onChange={changeLevelAccess}/>
            </div>

            <div className={s.tags}>
                {mappedTags}

                {isAddingTag ? (
                    <Input
                        autoFocus
                        type={'text'}
                        size={'small'}
                        className={'tag-input'}
                        value={tag}
                        onChange={changeTag}
                        onBlur={confirmTag}
                        onPressEnter={confirmTag}
                    />
                ) : (
                    <Tag className={'site-tag-plus'} onClick={addingTag}>
                        + find Tag
                    </Tag>
                )}
            </div>

            <div className={s.updated}/>
            <div className={s.created}/>

            <div className={s.buttons}>
                <Button type="primary" icon={'🔍 '} loading={isLoading} onClick={getPlaylists}>
                    Search
                    {idTimeout !== 0 && '...'}
                </Button>
            </div>
        </div>
    )
}

export default PlaylistFind
