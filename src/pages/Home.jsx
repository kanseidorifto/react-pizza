import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { items, status } = useSelector((state) => state.pizzas);
	const { categoryId, currentPage, sortType, orderType } = useSelector((state) => state.filter);

	const onClickCategory = (i) => {
		dispatch(setCategoryId(i));
	};
	const onChangePage = (i) => {
		dispatch(setCurrentPage(i));
	};

	const { searchValue } = React.useContext(SearchContext);

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				categoryId,
				sortType,
				orderType,
				currentPage,
				// limit: 4,
				// search: searchValue,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true; // eslint-disable-next-line
	}, [categoryId, sortType, orderType, currentPage]);

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			dispatch(setFilters({ ...params }));
			isSearch.current = true;
		} // eslint-disable-next-line
	}, []);

	const getPizzas = async () => {
		const category = categoryId > 0 ? `&category=${categoryId}` : '';
		const sort = sortType;
		const order = orderType ? 'desc' : 'asc';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(fetchPizzas({ currentPage, category, sort, order, search }));
	};

	React.useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false; // eslint-disable-next-line
	}, [categoryId, sortType, orderType, searchValue, currentPage]);

	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
	console.log(categoryId);
	const pizzas = items
		.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
		.map((obj, index) => <PizzaBlock key={index} {...obj} />);

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
