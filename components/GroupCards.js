import { Container, Item } from './FlexContainer';

const GroupCards = props => {
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
        <Container>
            {pushes.map((push, key) => (
                <Item key={key}>
                    {push.title}
                </Item>
            ))}
        </Container>
    );
};

export default GroupCards;
