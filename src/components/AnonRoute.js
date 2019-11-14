import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

// El componente <AnonRoute /> recibe como argumento un objeto con las propiedades: isLoggedIn y el resto de las props, y además un componente en la key component

function AnonRoute({ component: Component, isLoggedin, ...rest }) {
    // devuelve un componente <Route /> donde su prop render recibe las props, y si el usuario no está logueado, devuelve el componente con sus props (history, etc.), en caso contrario, el componente <Redirect /> redirige a /private
    return (
        <Route
            {...rest}
            render={props =>
                !isLoggedin ? <Component {...props} /> : <Redirect to="/private" />
            }
        />
    );
}

export default withAuth(AnonRoute);