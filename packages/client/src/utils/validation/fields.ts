export enum FIELDS {
  login = 'login',
  password = 'password',
  repeat_password = 'repeat_password',
  first_name = 'first_name',
  second_name = 'second_name',
  email = 'email',
  phone = 'phone',
}

export type FieldValues = Record<FIELDS, string>
