import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AddSvg from '@//components/svg/AddSvg';
import EditSvg from '@//components/svg/EditSvg';
import FullRewindSvg from '@//components/svg/FullRewindSvg';
import LikeSvg from '@//components/svg/LikeSvg';
import NewsSvg from '@//components/svg/NewsSvg';
import PoopSvg from '@//components/svg/PoopSvg';
import { RootState } from '@//configure/store';
import { User } from '@//configure/userSlice';
import { Data } from '@//constants/Data';
import useFetchUser from '@//hooks/useFetchUser';
import { useAuth0 } from '@auth0/auth0-react';

import styles from './Home.module.css';
import SignUpCard from '@//components/signUpCard/SignUpCard';
//
export const Home = () => {
	const { isAuthenticated, loginWithRedirect, user } = useAuth0();
	const currentUser: User = useSelector((state: RootState) => state.user);
	const { title, intro } = Data();
	useFetchUser(isAuthenticated);

	if (user && isAuthenticated && currentUser.signed_up === false) {
		return <SignUpCard />;
	} else
		return (
			<div className={styles.home}>
				<div className={styles.sloganCard}>
					<div className={styles.slogan}>
						<span>Never forget the name of a movie again!</span>
						<div className={styles.reelRewind}>
							<FullRewindSvg />
							<span>REEL REWIND</span>
						</div>
					</div>
				</div>

				{currentUser.signed_up ? (
					<>
						<div className={styles.homeNews}>
							<span className={styles.cardLabel}>
								<EditSvg /> a note from the dev
							</span>
							<div className={styles.noteContents}>
								<div>{`Thanks for joining us ${currentUser.username}! Make sure to check in regularly as new features are added often`}</div>
							</div>
						</div>
						<div className={styles.homeNews}>
							<span className={styles.cardLabel}>
								<NewsSvg /> latest news
							</span>
							<Link to='/news'>
								<div className={styles.newsBlurb}>
									<div className={styles.newsTitle}>{title}</div>
									<div className={styles.newsIntro}>{intro}</div>
								</div>
							</Link>
						</div>
					</>
				) : (
					<>
						<div className={styles.cardContainer}>
							<span className={styles.signUp}>JOIN NOW SO YOU CAN:</span>
							<div className={styles.introCards}>
								<AddSvg />
								build your watch list
							</div>
							<div className={styles.introCards}>
								<PoopSvg />
								rate your favorites
							</div>
							<div className={styles.introCards}>
								<LikeSvg />
								love using our platform
							</div>
							<div className={styles.signUp}>
								<span>
									<button
										onClick={() => {
											loginWithRedirect({
												authorizationParams: {
													screen_hint: 'signup',
												},
											});
										}}
										className={styles.clickHere}>
										Click Here
									</button>{' '}
									to Sign Up
								</span>
							</div>
						</div>
					</>
				)}
			</div>
		);
};
