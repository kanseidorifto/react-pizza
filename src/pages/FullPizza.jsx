import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../scss/app.scss';

const FullPizza = () => {
	const typeNames = ['slim', 'traditional'];
	const [pizza, setPizza] = React.useState();
	const navigate = useNavigate();
	const { id } = useParams();

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get('https://63cc0da05c6f2e1d84c0bfa6.mockapi.io/items/' + id);
				setPizza(data);
			} catch (error) {
				alert('404 Not Found');
				navigate('/');
			}
		}
		fetchPizza();
	}, [id, navigate]);

	if (!pizza) {
		return 'Loading...';
	}
	const { title, price, imageUrl, sizes, types } = pizza;
	return (
		<>
			<img className="pizza-block__image" src={imageUrl} alt="Pizza" />
			<h4 className="pizza-block__title">{title}</h4>
			<div className="pizza-block__selector">
				<ul>
					{types.map((type, i) => (
						<li key={i}>{typeNames[type]}</li>
					))}
				</ul>
				<ul>
					{sizes.map((size, i) => (
						<li key={i}>{size} cm.</li>
					))}
				</ul>
			</div>
			<div className="pizza-block__bottom">
				<div className="pizza-block__price">from {price} $</div>
			</div>
		</>
	);
};

export default FullPizza;
