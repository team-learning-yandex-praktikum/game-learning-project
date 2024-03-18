import { resourcesApi, userApi } from '@/api'
import { UpdatingProfileDTO } from '@/api/user/types'
import { ErrorResponse } from '@/types'

export const updateAvatar = async (file: FormData) => {
  try {
    const updateProfile = await userApi.updateAvatar(file)
    const avatar = await resourcesApi.get(updateProfile.avatar)
    return avatar
  } catch (e) {
    const error = e as ErrorResponse
    console.error(error.response?.data.reason)
    return ''
  }
}

export const updatePassword = async (data: {
  old_password: string
  new_password: string
}) => {
  try {
    await userApi.updatePassword({
      oldPassword: data.old_password,
      newPassword: data.new_password,
    })
  } catch (e) {
    const error = e as ErrorResponse
    console.error(error.response?.data.reason)
  }
}

export const updateProfile = async (data: UpdatingProfileDTO) => {
  try {
    const newProfileInfo = await userApi.updateProfile(data)
    return newProfileInfo
  } catch (e) {
    const error = e as ErrorResponse
    console.error(error.response?.data.reason)
  }
}
