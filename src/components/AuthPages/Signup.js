import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";

class Signup extends Component {
    state = {
        name: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
        valid: true
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const { name, lastName, email, password, repeatPassword, valid } = this.state;

        if (!name || !lastName || !email || !password || !repeatPassword) {
            this.setState({
                valid: false
            })
        }

        if (password !== repeatPassword) {
            this.setState({
                valid: false
            })
        }

        if (valid === true) {
            this.props.signup({ email, password });
        }
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { name, lastName, email, password, repeatPassword } = this.state;
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>

                    <label>Nombre</label>
                    <input type="text" name="name" value={name} onChange={this.handleChange} />

                    <label>Apellidos</label>
                    <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />

                    <label>e-mail</label>
                    <input type="text" name="email" value={email} onChange={this.handleChange} />

                    <label>contraseña</label>
                    <input type="password" name="password" value={password} onChange={this.handleChange} />

                    <label>Repite la contraseña</label>
                    <input type="text" name="repeatPassword" value={repeatPassword} onChange={this.handleChange} />

                    <input type="submit" value="Signup" />
                </form>

                <p>Already have account?</p>
                <Link to={"/login"}> Login</Link>
            </div>
        );
    }
}

export default withAuth(Signup);