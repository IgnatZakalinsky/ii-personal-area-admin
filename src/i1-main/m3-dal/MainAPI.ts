import {loginInstance} from './instance'
import {UserType} from '../m2-bll/appReducer'

type LoginType = {
    error?: string
    token: string
}
type MeType = {
    error?: string
    user: UserType
}

export const MainAPI = {
    login: async () => {
        const response = await loginInstance.post<LoginType>('/auth/token')

        return response.data
    },
    me: async (token: string) => {
        const response = await loginInstance.get<MeType>(`/auth/me/${token}`)

        return response.data
    },

}
