export const unbrokenLine = (value: string) => {
  return value.split(' ').join('\u00A0')
}
