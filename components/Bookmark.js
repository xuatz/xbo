import Push from './Push';

const Bookmark = props => {
	let { provider, data } = props.bookmark;
	switch (provider) {
		case 'pushbullet':
			return <Push data={data} />;
		default:
			return null;
	}
};

export default Bookmark;
