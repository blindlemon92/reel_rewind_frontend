import styles from './ProfilePage.module.css';
import CollectionCard from '@//components/collectionCard/CollectionCard';
//
const ProfilePage = () => {
	return (
		<>
			<div className={styles.profilePage}>
				<CollectionCard />
			</div>
		</>
	);
};

export default ProfilePage;
