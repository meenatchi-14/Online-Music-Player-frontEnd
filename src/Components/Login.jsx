/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "../index.css"
import React, { useEffect } from 'react'
import { app } from '../config/firebase.config'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from 'react-router-dom'
import { LoginBg } from "../assets/img"
import { useStateValue } from "../context/StateProvider"
import { validateUser } from '../Api/asiosService'
import { actionType } from "../context/reducer"
const Login = ({ setAuth }) => {
    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const [{ user }, dispatch] = useStateValue();
    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            if (userCred) {
                setAuth(true);
                window.localStorage.setItem("auth", "true");
                firebaseAuth.onAuthStateChanged((userCred) => {
                    if (userCred) {
                        userCred.getIdToken().then((token) => {
                            validateUser(token).then((data) => {
                                dispatch({
                                    type: actionType.SET_USER,
                                    user: data
                                })
                            })
                        })
                        navigate("/", { replace: true })
                    }
                    else {
                        setAuth(false)
                        dispatch({
                            type: actionType.SET_USER,
                            user: null
                        })
                        navigate("/login")
                    }
                })



            }
        })
    }
    useEffect(() => {
        if (window.localStorage.getItem("auth") === "true") {
            navigate("/", { replace: true })
        }
    }, [])
    return (
        <div className="relative w-screen h-screen">
            <img src={LoginBg} type="img/png" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div
                    className="w-full md:w-375 p-4 bg-lightOverlay drop-shadow-2xl rounded-md backdrop-blur-md 
        flex flex-col items-center justify-center"
                >
                    <div
                        onClick={loginWithGoogle}
                        className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md 
          bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md hover:font-semibold duration-100 ease-in-out transition-all">
                        <FcGoogle />
                        Sign in Google
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;