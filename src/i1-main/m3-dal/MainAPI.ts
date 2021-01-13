import {loginInstance} from './instance'
import {UserType} from '../m2-bll/appReducer'

type LoginType = {
    error?: string
    user: UserType
}

export const MainAPI = {
    login: async () => {
        // const response = await loginInstance.post<LoginType>('/auth/token')
        // const response = await loginInstance.post<LoginType>('/auth/token')
        const response = await loginInstance.get<LoginType>('/auth/me')

        return response.data
    },
}
