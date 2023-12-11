import styles from './Story.module.css';
import { Data } from '../../constants/Data';
//
const Story = () => {
	const data = Data();

	return (
		<div className={styles.story}>
			<div className={styles.title}>{data.title}</div>
			<div className={styles.intro}>{data.intro}</div>
			<div>
				{data.items.map((items, index) => (
					<div className={styles.itemDiv} key={index}>
						<div className={styles.movieTitle}>
							<span>{items.key}</span>
							<span>#{index + 1}</span>
						</div>
						<hr />
						<div>{items.value}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Story;
