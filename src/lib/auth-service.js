import axios from "axios";

class Auth {
    constructor() {
        this.auth = axios.create({
            baseURL: "http://localhost:4000",
            withCredentials: true
        })
    }

    signup(user) {
        const { email, password } = user
        return this.auth
            .post("/auth/signup", { email, password })
            .then(({ data }) => data)
    }

    login(user) {
        const { email, password } = user;
        return this.auth
            .post("/auth/login", { email, password })
            .then(({ data }) => data)
    }

    logout() {
        return this.auth.post("/auth/logout", {}).then((response) => response.data)
    }

    me() {
        return this.auth.get("auth/me").then((response) => response.data)
    }
}

const axiosRequestFunctions = new Auth()

export default axiosRequestFunctions;