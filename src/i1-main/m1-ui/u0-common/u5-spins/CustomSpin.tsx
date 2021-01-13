import React from 'react'
import s from './CustomSpin.module.css'
import {Spin} from 'antd'
import {SpinProps, SpinSize} from 'antd/es/spin'

type CustomSpinPropsType = SpinProps & {

}

const CustomSpin: React.FC<CustomSpinPropsType> = React.memo((
    {
        size = 'large' as SpinSize,
        className,

        ...restProps
    }
) => {

    return (
        <div className={className || s.base}>
            <Spin size={size} {...restProps}/>
        </div>
    )
})

export default CustomSpin
