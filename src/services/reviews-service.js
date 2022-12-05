import axios from 'axios';
const API_BASE = 'http://localhost:4000/api'; //process.env.REACT_APP_API_BASE || 
const REVIEWS_API = `${API_BASE}/reviews`;

export const createReview = async (review) => {
    const response = await axios.post(REVIEWS_API, review)
    return response.data;
}

export const findAllReviews = async () => {
    const response = await axios.get(REVIEWS_API);
    const reviews = response.data;
    return reviews;
}

export const deleteReview = async (review) => {
    const response = await axios
        .delete(`${REVIEWS_API}/${review._id}`);
    return response.data;
}

export const updateReview = async (review) => {
    const response = await axios
        .put(`${REVIEWS_API}/${review._id}`, review);
    return response.data;
}

