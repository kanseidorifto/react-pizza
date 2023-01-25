import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState('');
	// eslint-disable-next-line
	const changeSearchValue = React.useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str));
		}, 700),
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
