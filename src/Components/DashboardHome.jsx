/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { FaUser } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { bgColors } from "../utils/style.js";
import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from '../Api/asiosService.js';
import { actionType } from '../context/reducer.js';

export const DashboardCard = ({ icon, name, count }) => {
    const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];
    return (
        <div style={{ background: `${bg_color}` }}
            className='p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-red-100'>
            {icon}
            <p className='text-xl text-textcolor font-semibold'>{name}</p>
            <p className='text-xl text-textcolor'>{count}</p>
        </div>
    )
}

const DashboardHome = () => {
    const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] = useStateValue();


    useEffect(() => {
        if (!allUsers) {
            getAllUsers().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_USERS,
                    allUsers: data.data,
                });
            });
        }

        if (!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.data,
                });
            });
        }

        if (!allArtists) {
            getAllArtists().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_ARTISTS,
                    allArtists: data.data
                });
            });
        }

        if (!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_ALBUMS,
                    allAlbums: data.data
                });
            });
        }
    }, []);

    return (
        <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
            <DashboardCard
                icon={<FaUser className="text-3xl text-textColor" />}
                name={"Users"}
                count={allUsers?.length > 0 ? allUsers?.length : 0}
            />
            <DashboardCard
                icon={<GiLoveSong className="text-3xl text-textColor" />}
                name={"Songs"}
                count={allSongs?.length > 0 ? allSongs?.length : 0}
            />
            <DashboardCard
                icon={<RiUserStarFill className="text-3xl text-textColor" />}
                name={"Artist"}
                count={allArtists?.length > 0 ? allArtists?.length : 0}
            />
            <DashboardCard
                icon={<GiMusicalNotes className="text-3xl text-textColor" />}
                name={"Album"}
                count={allAlbums?.length > 0 ? allAlbums?.length : 0}
            />
        </div>
    )
}

export default DashboardHome
