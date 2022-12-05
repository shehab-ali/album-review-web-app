import axios from 'axios';
const API_BASE = 'http://localhost:4000/api';

export const likeAlbum = async (album) => {
    const response = await axios.post(`${API_BASE}/likes`, album)
    return response.data;
}

export const dislikeAlbum = async (album) => {
    const response = await axios.post(`${API_BASE}/dislikes`, album)
    return response.data;
}

export const reviewAlbum = async (album) => {
    const response = await axios.post(`${API_BASE}/review`, album)
    return response.data;
}

export const deleteAlbumReview = async (album) => {
    const response = await axios.post(`${API_BASE}/deleteReview`);
    return response.data;
}

export const findAllAlbums = async () => {
    const response = await axios.get(`${API_BASE}/albums`);
    const reviews = response.data;
    return reviews;
}




