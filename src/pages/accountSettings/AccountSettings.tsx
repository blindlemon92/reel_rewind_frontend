import { useState } from 'react';
import styles from './AccountSettings.module.css';
import { User, initialState, updateUser } from '@//configure/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@//configure/store';
import { useAuth0 } from '@auth0/auth0-react';
import { deleteUser, updateUserDetails } from '@//api/server';
import UserSvg from '@//components/svg/UserSvg';
import EmailSvg from '@//components/svg/EmailSvg';
//
const AccountSettings = () => {
	const dispatch = useDispatch();
	const { user, logout, getAccessTokenSilently } = useAuth0();
	const navigate = useNavigate();

	const currentUser: User = useSelector((state: RootState) => state.user);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [showSave, setShowSave] = useState(false);
	const fullName: string = `${user?.given_name} ${user?.family_name}`;

	const handleEdit = () => {
		setDropdownOpen(true);
	};

	const handleLogout = async () => {
		dispatch(updateUser(initialState));
		logout();
	};

	const handleDelete = async () => {
		if (
			confirm('To permanently delete your account click ok.') === true &&
			user &&
			user.sub
		) {
			const id = user.sub;
			try {
				dispatch(updateUser(initialState));
				const token = await getAccessTokenSilently();
				const response = await deleteUser(id, token);
				if (response) {
					alert('Your account has been deleted');
					navigate('/');
				}
			} catch (error) {
				console.error('there has been an error deleting this user');
				throw error;
			}
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setShowSave(false);
		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		setDropdownOpen(false);
		if (
			formJson.email === currentUser.email &&
			formJson.username === currentUser.username
		) {
			return;
		}
		dispatch(updateUser(formJson));
		try {
			const id = currentUser.id;
			const details = {
				username: formJson.username as string,
				img: currentUser.img,
				email: formJson.email as string,
				region: currentUser.region || 0,
			};
			const token = await getAccessTokenSilently();
			const response = await updateUserDetails(details, id, token);
			if (response && response.status === 200) {
				return;
			}
		} catch (error) {
			console.error('there was an error updating user details');
			throw error;
		}
	};

	if (!dropdownOpen) {
		return (
			<div className={styles.accountSettings}>
				<div className={styles.buttonsDiv}>
					<button type='button' className={styles.heading} onClick={handleEdit}>
						<span>Account Details</span>
					</button>
					<button
						className={styles.heading}
						type='button'
						onClick={handleLogout}>
						<span>Logout</span>
					</button>
				</div>
			</div>
		);
	} else {
		return (
			<div className={styles.dropdown}>
				<div className={styles.divCard}>
					<div className={styles.formDiv}>
						<label className={styles.formLabel}>
							<span className={styles.introSpan}>Account Settings</span>
							<span>{fullName}</span>
						</label>
						<form onSubmit={handleSubmit} className={styles.form}>
							<label className={styles.formLabel}>
								<UserSvg />
								<input
									className={styles.formInput}
									onChange={() => setShowSave(true)}
									name='username'
									type='text'
									defaultValue={currentUser.username}
								/>
								<span className={styles.clickEdit}>* click to edit *</span>
							</label>
							<label className={styles.formLabel}>
								<EmailSvg />
								<input
									onChange={() => setShowSave(true)}
									className={styles.formInput}
									type='text'
									name='email'
									defaultValue={currentUser.email}
								/>
								<span className={styles.clickEdit}>* click to edit *</span>
							</label>
							{showSave ? (
								<div className={styles.changesDiv}>
									<button type='submit' className={styles.changes}>
										save changes ?
									</button>
								</div>
							) : null}
						</form>
					</div>
					<div className={styles.buttonDiv}>
						<button
							type='button'
							className={styles.headingB}
							onClick={handleDelete}>
							delete account
						</button>
						<button
							type='button'
							className={styles.headingB}
							onClick={() => (setDropdownOpen(false), setShowSave(false))}>
							cancel
						</button>
					</div>
				</div>
			</div>
		);
	}
};

export default AccountSettings;
