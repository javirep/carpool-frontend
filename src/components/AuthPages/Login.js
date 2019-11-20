import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";

class Login extends Component {
    state = { email: "", password: "", errorMessage: "" };

    handleFormSubmit = async event => {

        event.preventDefault();
        let validForm = true
        let errorMessage = ""
        const { email, password } = this.state;

        if (!email || !password) {
            validForm = false
            errorMessage = "Por favor, rellene todos los campos"
        }

        if (validForm) {
            const user = await this.props.login({ email, password });
            if (!user) {
                errorMessage = "Un momento por favor..."
            }
        }

        this.setState({
            errorMessage
        })

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

                {
                    this.state.errorMessage ?
                        <span>{this.state.errorMessage}</span>
                        :
                        <></>
                }
                <button className="button" type="submit" value="Login" > Log in </button>
            </form>
        );
    }
}

export default withAuth(Login);
