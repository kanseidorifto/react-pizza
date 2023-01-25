import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
	const { currentPage, category, sort, order, search } = params;
	const res = await axios.get(
		`https://63cc0da05c6f2e1d84c0bfa6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sort}&order=${order}${search}`,
	);
	return res.data;
});

const initialState = {
	items: [],
	status: 'loading', //loading | success | error
};

const pizzasSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state, action) => {
			state.status = 'loading';
			state.items = initialState.items;
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		},
		[fetchPizzas.rejected]: (state, action) => {
			state.status = 'error';
			state.items = initialState.items;
		},
	},
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
