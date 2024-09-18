
import axios from "axios"

const baseURL = "http://localhost:9695"

export const validateUser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}/app/users/login`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        return res.data;
    } catch (error) {
        return error;
    }
}
export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}/app/users/getAllUsers`)
        return res.data;
    } catch (error) {
        return error
    }
}
export const getAllArtists = async () => {
    try {
        const res = await axios.get(`${baseURL}/app/artists/getAllArtists`);
        return res.data;

    } catch (error) {
        return null;
    }
};
export const getAllSongs = async () => {
    try {
        const res = await axios.get(`${baseURL}/app/songs/getAllSongs`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllAlbums = async () => {
    try {
        const res = await axios.get(`${baseURL}/app/albums/getAllAlbums`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const changingUserRole = async (userId, role) => {
    try {
        const res = axios.put(`${baseURL}/app/users/updateRole/${userId}`, {
            data: { role: role },
        });
        return res;
    } catch (error) {
        return null;
    }
};

export const removeUser = async (userId) => {
    try {
        const res = axios.delete(`${baseURL}/app/users/delete/${userId}`);
        return res;
    } catch (error) {
        return null;
    }
};

export const deleteSongById = async (songId) => {
    try {
        const res = axios.delete(`${baseURL}/app/songs/delete/${songId}`);
        return res;
    } catch (error) {
        return null;
    }
};

export const deleteAlbumById = async (albumId) => {
    try {
        const res = axios.delete(`${baseURL}/app/albums/delete/${albumId}`);
        return res;
    } catch (error) {
        return null;
    }
};

export const saveNewAlbum = async (data) => {
    try {
        const res = axios.post(`${baseURL}/app/albums/save`, { ...data });
        return (await res).data.album;
    } catch (error) {
        return null;
    }
};

export const saveNewSong = async (data) => {
    try {
        const res = axios.post(`${baseURL}/app/songs/save`, { ...data });
        return (await res).data.song;
    } catch (error) {
        return null;
    }
};

export const saveNewArtist = async (data) => {
    try {
        const res = axios.post(`${baseURL}app/artists/save`, { ...data });
        return (await res).data.artist;
    } catch (error) {
        return null;
    }
};
