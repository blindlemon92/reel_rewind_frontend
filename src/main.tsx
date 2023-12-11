import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthChecker } from './auth/AuthChecker';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { News } from './components/news/News';
import { RootState } from './configure/store';
import { User } from './configure/userSlice';
import AccountSettings from './pages/accountSettings/AccountSettings';
import { Home } from './pages/home/Home';
import ProfilePage from './pages/profilePage/ProfilePage';

import '@//index.css';

export const App = () => {
	const currentUser: User = useSelector((state: RootState) => state.user);

	const userName = currentUser.username || 'username';
	const id = currentUser.id || 'userId';
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path={'/'} element={<Home />} />
					<Route
						path={`/${userName}/watch-list`}
						element={
							<AuthChecker>
								<ProfilePage />
							</AuthChecker>
						}
					/>
					<Route
						path={'/news'}
						element={
							<AuthChecker>
								<News />
							</AuthChecker>
						}
					/>
					<Route
						path={`/${id}/profile`}
						element={
							<AuthChecker>
								<AccountSettings />
							</AuthChecker>
						}
					/>
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
};
