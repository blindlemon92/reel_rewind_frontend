import { useState } from 'react';

import { CollectionItem } from '@//configure/collectionSlice';

import EditMovieItem from '../editMovieItem/EditMovieItem';
import ActionSvg from '../svg/ActionSvg';
import ComedySvg from '../svg/ComedySvg';
import HorrorSvg from '../svg/HorrorSvg';
import InfoSvg from '../svg/InfoSvg';
import LikeSvg from '../svg/LikeSvg';
import PoopSvg from '../svg/PoopSvg';
import RomanceSvg from '../svg/RomanceSvg';
import SciFiSvg from '../svg/SciFiSvg';
import StarSvg from '../svg/StarSvg';
import styles from './MovieItem.module.css';
//
const MovieItem = ({
	item,
	index,
	inCollection,
	setShowRefresh,
}: {
	item: CollectionItem;
	index: number;
	inCollection: boolean;
	setShowRefresh?: Function;
}) => {
	const [updateOpen, setUpdateOpen] = useState<number | null>(null);
	const [showDetails, setShowDetails] = useState<number>(-1);

	const handleGenreImg = (itemGenre: string) => {
		switch (itemGenre) {
			case 'horror':
				return <HorrorSvg />;
			case 'comedy':
				return <ComedySvg />;
			case 'romance':
				return <RomanceSvg />;
			case 'action':
				return <ActionSvg />;
			case 'scifi':
				return <SciFiSvg />;
			case 'none':
				return <span className={styles.add}> add genre</span>;
		}
	};

	const handleUserScore = (user_score: string) => {
		if (user_score === '1') {
			return <PoopSvg />;
		} else if (user_score === '2') {
			return <LikeSvg />;
		} else if (user_score === '3') {
			return <StarSvg />;
		}
	};

	const formatTitle = (title: string) => {
		if (title.length > 12) {
			const formattedTitle = title.slice(0, 9) + '...';
			return formattedTitle;
		} else return title;
	};

	return (
		<>
			<div key={index} className={styles.itemCard}>
				<div className={styles.movieItem}>
					<div
						className={`z-30 h-[25vh] ${
							showDetails != index ? '' : ' h-[25svh] rounded-b '
						} w-[16vh] m-1 hover:z-30 rounded  white`}>
						<div className={styles.itemDetails}>
							{' '}
							{showDetails != index ? (
								<></>
							) : (
								<ul className={styles.detailsList}>
									<li>
										{formatTitle(item.movie_title)} - {item.movie_year}
									</li>
									<StarSvg />
									{item.actors.map((actor, index) => (
										<li key={index}>{actor}</li>
									))}
									<li>{item.user_score === 'na' ? null : item.user_score}</li>
									<li>{item.genre === 'none' ? null : item.genre}</li>
								</ul>
							)}
						</div>
						<img
							src={item.img}
							className={`z-50 h-[25vh] w-[16vh] m-1 rounded shadow-xl ${
								showDetails != index ? -1 : 'hidden'
							} `}
						/>
					</div>
					<div className={styles.buttonDiv}>
						<button
							className={styles.movieButton}
							onClick={() =>
								setShowDetails(showDetails === index ? -1 : index)
							}>
							<InfoSvg />
						</button>
						{inCollection ? (
							<button
								onClick={() =>
									setUpdateOpen(updateOpen === index ? null : index)
								}
								className={styles.movieButton}>
								{item.user_score && item.user_score != 'na'
									? handleUserScore(item.user_score)
									: null}
								{item.genre ? handleGenreImg(item.genre) : null}
							</button>
						) : null}
					</div>
				</div>
				{/* GENRE AND RATING */}
				{updateOpen === index && setShowRefresh ? (
					<EditMovieItem
						item={item}
						setShowRefresh={setShowRefresh}
						setUpdateOpen={setUpdateOpen}
					/>
				) : null}
			</div>
		</>
	);
};

export default MovieItem;
