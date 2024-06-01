export const joinURL = (
    ...parts: Array<string | number | undefined | null>
): string => {
    const resolvedParts = parts
        .filter(Boolean)
        .map(part =>
            String(part)?.trim()?.replace(/^\/+/g, '')?.replace(/\/+$/g, '')
        )
        .filter(Boolean)

    return `/${resolvedParts.join('/')}`
}
