import { CollectionItem } from '../configure/collectionSlice';
import { User } from '../configure/userSlice';
//
export interface initialIMdbItemT {
	'#IMDB_ID': string;
	'#TITLE': string;
	'#YEAR': number;
	'#ACTORS': string;
	'#IMG_POSTER': string;
}
export interface updatedUserDetails {
	username: string;
	email: string;
	img: string;
	region: number;
}

export const DataFnIMdb = async (search: string) => {
	try {
		const response = await fetch(
			`https://search.imdbot.workers.dev/?q=${search}`
		);
		const data = await response.json();
		const returnData: initialIMdbItemT[] = data.description;
		return returnData;
	} catch (error) {
		console.error('There was an error fetching data from IMdb');
		throw error;
	}
};

// user-related calls
export const fetchUser = async (id: string, token: string) => {
	try {
		const response = await fetch(
			`https://reel-rewind-backend.onrender.com/user/${id}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Allow-Access-Control-Origin': '*',
				},
			}
		);
		const returnData = await response.json();
		return returnData;
	} catch (error) {
		return false;
	}
};

export const createUser = async (userData: User, token: string) => {
	try {
		const response = await fetch(
			`https://reel-rewind-backend.onrender.com/sign-up`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			}
		);
		if (!response.ok) {
			throw new Error('response not okay');
		}
		return response;
	} catch (error) {
		console.error('there was an error adding this user');
		throw error;
	}
};

export const updateUserDetails = async (
	details: updatedUserDetails,
	id: string,
	token: string
) => {
	try {
		const response = await fetch(
			`https://reel-rewind-backend.onrender.com/${id}/edit`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(details),
			}
		);
		return response;
	} catch (error) {
		throw error;
	}
};

export const deleteUser = async (id: string, token: string) => {
	try {
		const response = await fetch(
			`https://reel-rewind-backend.onrender.com/remove-user/${id}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(id),
			}
		);
		return true;
	} catch (error) {
		console.error('error deleting user');
		throw error;
	}
};

// collection-related calls
export const getUserCollection = async (id: string, token: string) => {
	try {
		const response = await fetch(
			`https://reel-rewind-backend.onrender.com/collection-get/${id}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
			}
		);
		const formattedResponse = response.json();
		return formattedResponse;
	} catch (error) {
		console.error('there was a error fetching this collection');
		throw error;
	}
};

export const addToCollection = async (item: CollectionItem, token: string) => {
	try {
		const response = await fetch(
			`https://reel-rewind-backend.onrender.com/collection-add/`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(item),
			}
		);
		return response;
	} catch (error) {
		console.error(
			"there was an error adding this to your collection, probably because it's already in there"
		);
		throw error;
	}
};

export const editCollectionItem = async (
	item: CollectionItem,
	token: string
) => {
	const { movie_id, user_id } = item;
	try {
		const response = await fetch(
			`https://reel-rewind-backend.onrender.com/collection-${movie_id}/${user_id}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(item),
			}
		);
		return response;
	} catch (error) {
		console.error('there was an error editing this item');
		throw error;
	}
};

export const removeCollectionItem = async (
	item: CollectionItem,
	token: string
) => {
	const { movie_id, user_id } = item;
	try {
		const response = await fetch(
			`https://reel-rewind-backend.onrender.com/${user_id}/${movie_id}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
			}
		);
		if (!response.ok) {
			console.log('a bad response was returned');
		}
		return;
	} catch (error) {
		console.error('there was an error deleting this movie');
		throw error;
	}
};
