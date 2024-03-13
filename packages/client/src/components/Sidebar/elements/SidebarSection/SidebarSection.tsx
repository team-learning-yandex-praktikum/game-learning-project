import { SidebarSectionProps } from './types'
import styles from './sidebarSection.module.css'
import { unbrokenLine } from '../SidebarItem/helpers'

const SidebarSection = <S extends string = string>({
  sections,
  selected,
  onSelect,
}: SidebarSectionProps<S>) => {
  return (
    <div className={styles.sectionsContainer}>
      {sections?.map((section, index) => (
        <div
          key={index}
          className={styles.section}
          data-active={section === selected}
          onClick={e => onSelect?.(section, e)}>
          {unbrokenLine(section)}
        </div>
      ))}
    </div>
  )
}

export default SidebarSection
