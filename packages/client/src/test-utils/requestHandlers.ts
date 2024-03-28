import { http, HttpResponse } from 'msw'
import { joinURL } from '@utils/url/joinURL'
import { BASE_API } from '@api/baseApi/constants'
import { UserDTO } from '@api/auth/types'
import { transformData } from '@utils'
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

export const requestHandlers = {
    signup: http.post(joinURL(BASE_API, 'auth/signup'), () =>
        HttpResponse.text(String(userInfoStub.id))
    ),
    signin: http.post(joinURL(BASE_API, 'auth/signin'), () =>
        HttpResponse.text('OK')
    ),
    me: http.get(joinURL(BASE_API, 'auth/user'), () =>
        HttpResponse.json(userInfoStub)
    ),
    logout: http.post(joinURL(BASE_API, 'auth/logout'), () =>
        HttpResponse.text('OK')
    ),
    updatePassword: http.put(joinURL(BASE_API, 'user/password'), () =>
        HttpResponse.text('OK')
    ),
    updateProfile: http.put(
        joinURL(BASE_API, 'user/profile'),
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
