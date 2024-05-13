export const removeSeconds = (time: string) => {
    const splitTime = time.split(':')
    splitTime.pop()
    return splitTime.join(':')
}
