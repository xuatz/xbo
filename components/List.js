import Push from './Push';

const List = props => {
    let { pushes } = props;

    return (
        <div>
            {pushes.map((push, key) => {
                return <Push key={key} push={push} />;
            })}
        </div>
    );
};

export default List;
