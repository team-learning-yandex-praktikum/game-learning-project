export const REGEXPS = {
    name: /^([A-Z]|[А-ЯЁ])([a-z]|[а-яё]|-)+$/,
    login: /^([A-z]|\d|-|_)+$/,
    email: /^(\w|-|\.)+@\w+\.\w+$/,
    phone: /^\+?\d+$/,
    integer: /^\d+$/,
    someInteger: /[0-9]/,
}
