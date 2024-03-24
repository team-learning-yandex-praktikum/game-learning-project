export enum ForumSection {
    all = 'all',
    new = 'new',
}

export const forumSectionTranslations: Record<ForumSection, string> = {
    [ForumSection.all]: 'Все темы',
    [ForumSection.new]: 'Создать тему',
}
