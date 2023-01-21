import React from 'react';

import style from './NotFoundBlock.module.scss';

const NotFound = () => {
	return (
		<div className={style.root}>
			<h1>
				<span>:(</span>
				<br />
				Nothing found
			</h1>
			<p className={style.description}>Sorry, this page is not available on our website.</p>
		</div>
	);
};

export default NotFound;
