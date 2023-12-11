import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCollectionItems } from '../constants/initialValues';

export interface CollectionItem {
	movie_id: string;
	movie_title: string;
	movie_year: string;
	actors: string[];
	img: string;
	user_id: string;
	genre?: string;
	user_score?: string;
}

export interface CollectionState {
	items: CollectionItem[];
}

export const initialState: CollectionState = {
	items: initialCollectionItems,
};

export const collectionSlice = createSlice({
	name: 'collection',
	initialState,
	reducers: {
		setCollection: (state, action: PayloadAction<CollectionItem[]>) => {
			state.items = action.payload;
		},
	},
});

export const { setCollection } = collectionSlice.actions;

export default collectionSlice.reducer;
