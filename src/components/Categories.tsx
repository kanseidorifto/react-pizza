import React from 'react';

type CategoriesProps = {
	value: number;
	onClickCategory: (index: number) => void;
};

const categories = ['All', 'Meal', 'Vegeterian', 'Grill', 'Chilly', 'Closed'];

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
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
};

export default Categories;
