import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '@//api/server';
import { updateUser } from '@//configure/userSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '@//configure/userSlice';
import EmailSvg from '../svg/EmailSvg';
import PinSvg from '../svg/PinSvg';
import UserSvg from '../svg/UserSvg';
import styles from './SignUpCard.module.css';
import { RootState } from '@//configure/store';
import { useState } from 'react';

const SignUpCard = () => {
	const { user, getAccessTokenSilently, loginWithRedirect } = useAuth0();
	const { signed_up } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const [show, setShow] = useState(true);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		try {
			const newUser: User = {
				id: user?.sub || 'error',
				username: (formJson.username as string) || user!.nickname || 'error',
				img: user?.picture || '',
				email: (formJson.email as string) || user!.email || 'error',
				region: Number(formJson.region),
				signed_up: true,
			};
			const token = await getAccessTokenSilently();
			const res = await createUser(newUser, token);
			dispatch(updateUser(formJson));
			setShow(false);
		} catch (error) {
			console.error('There was an error creating the user:', error);
		}
	};

	if (user && !signed_up && show) {
		return (
			<>
				<section className={styles.main}>
					<span>
						You're almost there!
						<br /> complete sign-up below
					</span>
					<form onSubmit={handleSubmit}>
						<div className={styles.topContainer}>
							<div className='absolute'>
								<UserSvg />
							</div>
							<input
								type='text'
								name='username'
								defaultValue={user?.nickname}
							/>
						</div>
						<div className={styles.topContainer}>
							<div className='absolute'>
								<EmailSvg />
							</div>

							<input type='text' name='email' defaultValue={user?.email} />
						</div>
						<div className={styles.regionContainer}>
							<PinSvg />
							<label className={styles.formLabel}>select your region</label>
							<div className={styles.regionCols}>
								<div>
									<input type='radio' name='region' value={1} />
									<label>The West</label>
								</div>
								<div>
									<input type='radio' name='region' value={2} />
									<label>The Northwest</label>
								</div>
								<div>
									<input type='radio' name='region' value={3} />
									<label>The Midwest</label>
								</div>
								<div>
									<input type='radio' name='region' value={4} />
									<label>The Southwest</label>
								</div>
								<div>
									<input type='radio' name='region' value={5} />
									<label>The Southeast</label>
								</div>
							</div>
							<button type='submit' className={styles.button}>
								Submit
							</button>
						</div>
					</form>
					<div className={styles.signedUp}>
						already signed up?
						<button onClick={() => loginWithRedirect()}>login</button>
					</div>
				</section>
			</>
		);
	} else loginWithRedirect();
	return null;
};

export default SignUpCard;
