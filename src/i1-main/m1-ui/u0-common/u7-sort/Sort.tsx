import React from 'react'
import {Button} from 'antd'

type SortPropsType = {
    propsName: string
    sort: string
    onChange: (sort: string) => void
    isLoading: boolean
}

const Sort: React.FC<SortPropsType> = ({sort, onChange, propsName, isLoading}) => {
    const up = (sort.length > 1 && sort[0] === '1' && sort.slice(1) === propsName) ? 'primary' : undefined
    const down = (sort.length > 1 && sort[0] === '0' && sort.slice(1) === propsName) ? 'primary' : undefined

    return (
        <>
            <Button
                type={up}
                onClick={() => onChange(1 + propsName)}
                disabled={isLoading}
                ghost
                style={{marginLeft: 5}}
            >
                ↑
            </Button>
            <Button type={down} onClick={() => onChange(0 + propsName)} disabled={isLoading} ghost>
                ↓
            </Button>
        </>
    )
}

export default Sort
