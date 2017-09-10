import React, { Component } from "react";
import { Container, Item } from "./FlexContainer";

const styles = {
    inputStyle: {
        borderRadius: "0.25rem",
        padding: "1rem",
        marginBottom: "1rem"
    },
    submitButton: {
        padding: "0.6rem",
        backgroundColor: "#00B9BC",
        color: "#eee",
        fontWeight: "bold",
        textTransform: "uppercase"
    }
};

class Signup extends Component {
    state = {
        username: "",
        password1: "",
        password2: ""
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        let { username, password1, password2 } = this.state;

        let errors = [];

        if (!username) {
            errors.push("The username field is empty!");
        }

        if (!password1 || !password2) {
            errors.push("The password field is empty!");
        }

        if (password1 && password2 && password1 !== password2) {
            errors.push("The passwords are not the same!");
        }

        if (errors.length > 0) {
            this.setState({
                errors
            });
        } else {
            this.props
                .onSubmit({
                    username: username,
                    password: password1
                })
                .then(res => {
                    if (res.error) {
                        this.setState({
                            errors: [res.error]
                        });
                    }

                    if (res.status === 200) {
                        console.log("signup success!");
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        errors: ["server error!!"]
                    });
                });
        }
    };

    render() {
        return (
            <Container style={{ justifyContent: "center" }}>
                <div
                    style={{
                        background: "orange",
                        padding: "25px",
                        // padding: '25px 25px 18px',
                        margin: "20px",
                        borderRadius: "3px"
                    }}>
                    {this.state.errors &&
                        this.state.errors.map((item, key) => {
                            return (
                                <div key={key}>
                                    {item}
                                </div>
                            );
                        })}

                    <br />

                    <form onSubmit={this.handleSubmit}>
                        <Container
                            style={{
                                flexDirection: "column",
                                borderRadius: "5px",
                                width: "300px"
                            }}>
                            <input
                                style={styles.inputStyle}
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <input
                                style={styles.inputStyle}
                                type="password"
                                placeholder="Password"
                                name="password1"
                                value={this.state.password1}
                                onChange={this.handleChange}
                            />
                            <input
                                style={styles.inputStyle}
                                type="password"
                                placeholder="Re-enter Password"
                                name="password2"
                                value={this.state.password2}
                                onChange={this.handleChange}
                            />
                            <input
                                style={styles.submitButton}
                                type="submit"
                                value="Sign Up"
                            />
                        </Container>
                    </form>

                    <hr />

                    <Container
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                        <span>Have an account?</span>
                        <button type="button" onClick={this.props.changeMode}>
                            Log In
                        </button>
                    </Container>
                </div>

            </Container>
        );
    }
}

export default Signup;
