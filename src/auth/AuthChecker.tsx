import { useCallback } from 'react';

import { useSelector } from 'react-redux';

import { useAuth0 } from '@auth0/auth0-react';

import { RootState } from '../configure/store';
import { User } from '../configure/userSlice';
//
type AuthCheckerProps = {
	children: React.ReactNode;
};

export const AuthChecker = ({ children }: AuthCheckerProps) => {
	const currentUser: User = useSelector((state: RootState) => state.user);
	const { user, isAuthenticated } = useAuth0();
	// const handleNavigation = useCallback(async () => {
	// 	window.location.href = '/';
	// }, []);

	if (user && isAuthenticated === true && currentUser.id === user.sub) {
		return <>{children}</>;
	} else {
		// handleNavigation();
		return null;
	}
};
