import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		setIsLoading(true);
		fetch('https://63cc0da05c6f2e1d84c0bfa6.mockapi.io/items')
			.then((res) => res.json())
			.then((arr) => setItems(arr))
			.finally(setIsLoading(false));
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Pizza's</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map((obj, index) => <PizzaBlock key={index} {...obj} />)}
			</div>
		</div>
	);
};

export default Home;
