import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../redux/store';
import { FilterSliceState, setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { selectPizzas } from '../redux/pizzas/selectors';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizzas/asyncAction';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);
	const { items, status } = useSelector(selectPizzas);
	const { categoryId, currentPage, sortType, orderType, searchValue } = useSelector(selectFilter);

	const onClickCategory = React.useCallback((index: number) => {
		dispatch(setCategoryId(index));
	}, []);
	const onChangePage = (index: number) => {
		dispatch(setCurrentPage(index));
	};

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				categoryId,
				sortType,
				orderType,
				currentPage,
				// search: searchValue,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true; // eslint-disable-next-line
	}, [categoryId, sortType, orderType, currentPage]);

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as unknown as FilterSliceState;
			dispatch(setFilters(params));
			isSearch.current = true;
		} // eslint-disable-next-line
	}, []);

	const getPizzas = async () => {
		const category = categoryId > 0 ? `&category=${categoryId}` : '';
		const page = String(currentPage);
		const sort = sortType;
		const order = orderType ? 'desc' : 'asc';
		const search = searchValue !== '' ? `&search=${searchValue}` : '';
		// const search = '';

		dispatch(fetchPizzas({ currentPage: page, category, sort, order, search }));
	};

	React.useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false; // eslint-disable-next-line
	}, [categoryId, sortType, orderType, searchValue, currentPage]);

	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
	const pizzas = items
		.filter((obj: any) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
		.map((obj: any, index: number) => <PizzaBlock key={index} {...obj} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onClickCategory={onClickCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Pizza's</h2>
			{status === 'error' ? (
				<div className="content__error-info">
					<h2>Error occured 😕</h2>
					<p>
						Failed to get pizzas. <br /> Try repeat later.
					</p>
				</div>
			) : (
				<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
