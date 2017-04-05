import { initStore, fetchBookmarks } from '../../store';
import withRedux from 'next-redux-wrapper';

import { Container, Item } from './FlexContainer';

const styles = {
    inputStyle: {
        borderRadius: '0.25rem',
        padding: '1rem',
        marginBottom: '1rem'
    },
    submitButton: {
        padding: '0.6rem',
        backgroundColor: '#00B9BC',
        color: '#eee',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.session.user ? true : false
    };
};

const Login = props => (
    <Container
        style={{
            justifyContent: 'center'
        }}
    >
        <div
            style={{
                background: 'orange',
                padding: '25px',
                margin: '20px',
                borderRadius: '3px'
            }}
        >
            <form onSubmit={null}>
                <Container
                    style={{
                        flexDirection: 'column',
                        borderRadius: '5px',
                        width: '300px'
                    }}
                >
                    <input
                        style={styles.inputStyle}
                        type="text"
                        placeholder="Username"
                        name="username"
                    />
                    <input
                        style={styles.inputStyle}
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                    <input
                        style={styles.submitButton}
                        type="submit"
                        value="Login"
                    />
                </Container>
            </form>

            <hr />

            <Container style={{ justifyContent: 'space-between' }}>
                <span>Don't have an account?</span>
                <span>Sign Up</span>
            </Container>
        </div>

    </Container>
);

export default withRedux(initStore, mapStateToProps)(Login);
