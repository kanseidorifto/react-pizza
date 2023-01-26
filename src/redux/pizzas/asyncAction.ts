import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, FetchPizzasArgs } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
	'pizza/fetchPizzasStatus',
	async (params: FetchPizzasArgs) => {
		const { currentPage, category, sort, order, search } = params;
		const { data } = await axios.get<Pizza[]>(
			`https://63cc0da05c6f2e1d84c0bfa6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sort}&order=${order}${search}`,
		);
		return data;
	},
);
