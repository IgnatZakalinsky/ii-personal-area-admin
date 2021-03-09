import React, {ChangeEvent, useCallback, useState} from 'react'
import {Button, Input, InputNumber, message, Modal, Tag, DatePicker, Select, Checkbox} from 'antd'
import moment from 'moment'
import {SelectValue} from 'antd/es/select'
import {Option} from 'antd/es/mentions'

type VideoModalPropsType = {
    show: boolean
    callback: (
        name: string,
        levelAccess: number,
        tags: string[],
        startDate: number,
        endDate: number,
        courseId: string,
        url: string,
        playlistId: string,
    ) => void
    close: () => void
    defName?: string
    defUrl?: string
    defPlaylistId?: string
    defLevelAccess?: number
    defTags?: string[]
    defStartDate?: number
    defEndDate?: number
    defCourseId?: string
}

const VideoModal: React.FC<VideoModalPropsType> = (
    {
        show, callback, close,
        defName = '', defLevelAccess = 0, defTags = [],
        defStartDate, defEndDate, defCourseId, defUrl = '',
        defPlaylistId = ''
    }
) => {
    const [name, setName] = useState(defName)
    const [levelAccess, setLevelAccess] = useState(defLevelAccess)
    const [tags, setTags] = useState<string[]>(defTags)
    const [isAddingTag, setIsAddingTag] = useState(false)
    const [tag, setTag] = useState('')
    const [url, setUrl] = useState(defUrl)
    const [auto, setAuto] = useState(true)

    const defStart = moment().unix() * 1000 - (1000 * 60 * 60 * 24 * 366 * 2) // - 2 ears
    const defEnd = moment().unix() * 1000 + (1000 * 60 * 60 * 24 * 366 * 2) // + 2 ears
    const [startDate, setStartDate] = useState(defStartDate || defStart)
    const [endDate, setEndDate] = useState(defEndDate || defEnd)
    const [courseId, setCourseId] = useState(defCourseId || '1')

    const clear = useCallback(() => {
        setName('')
        setLevelAccess(0)
        setTags([])
        setStartDate(defStart)
        setEndDate(defEnd)
        setCourseId('1')
        setAuto(true)
    }, [setName, setLevelAccess, setTags])
    const changeName = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value),
        [setName]
    )
    const changeUrl = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            let value = e.currentTarget.value
            if (auto) value = value.replace('watch?v=', 'embed/')

            setUrl(value)
        },
        [setUrl]
    )

    const changeCourseId = useCallback(
        (e: SelectValue) => setCourseId(e.toString()),
        [setCourseId]
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
        setTags([...tags, tag])
        setTag('')
        setIsAddingTag(false)
    }
    const addingTag = useCallback(() => setIsAddingTag(true), [setIsAddingTag])
    const changeLevelAccess = useCallback(
        (value: string | number | null | undefined) => setLevelAccess(value ? +value : 0),
        [setLevelAccess]
    )
    const onOk = () => {
        callback(name, levelAccess, tags, startDate, endDate, courseId, url, defPlaylistId)
    }

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
        <Modal
            visible={show}
            onOk={onOk}
            okButtonProps={{disabled: !name || !url}}
            onCancel={close}
        >
            <div>NEW VIDEO</div>
            <Button danger onClick={clear}>clear</Button>

            <div>courseId:</div>
            <Select value={courseId} onChange={changeCourseId} style={{width: 120}}>
                <Option value={'1'}>react (1)</Option>
                <Option value={'2'}>html/css (2)</Option>
            </Select>

            <div>playlistId:</div>
            <div>
                {defPlaylistId || 'all'}
            </div>

            <div>name:</div>
            <Input value={name} onChange={changeName}/>

            <div>url:</div>
            <div onClick={() => setAuto(!auto)}>
                <Checkbox checked={auto}/>
                <span style={{cursor: "pointer"}}> auto 'watch?v=' ={'>'} 'embed/' for YouTube</span>
            </div>
            <Input value={url} onChange={changeUrl}/>

            <div>level access:</div>
            <InputNumber min={0} value={levelAccess} onChange={changeLevelAccess}/>

            <div>tags:</div>
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
                    + New Tag
                </Tag>
            )}

            <div>start date:</div>
            <DatePicker
                onChange={e => setStartDate(e ? e.unix() * 1000 : defStart)}
                format={'DD/MM/YYYY'}
                value={moment(startDate)}
            />
            <div>end date:</div>
            <DatePicker
                onChange={e => setEndDate(e ? e.unix() * 1000 : defEnd)}
                format={'DD/MM/YYYY'}
                value={moment(endDate)}
            />
        </Modal>
    )
}

export default VideoModal
