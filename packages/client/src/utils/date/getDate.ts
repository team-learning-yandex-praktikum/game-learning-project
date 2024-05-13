export const getDate = (date: Date | string): string => {
    const resolvedDate = typeof date === 'string' ? new Date(date) : date
    return resolvedDate.toLocaleString('ru').split(',')[0]
}
