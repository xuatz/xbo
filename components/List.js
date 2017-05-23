import Push from "./Push";

const List = props => {
	let { bookmarks } = props;

	return (
		<div
			style={{
				overflow: "scroll",
				height: "400px"
			}}>
			{bookmarks.map((bookmark, key) => {
				//TODO will need some renaming/refactoring in future
				return <Push key={key} push={bookmark} />;
			})}
		</div>
	);
};

export default List;
