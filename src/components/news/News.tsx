import Story from '@//components/story/Story';
import { RootState } from '@//configure/store';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import FullRewindSvg from '../svg/FullRewindSvg';
import styles from './News.module.css';
//
export const News = () => {
	const { isAuthenticated, user } = useAuth0();
	const { id } = useSelector((state: RootState) => state.user);

	if (isAuthenticated && id === user?.sub) {
		return (
			<div className={styles.news}>
				<div className={styles.slogan}>
					<span>"Now that's old news!"</span>
					<div className={styles.reel_rewind}>
						<FullRewindSvg />
						<span>THE REEL TIMES</span>
					</div>
				</div>
				<Story />
			</div>
		);
	} else return <></>;
};
