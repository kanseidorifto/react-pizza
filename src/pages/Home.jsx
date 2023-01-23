import React from 'react';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
	const { searchValue } = React.useContext(SearchContext);
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [selectedSort, setSelectedSort] = React.useState('rating');
	const [orderType, setOrderType] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(1);

	React.useEffect(() => {
		setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const order = orderType ? 'desc' : 'asc';
		const search = searchValue ? `&search=${searchValue}` : '';

		fetch(
			`https://63cc0da05c6f2e1d84c0bfa6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${selectedSort}&order=${order}${search}`,
		)
			.then((res) => res.json())
			.then((arr) => setItems(arr))
			.finally(setIsLoading(false));
		window.scrollTo(0, 0);
	}, [categoryId, selectedSort, orderType, searchValue, currentPage]);

	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
	const pizzas = items
		.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
		.map((obj, index) => <PizzaBlock key={index} {...obj} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onClickCategory={setCategoryId} />
				<Sort
					value={selectedSort}
					onSelectSort={setSelectedSort}
					order={orderType}
					onChangeOrder={setOrderType}
				/>
			</div>
			<h2 className="content__title">Pizza's</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={setCurrentPage} />
		</div>
	);
};

export default Home;
