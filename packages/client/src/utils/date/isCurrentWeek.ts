const getWeekStart = (date: Date) => {
    const day = new Date(date).getDay()
    return new Date(date.setDate(date.getDate() - day + (day === 0 ? -6 : 1)))
}

export const isCurrentWeek = (date: Date) => {
    const today = new Date()
    const todayWeekStart = getWeekStart(today)
    const dateWeekStart = getWeekStart(date)

    return (
        dateWeekStart.toLocaleDateString() ===
        todayWeekStart.toLocaleDateString()
    )
}
