import { SidebarSectionProps } from './types'
import styles from './sidebarSection.module.css'
import { unbrokenLine } from '../SidebarItem/helpers'
import { sidebarSlice } from '@store/sidebar'
import { useAppDispatch } from '@store/hooks'

const SidebarSection = <S extends string = string>({
    sections,
    selected,
    onSelect,
    mapKeysToSections,
}: SidebarSectionProps<S>) => {
    const dispatch = useAppDispatch()

    return (
        <div className={styles.sectionsContainer}>
            {sections?.map((section, index) => (
                <div
                    key={index}
                    className={styles.section}
                    data-active={section === selected}
                    onClick={e => {
                        dispatch(
                            sidebarSlice.actions.setSectionSelected(section)
                        )
                        onSelect?.(section, e)
                    }}
                >
                    {unbrokenLine(mapKeysToSections?.[section] ?? section)}
                </div>
            ))}
        </div>
    )
}

export default SidebarSection
