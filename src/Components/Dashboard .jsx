import React from 'react'
import Header from './Header'
import { NavLink, Route, Routes } from 'react-router-dom'
import { IoHome } from "react-icons/io5"
import { isActiveStyles, isNotActiveStyles } from '../utils/style.js'
import DashboardHome from './DashboardHome'
import DashboardUsers from './DashboardUsers'
import DashboardSongs from './DashboardSongs'
import DashboardArtist from './DashboardArtist'
import DashboardAlbum from './DashboardAlbum'
import DashboardNewSong from './DashboardNewSong'

const Dashboard = () => {
    return (
        <div className="w-screen h-screen flex flex-col ">
            <Header />
            <div className="w-[60%] p-4 my-2 flex items-center justify-evenly">

                <NavLink to={"/dashboard/dashHome"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>
                    <IoHome className='text-2xl text-textcolor' /></NavLink>
                <NavLink to={"/dashboard/users"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>
                    Users</NavLink>
                <NavLink to={"/dashboard/songs"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>
                    Songs</NavLink>
                <NavLink to={"/dashboard/artist"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>
                    Artist</NavLink>
                <NavLink to={"/dashboard/album"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>
                    Albums</NavLink>
            </div>
            <div className='my-4 w-full p-4'>
                <Routes>
                    <Route path='/dashHome' element={<DashboardHome />} />
                    <Route path='/users' element={<DashboardUsers />} />
                    <Route path='/songs' element={<DashboardSongs />} />
                    <Route path='/artist' element={<DashboardArtist />} />
                    <Route path='/album' element={<DashboardAlbum />} />
                    <Route path='/newsong' element={<DashboardNewSong />} />
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard 
