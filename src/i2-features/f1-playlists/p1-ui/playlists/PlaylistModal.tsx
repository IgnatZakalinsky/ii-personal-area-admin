import React, {ChangeEvent, useCallback, useState} from 'react'
import {Button, Input, InputNumber, Modal, Tag} from 'antd'

type PlaylistModalPropsType = {
    show: boolean
    callback: (name: string, levelAccess: number, tags: string[]) => void
    close: () => void
    defName?: string
    defLevelAccess?: number
    defTags?: string[]
}

const PlaylistModal: React.FC<PlaylistModalPropsType> = (
    {
        show, callback, close,
        defName = '', defLevelAccess = 0, defTags = []
    }
) => {
    const [name, setName] = useState(defName)
    const [levelAccess, setLevelAccess] = useState(defLevelAccess)
    const [tags, setTags] = useState<string[]>(defTags)
    const [isAddingTag, setIsAddingTag] = useState(false)
    const [tag, setTag] = useState('')

    const clear = useCallback(() => {
        setName('')
        setLevelAccess(0)
        setTags([])
    }, [setName, setLevelAccess, setTags])
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
    const onOk = () => {
        callback(name, levelAccess, tags)
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
            okButtonProps={{disabled: !name}}
            onCancel={close}
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
        </Modal>
    )
}

export default PlaylistModal
