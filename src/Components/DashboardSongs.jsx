/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../context/StateProvider';
import { deleteSongById, getAllSongs } from '../Api/asiosService';
import { actionType } from '../context/reducer';
import { AiOutlineClear } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { motion } from "framer-motion";
import { IoAdd, IoTrash } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

export const SongContainer = ({ data }) => {
    return (
        <div className=" w-full  flex flex-wrap gap-3  items-center justify-evenly">
            {data &&
                data.map((song, i) => (
                    <SongCard key={song._id} data={song} index={i} />
                ))}
        </div>
    );
};

export const SongCard = ({ data, index }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);

    const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();

    const addSongToContext = () => {
        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_SONG_PLAYING,
                isSongPlaying: true,
            });
        }
        if (song !== index) {
            dispatch({
                type: actionType.SET_SONG,
                song: index,
            });
        }
    };

    const deleteObject = (id) => {
        console.log(id);
        deleteSongById(id).then((res) => {
            // console.log(res.data);
            if (res.data.success) {
                setAlert("success");
                setAlertMsg(res.data.msg);
                getAllSongs().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_SONGS,
                        allSongs: data.data,
                    });
                });
                setTimeout(() => {
                    setAlert(false);
                }, 4000);
            } else {
                setAlert("error");
                setAlertMsg(res.data.msg);
                setTimeout(() => {
                    setAlert(false);
                }, 4000);
            }
        });
    };
    return (
        <motion.div
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
            onClick={addSongToContext}
        >
            {isDeleted && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="absolute z-10 p-2 inset-0 bg-card backdrop-blur-md flex flex-col gap-6 items-center justify-center"
                >
                    <p className="text-sm text-center text-textColor font-semibold">
                        Are you sure do you want to delete this song?
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-teal-400"
                            onClick={() => deleteObject(data._id)}
                        >
                            Yes
                        </button>
                        <button
                            className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-gray-400"
                            onClick={() => setIsDeleted(false)}
                        >
                            No
                        </button>
                    </div>
                </motion.div>
            )}

            <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={data.imageURL}
                    referrerPolicy="no referrer"
                    alt=""
                    className=" w-full h-full rounded-lg object-cover"
                />
            </div>

            <p className="text-base text-center text-headingColor font-semibold my-2">
                {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data?.name}
                <span className="block text-sm text-gray-400 my-1">{data?.artist}</span>
            </p>

            <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
                <motion.i whileTap={{ scale: 0.75 }} onClick={() => setIsDeleted(true)}>
                    <IoTrash className="text-base text-red-400 drop-shadow-md hover:text-red-600" />
                </motion.i>
            </div>

            {alert && (
                <>
                    {alert === "success" ? (
                        <AlertSuccess msg={alertMsg} />
                    ) : (
                        <AlertError msg={alertMsg} />
                    )}
                </>
            )}
        </motion.div>
    );
};
const DashboardSongs = () => {
    const [songFilter, setSongFilter] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [filteredSongs, setFilteredSongs] = useState(null);

    const [{ allSongs }, dispatch] = useStateValue();

    useEffect(() => {
        if (!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.data,
                });
            });
        }
    }, []);

    useEffect(() => {
        if (songFilter.length > 0) {
            const filtered = allSongs.filter(
                (data) =>
                    data.artist.toLowerCase().includes(songFilter) ||
                    data.language.toLowerCase().includes(songFilter) ||
                    data.name.toLowerCase().includes(songFilter)
            );
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs(null);
        }
    }, [songFilter]);

    return (
        <div className="w-full h-auto p-4 flex flex-col">
            <div className="w-full gap-24 home flex justify-center items-center ">
                <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 m-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search"
               id="default-search"
               placeholder="Search here"
                    className={`w-50 p-4 ps-10 px-4 py-2 ml-5 border ${isFocus ? "border-gray-500 shadow-md" : "border-gray-300"}
                 rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold flex flex-col`}
                    value={songFilter}
                    onChange={(e) => setSongFilter(e.target.value)}
                    onBlur={() => setIsFocus(false)}
                    onFocus={() => setIsFocus(true)}
                    required
                />
    </div>
           
               

                {songFilter && (
                    <motion.i
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileTap={{ scale: 0.75 }}
                        onClick={() => {
                            setSongFilter("");
                            setFilteredSongs(null);
                        }}
                    >
                        <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
                    </motion.i>
                )}
                
                </div>
                <div className='flex justify-end'>
                <NavLink
                    to={"/dashboard/newSong"}
                    className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:font-bold hover:bg-green-400 hover:shadow-md cursor-pointer home"
                >
                    <button>ADD HERE...</button>
                </NavLink>
            </div>
            

            <div className="relative w-full  my-4 p-4 py-12 border border-gray-300 rounded-md">
                <div className="absolute top-4 left-4">
                    <p className="text-xl font-bold">
                        <span className="text-sm font-semibold text-textColor">
                            Count :{" "}
                        </span>
                        {filteredSongs ? filteredSongs?.length : allSongs?.length}
                    </p>
                </div>

                <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
            </div>
        </div>
    );
};

export default DashboardSongs;
