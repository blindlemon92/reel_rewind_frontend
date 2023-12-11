import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { DataFnIMdb, initialIMdbItemT } from '@//api/server';
import { CollectionItem } from '@//configure/collectionSlice';
import { setPageData } from '@//configure/searchSlice';
import { RootState } from '@//configure/store';
import { initialCollectionItems } from '@//constants/initialValues';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import SearchSvg from '../svg/SearchSvg';
import styles from './SearchBar.module.css';
//
const FormatItems = (
	initialReturnItems: initialIMdbItemT[],
	user_id: string
) => {
	const formattedItems: CollectionItem[] = initialReturnItems.map(
		(item: initialIMdbItemT) => {
			const formattedItem: CollectionItem = {
				movie_id: item['#IMDB_ID'],
				movie_title: item['#TITLE'],
				movie_year: item['#YEAR'].toString(),
				actors: item['#ACTORS'].split(',').map((each: string) => each.trim()),
				img: item['#IMG_POSTER'],
				genre: 'none',
				user_score: 'na',
				user_id: user_id,
			};
			return formattedItem;
		}
	);
	return formattedItems;
};
const SearchBar = ({
	setSearchDropdown,
	setDropdownOpen,
}: {
	setSearchDropdown: Function;
	setDropdownOpen: Function;
}) => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState<string>('');
	const { id } = useSelector((state: RootState) => state.user);

	const handleSearch = async () => {
		if (search === '' || search === null || search === undefined) {
			setSearchDropdown(true);
			setDropdownOpen(true);
			return;
		}
		try {
			const res = await DataFnIMdb(search);
			const formattedItems = FormatItems(res, id);
			dispatch(setPageData(formattedItems));
			setSearchDropdown(true);
			setDropdownOpen(true);
		} catch (error) {
			console.error('there was an error in the handleSearch function');
			return initialCollectionItems;
		}
	};

	return (
		<>
			<div className={styles.searchBar}>
				<input
					type='search'
					placeholder='db Search'
					onKeyDown={(e) => (e.key === 'Enter' ? handleSearch() : null)}
					onSubmit={handleSearch}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				/>
				<button onClick={handleSearch}>
					<SearchSvg />
				</button>
			</div>
		</>
	);
};

export default SearchBar;
