import React, {useState} from "react";
import useForm from "./useForm";
import validate from "./LoginFormValidationRules";
import css from "./styles.module.scss";
import axios from "axios";

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    PhoneAuthProvider,
    signInAnonymously,
    signInWithPhoneNumber, RecaptchaVerifier
} from "firebase/auth";
import {Auth} from "src/shared/utils/auth";


export const Login = props => {
    const [loggedIn, setLoggedIn] = useState(false);

    const [isAuth, setIsAuth] = React.useState(false);
    const [token, setToken] = React.useState("");

    const login = () => {
        setLoggedIn(true);
        console.log("SUCCESS LOGIN");
    };





    const {values, errors, handleChange, handleSubmit} = useForm(
        login,
        validate
    );

    const loginWithGoogle = () => {
        const auth = getAuth();
        let provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(credential => {

            })
            .catch(err => {
                console.log(err);
            });
    };

    const loginWithPhone = () => {
        const phoneNumber = "+996777382750";
        const auth = getAuth();
        const applicationVerifier = new RecaptchaVerifier('captchaId', {
            'size': 'normal',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
            }
        }, auth);
        signInWithPhoneNumber(auth, phoneNumber, applicationVerifier)
            .then(res => {
                console.log(res);
            });
    };

    return (
        <div className={css.root}>
            <button className={css.test}
                    type="button"
                    onClick={loginWithGoogle}
            >
                Google
            </button>

            <button className={css.test}
                    type="button"
                    onClick={loginWithPhone}
            >
                Phone
            </button>

            <div className={css.container}>
                <div className={css.captcha} id="captchaId">
                </div>
                <div className={css.box}>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className={css.field}>
                            <label className={css.label}>Email Address</label>
                            <div className={css.control}>
                                <input
                                    autoComplete="off"
                                    className={`input ${errors.email && "is-danger"}`}
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email || ""}
                                    required
                                />
                                {errors.email && (
                                    <p className="help is-danger">{errors.email}</p>
                                )}
                            </div>
                        </div>
                        <div className={css.field}>
                            <label className={css.label}>Password</label>
                            <div className={css.control}>
                                <input
                                    className={`input ${errors.password && "is-danger"}`}
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={values.password || ""}
                                    required
                                />
                            </div>
                            {errors.password && (
                                <p className="help is-danger">{errors.password}</p>
                            )}
                        </div>
                        <div className={css.buttons}>
                            <button type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
