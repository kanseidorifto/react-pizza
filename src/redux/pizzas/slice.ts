import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncAction';
import { Pizza, Status } from './types';

interface PizzasSliceState {
	items: Pizza[];
	status: Status;
}

const initialState: PizzasSliceState = {
	items: [],
	status: Status.LOADING,
};

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<Pizza[]>) => {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING;
			state.items = initialState.items;
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = initialState.items;
		});
	},
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
