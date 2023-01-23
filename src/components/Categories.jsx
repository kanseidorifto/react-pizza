import React from 'react';

function Categories({ value, onClickCategory }) {
	const categories = ['All', 'Meal', 'Vegeterian', 'Grill', 'Chilly', 'Closed'];

	return (
		<div className="categories">
			<ul>
				{categories.map((obj, index) => (
					<li
						onClick={() => onClickCategory(index)}
						className={value === index ? 'active' : ''}
						key={index}>
						{obj}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Categories;
