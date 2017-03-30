import Push from './Push';

const List = props => {
    let {
        pushes = [
            {
                title: 'sample',
                body: 'huat ah',
            },
            {
                title: 'sample 2',
                body: 'huat ah 2',
            },
        ],
    } = props;

    return (
        <div>
            {pushes.map((push, key) => {
                return <Push key={key} push={push} />;
            })}
        </div>
    );
};

export default List;
