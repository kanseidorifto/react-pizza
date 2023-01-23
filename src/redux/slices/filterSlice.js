import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	currentPage: 1,
	sortType: 'rating',
	orderType: true,
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId: (state, action) => {
			state.categoryId = action.payload;
		},
		setSortType: (state, action) => {
			state.sortType = action.payload;
		},
		setOrderType: (state, action) => {
			state.orderType = action.payload;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
	},
});

export const { setCategoryId, setCurrentPage, setSortType, setOrderType } = filterSlice.actions;

export default filterSlice.reducer;
