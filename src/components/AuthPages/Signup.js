import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";

class Signup extends Component {
    state = {
        name: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
        errorMessage: "",
        passwordSecurity: ""
    };

    handleFormSubmit = async event => {
        event.preventDefault();
        const { name, lastName, email, password, repeatPassword } = this.state;
        let valid = false;
        let errorMessage = "";
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/


        if (!name || !lastName || !email || !password || !repeatPassword) {
            errorMessage = "Por favor rellene todos los campos";
        }
        else if (!/^[a-zA-Z]/.test(name)) {
            errorMessage = "Por favor introduce un nombre válido"
        }
        else if (!/^[a-zA-Z]/.test(lastName)) {
            errorMessage = "Por favor introduce un Apellido válido"
        }
        else if (!emailRegex.test(email)) {
            errorMessage = "Email no válido";
        }
        else if (password.length < 6) {
            errorMessage = "La contraseña debe tener más de 6 caracteres";
        }
        else if (password !== repeatPassword) {
            errorMessage = "La contraseñas no coinciden";
        }
        else {
            valid = true
        }

        if (valid) {
            await this.props.signup({ name, lastName, email, password });
            errorMessage = "Un momento por favor"
        }

        this.setState({
            errorMessage
        })
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handlePasswordSecurity = () => {
        console.log("handlePasswordSecurity")
        const { password } = this.state;
        console.log(password)
        let passwordSecurity = ""
        if (password) {
            passwordSecurity = "Contraseña no válida"
        }
        if (password.length > 6) {
            passwordSecurity = "Seguridad de contraseña: baja"
        }
        if (password.length >= 6 && /\d/.test(password) && /[A-Z]/.test(password)) {
            passwordSecurity = "Seguridad de contraseña: media"
        }
        if (password.length >= 6 && /\d/.test(password) && /[A-Z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
            passwordSecurity = "Seguridad de la contraseña: alta"
        }

        this.setState({
            passwordSecurity
        })
    }

    handleChangeAndPasswordSecurity = async (event) => {
        await this.handleChange(event);
        await this.handlePasswordSecurity();
    }

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

                    {
                        this.state.passwordSecurity ?
                            <span>{this.state.passwordSecurity}</span>
                            :
                            <></>
                    }
                    <div>
                        <p>Contraseña</p>
                        <input type="password" name="password" value={password} onChange={this.handleChangeAndPasswordSecurity} />
                    </div>

                    <div>
                        <p>Repite la contraseña</p>
                        <input type="password" name="repeatPassword" value={repeatPassword} onChange={this.handleChange} />
                    </div>

                    {
                        this.state.errorMessage ?
                            <span>{this.state.errorMessage}</span>
                            :
                            <></>
                    }

                    <button type="submit" className="button" value="Signup" > Sign up </button>
                </form>
            </div>
        );
    }
}

export default withAuth(Signup);