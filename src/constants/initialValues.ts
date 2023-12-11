export const initialIMdbItem = {
	'#TITLE': '',
	'#YEAR': 2000,
	'#IMDB_ID': '',
	'#RANK': 0,
	'#ACTORS': '',
	'#AKA': '',
	'#IMDB_URL': '',
	'#IMDB_IV': '',
	'#IMG_POSTER': '',
	photo_width: 100,
	photo_height: 100,
};
export const initialCollectionItem = {
	movie_id: '',
	title: 'none',
	year: '',
	actors: [],
	img: '',
	genre: 'none',
	user_score: 'na',
	user_id: '',
};

export const initialCollectionItems = Array(8).fill({
	initialCollectionItem,
});
