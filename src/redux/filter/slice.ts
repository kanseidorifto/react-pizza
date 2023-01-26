import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortType } from './types';

export interface FilterSliceState {
	categoryId: number;
	currentPage: number;
	sortType: SortType;
	orderType: boolean;
	searchValue: string;
}

const initialState: FilterSliceState = {
	categoryId: 0,
	currentPage: 1,
	sortType: SortType.RATING,
	orderType: true,
	searchValue: '',
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setSortType: (state, action: PayloadAction<SortType>) => {
			state.sortType = action.payload;
		},
		setOrderType: (state, action: PayloadAction<boolean>) => {
			state.orderType = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		setFilters: (state, action: PayloadAction<FilterSliceState>) => {
			if (Object.keys(action.payload).length) {
				state.categoryId = Number(action.payload.categoryId);
				state.currentPage = Number(action.payload.currentPage);
				state.sortType = action.payload.sortType;
				state.orderType = action.payload.orderType;
			} else {
				resetFilters();
				console.log('set->reset filter');
			}
		},
		resetFilters: (state) => {
			state.categoryId = initialState.categoryId;
			state.currentPage = initialState.currentPage;
			state.sortType = initialState.sortType;
			state.orderType = initialState.orderType;
			state.searchValue = initialState.searchValue;
		},
	},
});

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
