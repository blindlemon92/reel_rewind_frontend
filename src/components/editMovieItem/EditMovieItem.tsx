import { useState } from 'react';

import { editCollectionItem } from '@//api/server';
import { removeCollectionItem } from '@//api/server';
import { CollectionItem } from '@//configure/collectionSlice';
import { useAuth0 } from '@auth0/auth0-react';

import ActionSvg from '../svg/ActionSvg';
import ComedySvg from '../svg/ComedySvg';
import HorizontalScrollSvg from '../svg/HorizontalScrollSvg';
import HorrorSvg from '../svg/HorrorSvg';
import LikeSvg from '../svg/LikeSvg';
import PoopSvg from '../svg/PoopSvg';
import RomanceSvg from '../svg/RomanceSvg';
import SciFiSvg from '../svg/SciFiSvg';
import StarSvg from '../svg/StarSvg';
import styles from './EditMovieItem.module.css';
//
const EditMovieItem = ({
	item,
	setShowRefresh,
	setUpdateOpen,
}: {
	item: CollectionItem;
	setShowRefresh: Function;
	setUpdateOpen: Function;
}) => {
	const { getAccessTokenSilently } = useAuth0();
	const [updatedItem, setUpdatedItem] = useState({ genre: '', user_score: '' });

	const handleClearUpdatedItem = () => {
		setUpdatedItem({ genre: '', user_score: '' });
		setUpdateOpen(null);
	};

	const formatItem = (item: CollectionItem) => {
		const formattedItem: CollectionItem = {
			...item,
			genre: updatedItem.genre,
			user_score: updatedItem.user_score,
		};
		return formattedItem;
	};

	const handleUpdateItem = async (item: CollectionItem) => {
		const formattedItem = formatItem(item);
		handleClearUpdatedItem();
		try {
			const token = await getAccessTokenSilently();
			const response = await editCollectionItem(formattedItem, token);
			if (setShowRefresh != undefined) {
				setShowRefresh(true);
			}
			return response;
		} catch (error) {
			throw error;
		}
	};

	const handleDeleteItem = async (item: CollectionItem) => {
		if (
			confirm(`You've chosen to permanently delete ${item.movie_title}`) ===
			true
		) {
			handleClearUpdatedItem();
			try {
				const token = await getAccessTokenSilently();
				const response = await removeCollectionItem(item, token);
				setUpdateOpen(null);
				if (setShowRefresh != null) {
					setShowRefresh(true);
				}
				return;
			} catch (error) {
				console.error('there was an error deleting this item');
				throw error;
			}
		}
	};

	return (
		<>
			<div className={styles.itemDetails}>
				<span>swap genre?</span>
				<div className={styles.genresContainer}>
					<button
						onClick={() => {
							setUpdatedItem({ ...updatedItem, genre: 'scifi' });
						}}
						className={`${
							updatedItem.genre === 'scifi' ? 'opacity-100' : 'opacity-25'
						}`}>
						<SciFiSvg />
					</button>
					<button
						onClick={() => {
							setUpdatedItem({ ...updatedItem, genre: 'comedy' });
						}}
						className={`${
							updatedItem.genre === 'comedy' ? 'opacity-100' : 'opacity-25'
						}`}>
						<ComedySvg />
					</button>
					<button
						onClick={() => {
							setUpdatedItem({ ...updatedItem, genre: 'action' });
						}}
						className={`${
							updatedItem.genre === 'action' ? 'opacity-100' : 'opacity-25'
						}`}>
						<ActionSvg />
					</button>
					<button
						onClick={() => {
							setUpdatedItem({ ...updatedItem, genre: 'horror' });
						}}
						className={`${
							updatedItem.genre === 'horror' ? 'opacity-100' : 'opacity-25'
						}`}>
						<HorrorSvg />
					</button>
					<button
						onClick={() => {
							setUpdatedItem({ ...updatedItem, genre: 'romance' });
						}}
						className={`${
							updatedItem.genre === 'romance' ? 'opacity-100' : 'opacity-25'
						}`}>
						<RomanceSvg />
					</button>
				</div>
				<HorizontalScrollSvg />
				{/* RATINGS CONTAINER */}
				<span className='ml-auto mr-auto'>change score?</span>
				<div className={styles.ratingContainer}>
					<button
						onClick={() => {
							setUpdatedItem({ ...updatedItem, user_score: '1' });
						}}
						className={`${
							updatedItem.user_score === '1' ? 'opacity-100' : 'opacity-25'
						}`}>
						<PoopSvg />
					</button>
					<button
						onClick={() => {
							setUpdatedItem({ ...updatedItem, user_score: '2' });
						}}
						className={`${
							updatedItem.user_score === '2' ? 'opacity-100' : 'opacity-25'
						}`}>
						<LikeSvg />
					</button>
					<button
						onClick={() => {
							setUpdatedItem({ ...updatedItem, user_score: '3' });
						}}
						className={`${
							updatedItem.user_score === '3' ? 'opacity-100' : 'opacity-25'
						}`}>
						<StarSvg />
					</button>
				</div>
				<div className={styles.submitContainer}>
					{/* SUBMIT BUTTON */}
					<button onClick={handleClearUpdatedItem}>cancel</button>
					<button
						onClick={() => handleUpdateItem(item)}
						className={styles.submitButton}>
						submit
					</button>
					<button
						className='text-red-600'
						onClick={() => handleDeleteItem(item)}>
						delete
					</button>
				</div>
			</div>
		</>
	);
};

export default EditMovieItem;
