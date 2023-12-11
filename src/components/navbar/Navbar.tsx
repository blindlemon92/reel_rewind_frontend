import { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { RootState } from '@//configure/store';
import { useAuth0 } from '@auth0/auth0-react';

import PopUp from '../popUp/PopUp';
import SearchBar from '../searchBar/SearchBar';
import RewindSvg from '../svg/RewindSvg';
import styles from './Navbar.module.css';

function Navbar() {
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const location = useLocation();

	const { id, username, img } = useSelector((state: RootState) => state.user);

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [searchDropdown, setSearchDropdown] = useState(false);

	const handleMessage = (isAuthenticated: boolean) => {
		if (!isAuthenticated) {
			return alert('You must be signed in to access this content');
		}
	};

	return (
		<>
			<nav className={styles.nav}>
				<Link to='/'>
					<button className={styles.logoDiv}>
						<RewindSvg />
						REEL REWIND
					</button>
				</Link>
				<div className={styles.navLinks}>
					<Link to={isAuthenticated ? '/news' : '/'}>
						<button onClick={() => handleMessage(isAuthenticated)}>NEWS</button>
					</Link>
					<Link to={isAuthenticated ? `/${username}/watch-list` : '/'}>
						<button onClick={() => handleMessage(isAuthenticated)}>
							WATCH LIST
						</button>
					</Link>
					{location.pathname === `/${username}/watch-list` ? (
						<Link to={`/${id}/profile`}>
							<button>PROFILE</button>
						</Link>
					) : null}
				</div>
				<div className={styles.navContents}>
					{isAuthenticated &&
					location.pathname === `/${username}/watch-list` ? (
						<>
							<SearchBar
								setDropdownOpen={setDropdownOpen}
								setSearchDropdown={setSearchDropdown}
							/>
						</>
					) : (
						<>
							{isAuthenticated && id === user!.sub && img != '' ? (
								<>
									<Link className={styles.profileLink} to={`/${id}/profile`}>
										<span>{username}</span>
										<img src={user?.picture} className={styles.userImg} />
									</Link>
									{location.pathname.includes('profile') ? null : (
										<button
											type='button'
											className='hidden md:block'
											onClick={() => logout()}>
											logout
										</button>
									)}
								</>
							) : (
								<>
									<button onClick={() => loginWithRedirect()}>login</button>
								</>
							)}
						</>
					)}
				</div>
			</nav>
			{/* DROPDOWN */}
			<PopUp
				setDropdownOpen={setDropdownOpen}
				setSearchDropdown={setSearchDropdown}
				dropdownOpen={dropdownOpen}
				searchDropdown={searchDropdown}
			/>
		</>
	);
}

export default Navbar;
