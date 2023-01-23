import React from 'react';
import debounce from 'lodash.debounce';

import { SearchContext } from '../../App';

import styles from './Search.module.scss';

const Search = () => {
	const [value, setValue] = React.useState('');
	const { setSearchValue } = React.useContext(SearchContext);
	// eslint-disable-next-line
	const changeSearchValue = React.useCallback(
		debounce((str) => setSearchValue(str), 700),
		[],
	);
	const onChangeInput = (e) => {
		setValue(e.target.value);
		changeSearchValue(e.target.value);
	};

	return (
		<input
			className={styles.root}
			value={value}
			onChange={onChangeInput}
			placeholder="Search pizza..."
		/>
	);
};

export default Search;
