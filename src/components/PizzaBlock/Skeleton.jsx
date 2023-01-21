import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={466}
		viewBox="0 0 280 466"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}>
		<circle cx="132" cy="123" r="123" />
		<rect x="0" y="260" rx="15" ry="15" width="280" height="27" />
		<rect x="0" y="318" rx="10" ry="10" width="280" height="76" />
		<rect x="-2" y="427" rx="10" ry="10" width="123" height="30" />
		<rect x="171" y="420" rx="30" ry="30" width="110" height="45" />
	</ContentLoader>
);

export default Skeleton;
