import SearchCard from '../searchCard/SearchCard';
import styles from './PopUp.module.css';
//
const PopUp = ({
	dropdownOpen,
	searchDropdown,
	setSearchDropdown,
	setDropdownOpen,
}: {
	dropdownOpen: boolean;
	searchDropdown: boolean;
	setSearchDropdown: Function;
	setDropdownOpen: Function;
}) => {
	return (
		<>
			{dropdownOpen ? (
				<div className={styles.user_dropdown}>
					{searchDropdown ? (
						<SearchCard
							setSearchDropdown={setSearchDropdown}
							setDropdownOpen={setDropdownOpen}
						/>
					) : null}
				</div>
			) : null}
		</>
	);
};

export default PopUp;
