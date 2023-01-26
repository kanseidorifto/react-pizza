import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	type: number;
	size: number;
	count: number;
};

interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}

const initialState: CartSliceState = {
	totalPrice: 0,
	items: [],
};

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

			state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0);
		},
		minusItem: (state, action: PayloadAction<string>) => {
			const findItem = state.items.find((item) => item.id === action.payload);

			if (findItem) {
				findItem.count -= 1;
			}
			if (!findItem || findItem.count < 1) {
				state.items = state.items.filter((obj) => obj !== findItem);
			}
			state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0);
		},
		removeItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((obj) => obj.id !== action.payload);

			state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0);
		},
		clearItems: (state) => {
			state.items = initialState.items;
			state.totalPrice = initialState.totalPrice;
		},
	},
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
	state.cart.items.find((item) => item.id === id, 0);

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
