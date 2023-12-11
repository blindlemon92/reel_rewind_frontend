import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { addToCollection } from '@//api/server';
import {
	CollectionItem,
	CollectionState,
	setCollection,
} from '@//configure/collectionSlice';
import { SearchState, setPageData } from '@//configure/searchSlice';
import { RootState } from '@//configure/store';
import { initialCollectionItems } from '@//constants/initialValues';
import { useAuth0 } from '@auth0/auth0-react';

import MovieItem from '../movieItem/MovieItem';
import AddSvg from '../svg/AddSvg';
import ExitSvg from '../svg/ExitSvg';
import styles from './SearchCard.module.css';
//
export default function SearchCard({
	setDropdownOpen,
	setSearchDropdown,
}: {
	setDropdownOpen: Function;
	setSearchDropdown: Function;
}) {
	const { getAccessTokenSilently } = useAuth0();
	const dispatch = useDispatch();

	const currentCollection: CollectionState = useSelector(
		(state: RootState) => state.collection
	);
	const searchResults: SearchState = useSelector(
		(state: RootState) => state.search
	);
	const [searchCardVisible, setSearchCardVisible] = useState(false);
	const [addedIndex, setAddedIndex] = useState<number | null>(null);

	const collectionHandler = async (item: CollectionItem, index: number) => {
		try {
			const token = await getAccessTokenSilently();
			const response = await addToCollection(item, token);
			dispatch(setCollection([...currentCollection.items, item]));
			setAddedIndex(index);
			return response;
		} catch (error) {
			console.error('there was an error handling this collection');
		}
	};

	const handleClose = async () => {
		dispatch(setPageData(initialCollectionItems));
		setDropdownOpen(false);
		setSearchDropdown(false);
	};

	useEffect(() => {
		if (searchResults.items != initialCollectionItems) {
			setSearchCardVisible(true);
		} else setSearchCardVisible(false);
	}, [searchResults]);

	return (
		<div className={styles.searchCard}>
			{searchCardVisible ? (
				<div className=''>
					<button className={styles.exitButton} onClick={() => handleClose()}>
						<ExitSvg />
					</button>
					<div className={styles.itemsContainer}>
						{/* EACH ITEM */}
						{searchResults.items.map((item: CollectionItem, index: number) => {
							return (
								<div className={styles.itemContainer} key={index}>
									<div>
										<MovieItem
											inCollection={false}
											item={item}
											key={index}
											index={index}
										/>
										<button
											className={styles.addButton}
											onClick={() => collectionHandler(item, index)}>
											{addedIndex === index ? (
												<span className='opacity-10'>
													<AddSvg />
												</span>
											) : (
												<AddSvg />
											)}
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			) : null}
		</div>
	);
}
