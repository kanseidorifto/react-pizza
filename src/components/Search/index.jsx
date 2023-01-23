import React from 'react';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';

const Search = () => {
	const { searchValue, setSearchValue } = React.useContext(SearchContext);
	return (
		<input
			className={styles.root}
			value={searchValue}
			onChange={(e) => setSearchValue(e.target.value)}
			placeholder="Search pizza..."
		/>
	);
};

export default Search;
