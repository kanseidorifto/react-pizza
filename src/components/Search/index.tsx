import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/filter/slice';

const Search = () => {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState('');
	// eslint-disable-next-line
	const changeSearchValue = React.useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 700),
		[],
	);
	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		changeSearchValue(event.target.value);
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
