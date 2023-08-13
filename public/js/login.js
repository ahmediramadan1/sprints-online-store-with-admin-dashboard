import axios from "axios";

export const signup = async (name, email, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: "POST",
            url: `http://127.0.0.1:${process.env.PORT}/api/users/signup`,
            data: {
                name,
                email,
                password,
                passwordConfirm,
            },
        });

        if (res.data.status === "success") {
            window.setTimeout(() => {
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        alert(err.response.data.message);
    }
};

export const login = async (email, password) => {
    try {
        const res = await axios({
            method: "POST",
            url: `http://127.0.0.1:${process.env.PORT}/api/users/login`,
            data: {
                email,
                password,
            },
        });

        if (res.data.status === "success") {
            window.setTimeout(() => {
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        alert(err.response.data.message);
    }
};

export const logout = async () => {
    try {
        const res = await axios({
            method: "GET",
            url: `http://127.0.0.1:${process.env.PORT}/api/users/logout`,
        });

        if (res.data.status === "success") {
            location.reload(true);
        }
    } catch (err) {
        alert("Error logging out! Please try again.");
    }
};
