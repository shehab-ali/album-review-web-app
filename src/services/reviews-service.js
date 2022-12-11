import axios from 'axios';
const API_BASE = 'https://album-review-server-app.herokuapp.com/api';
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

