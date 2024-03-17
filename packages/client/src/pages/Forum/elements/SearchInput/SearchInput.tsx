import { FC } from 'react'
import { SearchIcon } from '@assets/icons'
import styles from './searchInput.module.css'

const SearchInput: FC = () => {
  return (
    <div className={styles.root}>
      <input className={styles.input} placeholder={'Поиск по названию темы'} />
      <SearchIcon className={styles.icon} />
    </div>
  )
}

export default SearchInput
