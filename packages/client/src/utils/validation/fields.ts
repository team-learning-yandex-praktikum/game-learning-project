export enum FIELDS {
  login = 'login',
  password = 'password',
  repeat_password = 'repeat_password',
  first_name = 'first_name',
  second_name = 'second_name',
  email = 'email',
  phone = 'phone',
  old_password = 'old_password',
  new_password = 'new_password',
  new_password_repeat = 'new_password_repeat',
}

export type FieldValues = Record<FIELDS, string>
