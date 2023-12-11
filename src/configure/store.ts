import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import setCollection from './collectionSlice';
import setPageData from './searchSlice';

export const rootReducer = {
	user: userReducer,
	collection: setCollection,
	search: setPageData,
};
export const store = configureStore({
	reducer: {
		user: userReducer,
		collection: setCollection,
		search: setPageData,
	},
});

export type RootState = ReturnType<typeof store.getState>;
