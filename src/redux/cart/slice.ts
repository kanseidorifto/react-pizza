import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { CartItem } from './types';

interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<CartItem>) => {
			const findItem = state.items.find((item) => item.id === action.payload.id);

			if (findItem) {
				findItem.count += 1;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}

			state.totalPrice = calcTotalPrice(state.items);
		},
		minusItem: (state, action: PayloadAction<string>) => {
			const findItem = state.items.find((item) => item.id === action.payload);

			if (findItem && findItem.count > 1) {
				findItem.count -= 1;
			}
			state.totalPrice = calcTotalPrice(state.items);
		},
		removeItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((obj) => obj.id !== action.payload);

			state.totalPrice = calcTotalPrice(state.items);
		},
		clearItems: (state) => {
			state.items = [] as CartItem[];
			state.totalPrice = 0;
		},
	},
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
