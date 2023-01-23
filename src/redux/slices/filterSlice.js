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
		setFilters: (state, action) => {
			state.categoryId = action.payload.categoryId;
			state.sortType = action.payload.sortType;
			state.orderType = action.payload.orderType;
			state.currentPage = action.payload.currentPage;
		},
		resetFilters: (state, action) => {
			// state = { ...state, initialState };
			state.categoryId = initialState.categoryId;
			state.sortType = initialState.sortType;
			state.orderType = initialState.orderType;
			state.currentPage = initialState.currentPage;
		},
	},
});

export const {
	setCategoryId,
	setCurrentPage,
	setSortType,
	setOrderType,
	setFilters,
	resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
