import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalPrice: 0,
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const findItem = state.items.find((item) => item.id === action.payload.id);

			if (findItem) {
				findItem.count += 1;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}

			state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0);
		},
		minusItem: (state, action) => {
			const findItem = state.items.find((item) => item.id === action.payload);

			if (findItem) {
				findItem.count -= 1;
			}
			if (findItem.count < 1) {
				state.items = state.items.filter((obj) => obj !== findItem);
			}
			state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0);
		},
		removeItem: (state, action) => {
			state.items = state.items.filter((obj) => obj !== action.payload);

			state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0);
		},
		clearItems: (state, action) => {
			state.items = initialState.items;
			state.totalPrice = initialState.totalPrice;
		},
	},
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
