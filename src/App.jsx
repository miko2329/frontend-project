import './App.css'
import React from "react";
import {BrowserRouter, Routes, Route, Link, Navigate} from "react-router-dom";
import AllAboutCities from "./components/AllAboutCities.jsx";
import AllAboutCountries from "./components/AllAboutCountries.jsx";
import Distance from "./components/Distance/Distance.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import { getAuth, signOut } from "firebase/auth";
import app from "./firebase/firebase.js";
import Signup from "./components/Signup/Signup.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import {useAuth} from "./hooks/useAuth.js";
import {removeUser} from "./redux/slices/userSlice.js";
import {Provider, useDispatch} from "react-redux";
import HomeClass from "./components/Home/HomeClass.jsx";
import TextContextProvider from "./context/TextContextProvider.jsx";
import DistanceWithRedux from "./components/Distance/DistanceWithRedux.jsx";
import store from './redux/distanceStore'

function App() {

    const dispatcher = useDispatch();

    const {isAuth, email} = useAuth()

    const auth = getAuth(app);

    const logoutUser = () => {
        const permission = confirm("Are you sure about logging out?")

        if(permission) {
            signOut(auth).then(() => {
                dispatcher(removeUser())
                alert("Logged out successfully!")
            }).catch((error) => {
                console.log(error)
            });
        }
    }

    return (
        <div className="App">
            <BrowserRouter basename="/frontend-project">
                <nav className="navbar">
                    <ul className="navbarList">
                        <li className="navbarItem"><Link to="/">Home</Link></li>
                        <li className="navbarItem"><Link to="cities">Cities</Link></li>
                        <li className="navbarItem"><Link to="countries">Countries</Link></li>
                        <li className="navbarItem"><Link to="distance">Distance</Link></li>
                    </ul>
                    <ul className="user">
                        {!isAuth && <li className="navbarItem"><Link to="login">Login</Link></li>}
                        {!isAuth && <li className="navbarItem"><Link to="signup">Signup</Link></li>}
                        {isAuth && <li className="navbarItem"><Link to="profile">{email}</Link></li>}
                        {isAuth && <li className="navbarItem" onClick={logoutUser}>Logout</li>}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<TextContextProvider><HomeClass></HomeClass></TextContextProvider>}/>
                    <Route path="cities" element={<AllAboutCities/>}/>
                    <Route path="countries" element={<AllAboutCountries/>}/>
                    <Route path="distance" element={<Provider store={store}><DistanceWithRedux/></Provider>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="signup" element={<Signup/>}/>
                    <Route path="404" element={<NotFound/>}/>
                    <Route path="*" element={<Navigate replace={true} to={"/404"}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
