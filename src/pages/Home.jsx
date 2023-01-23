import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
	const dispatch = useDispatch();
	const categoryId = useSelector((state) => state.filter.categoryId);
	const currentPage = useSelector((state) => state.filter.currentPage);
	const selectedSort = useSelector((state) => state.filter.sortType);
	const orderType = useSelector((state) => state.filter.orderType);

	const onClickCategory = (i) => {
		dispatch(setCategoryId(i));
	};
	const onChangePage = (i) => {
		dispatch(setCurrentPage(i));
	};

	const { searchValue } = React.useContext(SearchContext);
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		setIsLoading(true);

		const category = categoryId > 0 ? `&category=${categoryId}` : '';
		const order = orderType ? 'desc' : 'asc';
		const search = searchValue ? `&search=${searchValue}` : '';

		axios
			.get(
				`https://63cc0da05c6f2e1d84c0bfa6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${selectedSort}&order=${order}${search}`,
			)
			.then((res) => {
				setItems(res.data);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, selectedSort, orderType, searchValue, currentPage]);

	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
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
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
