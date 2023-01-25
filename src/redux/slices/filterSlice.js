import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	currentPage: 1,
	sortType: 'rating',
	orderType: true,
	searchValue: '',
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId: (state, action) => {
			state.categoryId = action.payload;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setSortType: (state, action) => {
			state.sortType = action.payload;
		},
		setOrderType: (state, action) => {
			state.orderType = action.payload;
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
		},
		setFilters: (state, action) => {
			state.categoryId = Number(action.payload.categoryId);
			state.sortType = action.payload.sortType;
			state.orderType = action.payload.orderType;
			state.currentPage = Number(action.payload.currentPage);
		},
		resetFilters: (state, action) => {
			// state = { ...state, initialState };
			state.categoryId = initialState.categoryId;
			state.currentPage = initialState.currentPage;
			state.sortType = initialState.sortType;
			state.orderType = initialState.orderType;
			state.searchValue = initialState.searchValue;
		},
	},
});

export const selectFilter = (state) => state.filter;

export const {
	setCategoryId,
	setCurrentPage,
	setSortType,
	setOrderType,
	setSearchValue,
	setFilters,
	resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
