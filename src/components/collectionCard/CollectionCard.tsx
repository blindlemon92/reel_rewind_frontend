import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getUserCollection } from '@//api/server';
import {
	CollectionItem,
	CollectionState,
	setCollection,
} from '@//configure/collectionSlice';
import { RootState } from '@//configure/store';
import { User } from '@//configure/userSlice';
import { useAuth0 } from '@auth0/auth0-react';

import MovieItem from '../movieItem/MovieItem';
import InfoSvg from '../svg/InfoSvg';
import PointerSvg from '../svg/PointerSvg';
import PointUpSvg from '../svg/PointUpSvg';
import StarSvg from '../svg/StarSvg';
import styles from './CollectionCard.module.css';
//
const CollectionCard = () => {
	const dispatch = useDispatch();
	const { getAccessTokenSilently } = useAuth0();

	const currentUser: User = useSelector((state: RootState) => state.user);
	const currentCollection: CollectionState = useSelector(
		(state: RootState) => state.collection
	);
	const [initialLoad, setInitialLoad] = useState(true);
	const [collectionEmpty, setCollectionEmpty] = useState(true);
	const [showRefresh, setShowRefresh] = useState(false);

	const handleUpdateCollection = async () => {
		setShowRefresh(false);
		try {
			const user_id: string = currentUser.id;
			const token = await getAccessTokenSilently();
			const response = await getUserCollection(user_id, token);
			dispatch(setCollection(response));
		} catch (error) {
			console.error('there was an error fetching this collection');
			throw error;
		}
	};

	if (initialLoad) {
		handleUpdateCollection();
		setInitialLoad(false);
	}

	useEffect(() => {
		if (currentCollection.items.length === 0) {
			setCollectionEmpty(true);
		} else setCollectionEmpty(false);
	}, [currentCollection]);

	return (
		<div className={styles.collectionCard}>
			{collectionEmpty ? (
				<div className={styles.introMessage}>
					<div className={styles.aimUp}>
						WELCOME TO THE FUTURE HOME OF YOUR WATCHLIST
						<br />
						<br /> STEP 1: Search and add movies to your list.
						<PointUpSvg />
					</div>
					<div className={styles.otherSteps}>
						STEP 2: Choose your rating and set the genre
						<StarSvg />
					</div>
					<div className={styles.otherSteps}>
						STEP 3: Click the
						<span>
							<InfoSvg />
						</span>
						for details
					</div>
					<div className={styles.otherSteps}>STEP 4: Enjoy yourself</div>
				</div>
			) : (
				<>
					{showRefresh ? (
						<>
							<span className={styles.updateContainer}>
								<button
									className={styles.updateButton}
									onClick={handleUpdateCollection}>
									<PointerSvg />
									Not seeing your most recent changes?
								</button>
							</span>
						</>
					) : null}
					<div className={styles.itemsContainer}>
						{/* EACH ITEM */}
						{currentCollection.items.map((item: CollectionItem, index) => {
							return (
								<MovieItem
									setShowRefresh={setShowRefresh}
									inCollection={true}
									key={index}
									index={index}
									item={item}
								/>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default CollectionCard;
