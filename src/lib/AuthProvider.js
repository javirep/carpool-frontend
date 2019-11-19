import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import auth from "./auth-service";

const { Consumer, Provider } = React.createContext();

const withAuth = (WrappedComponent) => {

    return class extends Component {
        render() {
            return (
                <Consumer>
                    {
                        ({ login, signup, user, logout, isLoggedIn, me }) => {
                            return (
                                <WrappedComponent
                                    login={login}
                                    signup={signup}
                                    logout={logout}
                                    user={user}
                                    isLoggedIn={isLoggedIn}
                                    {...this.props}
                                />
                            )
                        }
                    }
                </Consumer>
            )
        }
    }

}

// Provider
class AuthProvider extends React.Component {
    state = { isLoggedIn: false, user: null, isLoading: false };

    // cuando el componente está montado llamo a la ruta auth.me() y me devuelve los datos del user, que me permiten cambiar los valores de las propiedades del state
    componentDidMount() {
        auth
            .me()
            .then(user => {
                console.log("stop loading")
                this.setState({ isLoggedIn: true, user: user, isLoading: false })

            }

            )
            .catch(err =>
                this.setState({ isLoggedIn: false, user: null, isLoading: false })
            );
    }

    signup = user => {
        const { email, password, lastName, name } = user;

        auth
            .signup({ email, password, lastName, name })
            .then(user => this.setState({ isLoggedIn: true, user }))
            .catch(({ response }) =>
                this.setState({ message: response.data.statusMessage })
            );
    };

    login = user => {
        const { email, password } = user;

        auth
            .login({ email, password })
            .then(user => this.setState({ isLoggedIn: true, user }))
            .catch(err => console.log(err));
    };

    logout = () => {
        auth
            .logout()
            .then(() => {
                this.setState({ isLoggedIn: false, user: null })

            })
            .catch(err => console.log(err));
    };

    render() {
        // deconstruimos del state las propiedades isLoading, isLoggedIn, user
        const { isLoading, isLoggedIn, user } = this.state;
        // deconstruimos de this los métodos login, logout, signup
        const { login, logout, signup } = this;

        return isLoading ? (
            <div>Loading</div>
        ) : (
                <Provider value={{ isLoggedIn, user, login, logout, signup }}>
                    {this.props.children}
                </Provider>
            ); /*<Provider> "value={}" data will be available to all <Consumer> components */
    }
}

export { Consumer, withAuth }; //  <--	REMEMBER TO E X P O R T  ! ! !

export default AuthProvider; //	  <--		REMEMBER TO E X P O R T  ! ! !