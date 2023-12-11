import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CollectionItem } from './collectionSlice';

export interface User {
	id: string;
	img: string;
	email: string;
	username: string;
	region?: number;
	collection?: CollectionItem[];
	signed_up?: boolean | undefined;
}

export const initialState: User = {
	id: '',
	img: '',
	email: '',
	username: '',
	region: 0,
	collection: [],
	signed_up: undefined,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			return action.payload;
		},
		updateUser: (state, action: PayloadAction<Partial<User>>) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { setUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
