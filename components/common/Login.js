import React, { Component } from 'react';
import { Container, Item } from './FlexContainer';

const styles = {
    inputStyle: {
        borderRadius: '0.25rem',
        padding: '1rem',
        marginBottom: '1rem',
    },
    submitButton: {
        padding: '0.6rem',
        backgroundColor: '#00B9BC',
        color: '#eee',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
};

class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        let { username, password1, password2 } = this.state;

        let errors = [];

        if (!username) {
            errors.push('The username field is empty!');
        }

        if (!password1 || !password2) {
            errors.push('The password field is empty!');
        }

        if (password1 && password2 && password1 !== password2) {
            errors.push('The passwords are not the same!');
        } else {
        }

        if (errors.length > 0) {
            this.setState({
                errors,
            });
        } else {
            this.props
                .onSubmit({
                    username: username,
                    password: this.state.password1,
                })
                .then(res => {
                    if (res.error) {
                        this.setState({
                            errors: [res.error],
                        });
                    }
                })
                .catch(err => {
                    this.setState({
                        error: ['server error!!'],
                    });
                });
        }
    };

    render() {
        return (
            <Container
                style={{
                    justifyContent: 'center',
                }}>
                <div
                    style={{
                        background: 'orange',
                        padding: '25px',
                        margin: '20px',
                        borderRadius: '3px',
                    }}>
                    <br />

                    <form onSubmit={this.handleSubmit}>
                        <Container
                            style={{
                                flexDirection: 'column',
                                borderRadius: '5px',
                                width: '300px',
                            }}>
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

                    <Container
                        style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <span>Don't have an account?</span>
                        <button type="button" onClick={this.props.changeMode}>
                            Sign Up
                        </button>
                    </Container>
                </div>

            </Container>
        );
    }
}

export default Login;
