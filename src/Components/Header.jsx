/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Logo } from '../assets/img/index'
import { NavLink, useNavigate } from 'react-router-dom'
import { isActiveStyles, isNotActiveStyles } from '../utils/style'
import { FaCrown } from "react-icons/fa"
import { useStateValue } from '../context/StateProvider'
import { app } from '../config/firebase.config'
import { getAuth } from 'firebase/auth'
import { motion } from "framer-motion"

const Header = () => {
    const [{ user }, dispatch] = useStateValue();
    const [ismenu, setIsmenu] = useState(false)
    const navigate = useNavigate()
    const logout = () => {
        const firebaseAuth = getAuth(app)
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem("auth", "false");
        }).catch((e) => console.log(e));
        navigate("/login", { replace: true })
    }
    return (
        <header className="flex items-center w-full p-4 md:py-2 md:px-6">
            <NavLink to={"*/"}>
                <img src={Logo} alt='logo' className="w-16 rounded-full" />
            </NavLink>
            <ul className="flex items-center justify-center ml-7">
                <li className="mx-5 text-lg"><NavLink to={"/home"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} >Home</NavLink></li>
                <li className="mx-5 text-lg"><NavLink to={"/music"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Music</NavLink></li>
                <li className="mx-5 text-lg"><NavLink to={"/premium"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Premium</NavLink></li>
                <li className="mx-5 text-lg"><NavLink to={"/contact"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Contact us</NavLink></li>
            </ul>
            <div
                onMouseMove={() => setIsmenu(true)}
                onMouseLeave={() => setIsmenu(false)}
                className="flex items-center ml-auto cursor-pointer gap-2 relative">
                <img src={user?.user?.imageURL} alt='img' className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg" referrerPolicy='no-referrer' />
                <div className="flex flex-col">
                    <p className="text-textColor text-lg hover:text-headingColor font-bold">  {user?.user?.name}</p>
                    <p className="flex items-center gap-2 text-xs text-gray-600 font-normal">
                        Premium Number. <FaCrown className="text-sm -ml-1 text-yellow-500" /></p>
                </div>
                {ismenu && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className='absolute z-10 top-12 flex flex-col right-0 w-225 gap-3 p-4 bg-card shadow-lg rounded-lg backdrop-blur-sm '>
                        <NavLink to={'/userProfile'}>
                            <p className='text-base text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>profile</p>
                        </NavLink>
                        <p className='text-base text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>My Favourties</p>
                        <hr />
                        {user?.user?.role === "admin" && (
                            <>
                                <NavLink to={'/dashboard/home'}>
                                    <p className='text-base text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>DashBoard</p>
                                </NavLink>
                            </>
                        )}

                        <hr />
                        <p className='text-base text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'
                            onClick={logout}>Signout</p>

                    </motion.div>
                )}

            </div>
        </header>
    )
}

export default Header;

