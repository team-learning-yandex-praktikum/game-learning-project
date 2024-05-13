export const isToday = (date: Date) => {
    const currentDate = new Date().toLocaleDateString()
    const localeDate = date.toLocaleDateString()
    return currentDate === localeDate
}
