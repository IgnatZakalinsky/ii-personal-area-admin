import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import s from './Video.module.css'
import {Button, Input, InputNumber, message, Tag} from 'antd'
import {useSelector} from 'react-redux'
import {selectApp} from '../../../../i1-main/m2-bll/appReducer'
import {useActions} from '../../../../i1-main/m2-bll/helpers'
import {selectVideos, videosActions, videosThunks} from '../../v2-bll/videosReducer'
import {useParams} from 'react-router-dom'

const VideoFind = () => {
    const {isLoading} = useSelector(selectApp)
    const {name, tags, levelAccess} = useSelector(selectVideos)
    const {setName, setTags, setLevelAccess, getVideos} = useActions({...videosActions, ...videosThunks})
    const [isChange, setIsChange] = useState(false)
    const [idTimeout, setIdTimeout] = useState(0)
    const {playlistId} = useParams<{playlistId: string}>()

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
            getVideos()
            setIsChange(false)
        }
    }, [setChange, isChange, setIsChange, getVideos, isLoading])

    const changeName = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setName({name: e.currentTarget.value})
            setChange()
        },
        [setChange, setName]
    )
    const changeTag = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value
            if (value.indexOf(',') !== -1) message.warn('del [ , ]')
            setTag(value.replace(',', ''))
        },
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
        <div className={s.vi}>
            <div className={s.courseId}>
                Playlist id:
            </div>

            <div className={s.playlistId}>
                {playlistId || 'all'}
            </div>

            <div className={s.name}>
                <Input value={name} onChange={changeName}/>
            </div>

            <div className={s.url}/>

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

            {/*доступно для юзеров от/до*/}
            <div className={s.date}/>
            <div className={s.date}/>

            <div className={s.date}/>
            <div className={s.date}/>

            <div className={s.buttons}>
                <Button type="primary" icon={'🔍 '} loading={isLoading} onClick={getVideos}>
                    Search
                    {idTimeout !== 0 && '...'}
                </Button>
            </div>
        </div>
    )
}

export default VideoFind
