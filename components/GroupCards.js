import { Container, Item } from './common/FlexContainer';
import Link from 'next/link';

const styles = {
	groupCard: {
		marginRight: '10px'
	}
};

const GroupCards = props => {
	let { popularDomains = [] } = props;

	return (
		<Container
			style={{
				flexFlow: 'row wrap',
				justifyContent: 'flex-start'
			}}>
			<Item style={styles.groupCard}>
				<h2>
					Popular Websites
				</h2>

				{popularDomains.map((item, key) => (
					<div key={key}>
						<Link href={'/domain/' + item.domain}>
							<a>{item.domain + ': ' + item.bookmarks.length}</a>
						</Link>
					</div>
				))}
			</Item>
			<Item style={styles.groupCard}>
				<h2>
					TODO items
				</h2>

				{popularDomains.map((item, key) => (
					<div key={key}>
						<Link href={'/domain/' + item.domain}>
							<a>{item.domain + ': ' + item.bookmarks.length}</a>
						</Link>
					</div>
				))}
			</Item>
			<Item style={styles.groupCard}>
				<h2>
					Popular Websites
				</h2>

				{popularDomains.map((item, key) => (
					<div key={key}>
						<Link href={'/domain/' + item.domain}>
							<a>{item.domain + ': ' + item.bookmarks.length}</a>
						</Link>
					</div>
				))}
			</Item>
			<Item style={styles.groupCard}>
				<h2>
					Popular Websites
				</h2>

				{popularDomains.map((item, key) => (
					<div key={key}>
						<Link href={'/domain/' + item.domain}>
							<a>{item.domain + ': ' + item.bookmarks.length}</a>
						</Link>
					</div>
				))}
			</Item>
			<Item style={styles.groupCard}>
				<h2>
					Popular Websites
				</h2>

				{popularDomains.map((item, key) => (
					<div key={key}>
						<Link href={'/domain/' + item.domain}>
							<a>{item.domain + ': ' + item.bookmarks.length}</a>
						</Link>
					</div>
				))}
			</Item>
			<Item style={styles.groupCard}>
				<h2>
					Popular Websites
				</h2>

				{popularDomains.map((item, key) => (
					<div key={key}>
						<Link href={'/domain/' + item.domain}>
							<a>{item.domain + ': ' + item.bookmarks.length}</a>
						</Link>
					</div>
				))}
			</Item>
			<Item style={styles.groupCard}>
				<h2>
					Popular Websites
				</h2>

				{popularDomains.map((item, key) => (
					<div key={key}>
						<Link href={'/domain/' + item.domain}>
							<a>{item.domain + ': ' + item.bookmarks.length}</a>
						</Link>
					</div>
				))}
			</Item>
			<Item style={styles.groupCard}>
				<h2>
					Popular Websites
				</h2>

				{popularDomains.map((item, key) => (
					<div key={key}>
						<Link href={'/domain/' + item.domain}>
							<a>{item.domain + ': ' + item.bookmarks.length}</a>
						</Link>
					</div>
				))}
			</Item>
		</Container>
	);
};

export default GroupCards;
