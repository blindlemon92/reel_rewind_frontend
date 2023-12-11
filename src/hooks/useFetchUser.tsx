import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useAuth0 } from '@auth0/auth0-react';

import { fetchUser } from '../api/server';
import { RootState } from '../configure/store';
import { setUser, User } from '../configure/userSlice';
//
const useFetchUser = (isAuthenticated: boolean) => {
	const { user, getAccessTokenSilently } = useAuth0();
	const dispatch = useDispatch();

	const currentUser: User = useSelector((state: RootState) => state.user);
	const userId = user?.sub || 'error';

	useEffect(() => {
		if (userId != undefined && userId != '') {
			(async () => {
				if (isAuthenticated) {
					try {
						const token = await getAccessTokenSilently();
						const res = await fetchUser(userId, token);
						if (res) {
							dispatch(
								setUser({
									...res,
									signed_up: true,
								})
							);
						} else {
							dispatch(
								setUser({
									...currentUser,
									signed_up: false,
								})
							);
						}
					} catch (error) {
						console.error('there was an error fetching this user');
					}
				}
			})();
		}
	}, [user]);
};

export default useFetchUser;
