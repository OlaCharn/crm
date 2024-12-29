import styles from "./GlobalFilter.module.scss"

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
    <input
        value={globalFilter ?? ''}
        onChange={e => setGlobalFilter(e.target.value)}
        className={styles.globalFilter}
        placeholder="Search"
    />
);

export default GlobalFilter;