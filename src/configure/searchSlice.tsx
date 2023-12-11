import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialCollectionItems } from '../constants/initialValues';
import { CollectionItem } from './collectionSlice';

export interface SearchState {
	items: CollectionItem[];
}
const initialState: SearchState = {
	items: initialCollectionItems,
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setPageData: (state, action: PayloadAction<CollectionItem[]>) => {
			state.items = action.payload;
		},
	},
});

export const { setPageData } = searchSlice.actions;

export default searchSlice.reducer;
