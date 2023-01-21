import React from 'react';

function Categories() {
	const [activeCategory, setActiveCategory] = React.useState(0);

	const categories = ['All', 'Meal', 'Vegeterian', 'Grill', 'Chilly', 'Closed'];

	return (
		<div className="categories">
			<ul>
				{categories.map((value, index) => (
					<li
						onClick={() => setActiveCategory(index)}
						className={activeCategory === index ? 'active' : ''}
						key={index}>
						{value}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Categories;
