import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import NotFound from './components/NotFoundBlock';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart"*/ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPiza"*/ './pages/FullPizza'));

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Home />} />
				<Route
					path="cart"
					element={
						<Suspense fallback={<div>Loading cart...</div>}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					path="pizza/:id"
					element={
						<Suspense fallback={<div>Loading cart...</div>}>
							<FullPizza />
						</Suspense>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
