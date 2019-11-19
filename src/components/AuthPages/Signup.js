import React, { Component } from "react";
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
            console.log("from Signup.js" + name, lastName, email, password)
            this.props.signup({ name, lastName, email, password });
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
                <form className="form" onSubmit={this.handleFormSubmit}>
                    <h2> Registrate y empieza a compartir</h2>
                    <div>
                        <p>Nombre</p>
                        <input type="text" name="name" value={name} onChange={this.handleChange} />
                    </div>

                    <div>
                        <p>Apellidos</p>
                        <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
                    </div>

                    <div>
                        <p>e-mail</p>
                        <input type="mail" name="email" value={email} onChange={this.handleChange} />
                    </div>

                    <div>
                        <p>contraseña</p>
                        <input type="password" name="password" value={password} onChange={this.handleChange} />
                    </div>

                    <div>
                        <p>Repite la contraseña</p>
                        <input type="password" name="repeatPassword" value={repeatPassword} onChange={this.handleChange} />
                    </div>

                    <button type="submit" className="button" value="Signup" > Sign up </button>
                </form>
            </div>
        );
    }
}

export default withAuth(Signup);