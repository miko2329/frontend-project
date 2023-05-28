import React, {useState} from 'react';
import classes from "./signup.module.css";
import Button from "../Button/Button.jsx";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import app from "../../firebase/firebase.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/slices/userSlice.js";

const Signup = () => {

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

    const signupUser = () => {
        const auth = getAuth(app);

        createUserWithEmailAndPassword(auth, email, password)
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
                setEmail("")
                setPassword("")
                alert("Signed up and logged in successfully!")
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                if(errorCode==="auth/email-already-in-use") alert("Email you typed already exist!")
            });

    }

    return (
        <div className={classes.signupRoot}>
            <label htmlFor="email" className={classes.signupLabel}>Email:</label>
            <input className={classes.signupInput} type="email" id="email" placeholder="Enter your email" value={email} onChange={onEmailChange}/>
            <label htmlFor="password" className={classes.signupLabel}>Password:</label>
            <input className={classes.signupInput} type="password" id="password" placeholder="Enter your password" value={password} onChange={onPasswordChange}/>
            <Button text={"Signup"} fontSize={"20px"} onClick={signupUser}></Button>
        </div>
    );
};

export default Signup;