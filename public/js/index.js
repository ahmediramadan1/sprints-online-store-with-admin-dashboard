import "core-js/stable";
import "regenerator-runtime/runtime";

import { login, logout, signup } from "./login.js";

const loginForm = document.querySelector("#login-form");
const logOutBtn = document.querySelector("#logout");
const signupForm = document.querySelector("#signup");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        login(email, password);
    });
}

if (logOutBtn) {
    logOutBtn.addEventListener("click", logout);
}

if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const passwordConfirm = document.getElementById("passwordConfirm").value;
        signup(name, email, password, passwordConfirm);
    });
}
