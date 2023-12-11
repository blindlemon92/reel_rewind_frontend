import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '@//configure/store';
import { useAuth0 } from '@auth0/auth0-react';

import EditSvg from '../svg/EditSvg';
import HomeSvg from '../svg/HomeSvg';
import NewsSvg from '../svg/NewsSvg';
import UserExitSvg from '../svg/UserExitSvg';
import UserSvg from '../svg/UserSvg';
import VhsSvg from '../svg/VhsSvg';
import styles from './Footer.module.css';

const Footer = () => {
	const { isAuthenticated, loginWithRedirect } = useAuth0();

	const { id, username, signed_up } = useSelector(
		(state: RootState) => state.user
	);

	return (
		<>
			<div className={styles.footer}>
				<Link to='/'>
					<button>
						<HomeSvg />
					</button>
				</Link>
				{!isAuthenticated || !signed_up ? (
					<>
						<button
							onClick={() => {
								loginWithRedirect({
									authorizationParams: {
										screen_hint: 'signup',
									},
								});
							}}>
							<EditSvg />
						</button>
						<span className='opacity-25'>
							{' '}
							<VhsSvg />
						</span>

						<button onClick={() => loginWithRedirect()}>
							<UserSvg />
						</button>
					</>
				) : (
					<>
						<Link to='/news'>
							<button>
								<NewsSvg />
							</button>
						</Link>
						<Link to={`/${username}/watch-list`}>
							<button>
								<VhsSvg />
							</button>
						</Link>
						<Link to={`/${id}/profile`}>
							<button>
								<UserExitSvg />
							</button>
						</Link>
					</>
				)}
			</div>
		</>
	);
};

export default Footer;
