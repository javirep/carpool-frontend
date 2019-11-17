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
            <form className="form" onSubmit={this.handleFormSubmit}>
                <h2>Registrate y empieza a compartir</h2>
                <div>
                    <p>E-mail</p>
                    <input type="text" name="email" value={email} onChange={this.handleChange} />
                </div>

                <div>
                    <p>Password</p>
                    <input type="password" name="password" value={password} onChange={this.handleChange} />
                </div>

                <button className="button" type="submit" value="Login" > Log in </button>
            </form>
        );
    }
}

export default withAuth(Login);
