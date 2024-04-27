import { http, HttpResponse } from 'msw'
import { joinURL } from '@utils/url/joinURL'
import { EXTERNAL_SERVER_PATH, SERVER_URL } from '@api/baseApi/constants'
import { UserDTO } from '@api/auth/types'
import { transformData } from '@utils/data'
import { UpdatingProfileDTO } from '@api/user/types'

export const userInfoStub: UserDTO = {
    id: 111,
    login: 'ivan',
    display_name: null,
    avatar: null,
    first_name: 'Иван',
    second_name: 'Иванов',
    email: 'ivan@test.ru',
    phone: '79999999999',
}

const baseServerUrl = joinURL(SERVER_URL, EXTERNAL_SERVER_PATH)
export const requestHandlers = {
    signup: http.post(joinURL(baseServerUrl, 'auth/signup'), () =>
        HttpResponse.text(String(userInfoStub.id))
    ),
    signin: http.post(joinURL(baseServerUrl, 'auth/signin'), () =>
        HttpResponse.text('OK')
    ),
    me: http.get(joinURL(baseServerUrl, 'auth/user'), () =>
        HttpResponse.json(userInfoStub)
    ),
    logout: http.post(joinURL(baseServerUrl, 'auth/logout'), () =>
        HttpResponse.text('OK')
    ),
    updatePassword: http.put(joinURL(baseServerUrl, 'user/password'), () =>
        HttpResponse.text('OK')
    ),
    updateProfile: http.put(
        joinURL(baseServerUrl, 'user/profile'),
        async ({ request }) => {
            const body = (await request.json()) as UpdatingProfileDTO
            return HttpResponse.json(
                transformData.from.dto({
                    ...userInfoStub,
                    ...body,
                })
            )
        }
    ),
}
