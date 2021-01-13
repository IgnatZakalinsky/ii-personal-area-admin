import {useDispatch} from 'react-redux'
import {ActionCreatorsMapObject, bindActionCreators} from 'redux'
import {useMemo} from 'react'
import store from './store'

export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()

// https://medium.com/@d.maklygin/redux-typescript-reuse-the-type-of-an-action-creators-return-value-91663a48858f
type IsValidArg<T> = T extends object ? keyof T extends never ? false : true : true;
export type ActionCreatorResponse<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>
export type ReplaceReturnType<T, TNewReturn> = T extends (a: infer A) => infer R
    ? (IsValidArg<A> extends true ? (a: A) => TNewReturn : () => TNewReturn)
    : never
export type RemapActionCreators<T extends ActionCreatorsMapObject> = {
    [K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>
}

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
    const dispatch = useAppDispatch()

    // return useMemo(() => bindActionCreators<T, any>(actions, dispatch), [actions, dispatch])
    return useMemo(() =>
        bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch), [actions, dispatch])
}
