import { SearchIcon } from '@assets/icons'
import styles from './searchInput.module.css'
import useSearchInput from './useSearchInput'

const SearchInput = () => {
    const { searchValue, handleSearchInputChange } = useSearchInput()

    return (
        <div className={styles.root}>
            <input
                className={styles.input}
                placeholder={'Поиск по названию темы'}
                value={searchValue}
                onChange={handleSearchInputChange}
            />
            <SearchIcon className={styles.icon} />
        </div>
    )
}

export default SearchInput
