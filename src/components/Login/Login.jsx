import React, {useState} from 'react';
import classes from "./login.module.css";
import Button from "../Button/Button.jsx";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/firebase.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/slices/userSlice.js";

const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const loginUser = () => {
        const auth = getAuth(app);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                dispatch(setUser(
                    {
                        email: user.email,
                        id: user.uid,
                        token: user.accessToken
                    }
                ))
                setUser(user)
                setEmail("")
                setPassword("")
                alert("Logged in successfully!")
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    }

    return (
        <div className={classes.loginRoot}>
            <label htmlFor="email" className={classes.loginLabel}>Email:</label>
            <input className={classes.loginInput} type="email" id="email" placeholder="Enter your email" value={email} onChange={onEmailChange}/>
            <label htmlFor="password" className={classes.loginLabel}>Password:</label>
            <input className={classes.loginInput} type="password" id="password" placeholder="Enter your password" value={password} onChange={onPasswordChange}/>
            <Button text={"Login"} fontSize={"20px"} onClick={loginUser}></Button>
        </div>
    );
};

export default Login;