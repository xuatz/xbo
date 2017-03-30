import Push from './Push';

const List = props => {
    let { bookmarks } = props;

    return (
        <div>
            {bookmarks.map((bookmark, key) => {
            	//TODO will need some renaming/refactoring in future
                return <Push key={key} push={bookmark} />;
            })}
        </div>
    );
};

export default List;
