import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";

class Login extends Component {
    state = { email: "", password: "" };

    handleFormSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        // console.log('Login -> form submit', { username, password });
        this.props.login({ email, password });
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { email, password } = this.state;

        return (
            <form onSubmit={this.handleFormSubmit}>

                <label>email:</label>
                <input type="text" name="email" value={email} onChange={this.handleChange} />

                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={this.handleChange} />

                <input type="submit" value="Login" />
            </form>
        );
    }
}

export default withAuth(Login);
