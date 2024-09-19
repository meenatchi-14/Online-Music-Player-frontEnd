/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./index.css"
import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import { app } from './config/firebase.config'
import { getAuth } from 'firebase/auth'
import { validateUser } from './Api/asiosService'
import { AnimatePresence } from "framer-motion"
import { useStateValue } from "./context/StateProvider"
import { actionType } from "./context/reducer"
import { motion } from "framer-motion"
import Dashboard from "./Components/Dashboard "
import MusicPlayer from "./Components/MusicPlayer"
import Music from "./Components/Music"
import MainBar from "./Components/MainBar"
import Contact from "./Components/Contact"

function App() {
    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();

    const [{ user, allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
        useStateValue();

    const [auth, setAuth] = useState(
        false || window.localStorage.getItem("auth") === "true"
    );
    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then((token) => {
                    // console.log(token);
                    validateUser(token).then((data) => {
                        dispatch({
                            type: actionType.SET_USER,
                            user: data,
                        });
                    });
                });
            } else {
                setAuth(false);
                window.localStorage.setItem("auth", "false");
                dispatch({
                    type: actionType.SET_USER,
                    user: null,
                });
                navigate("/login");
            }
        });
    }, []);
    return (
        <AnimatePresence mode="wait">
            <div className="display h-auto min-w-[680px] bg-primary flex justify-center items-center">
                <Routes>
                    <Route path="/login" element={<Login setAuth={setAuth} />} />
                    <Route path="/*" element={<MainBar />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="/musics" element={<Music />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
                {isSongPlaying && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
                    >
                        <MusicPlayer />
                    </motion.div>
                )}

            </div>
        </AnimatePresence>

    );
}

export default App;