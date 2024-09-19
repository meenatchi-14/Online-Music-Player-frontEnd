/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
//import { Link } from "react-router-dom";
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { deleteArtistById, getAllArtists } from "../Api/asiosService";
import { actionType } from "../context/reducer";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

const DashboardArtist = () => {
    const [{ allArtists }, dispatch] = useStateValue();

    useEffect(() => {
        if (!allArtists) {
            getAllArtists().then((data) => {
                dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: data.data });
            });
        }
    }, []);

    return (
        <div className="flex">
            <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
                {allArtists &&
                    allArtists.map((data, index) => (
                        <>
                            <ArtistCard key={index} data={data} index={index} />
                        </>
                    ))}
            </div>
        </div>
    );
};

export const ArtistCard = ({ data, index }) => {
    const [isDelete, setIsDelete] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);
    const [{ allArtists }, dispatch] = useStateValue();
    const deleteObject = (id) => {
        deleteArtistById(id).then((res) => {
            if (res.data.success) {
                setAlert("success");
                setAlertMsg(res.data.msg);
                getAllArtists().then((data) => {
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
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
        >
            <img
                src={data.imageURL}
                className="w-full h-40 object-cover rounded-md"
                alt=""
            />

            <p className="text-base text-textColor">{data.name}</p>
            <div className="flex items-center gap-4">
                <a href={data.instagram} target="_blank">
                    <motion.i whileTap={{ scale: 0.75 }}>
                        <IoLogoInstagram className="text-gray-500 hover:text-headingColor text-xl App-link" />
                    </motion.i>
                </a>
                <a href={data.twitter} target="_blank" >
                    <motion.i whileTap={{ scale: 0.75 }}>
                        <IoLogoTwitter className="text-gray-500 hover:text-headingColor text-xl App-link" />
                    </motion.i>
                </a>
            </div>
            <motion.i
                className="absolute bottom-2 right-2"
                whileTap={{ scale: 0.75 }}
                onClick={() => setIsDelete(true)}
            >
                <MdDelete className=" text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
            </motion.i>

            {isDelete && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4"
                >
                    <p className="text-gray-100 text-base text-center">
                        Are you sure do you want to delete this?
                    </p>
                    <div className="flex items-center w-full justify-center gap-3">
                        <div className="bg-red-300 px-3 rounded-md">
                            <p className="text-headingColor text-sm "
                                // onClick={() => console.log("no deleting anything")}
                                onClick={() => deleteObject(data._id)}
                            >Yes</p>
                        </div>
                        <div
                            className="bg-green-300 px-3 rounded-md"
                            onClick={() => setIsDelete(false)}
                        >
                            <p className="text-headingColor text-sm">No</p>
                        </div>
                    </div>
                </motion.div>
            )}
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

export default DashboardArtist;