import axios from 'axios';
const API_BASE = 'http://localhost:4000/api';

export const likeMovie = async (movie) => {
    const response = await axios.post(`${API_BASE}/likes`, movie)
    return response.data;
}

export const dislikeMovie = async (movie) => {
    const response = await axios.post(`${API_BASE}/dislikes`, movie)
    return response.data;
}

export const reviewMovie = async (movie) => {
    const response = await axios.post(`${API_BASE}/review`, movie)
    return response.data;
}

export const deleteMovieReview = async (movie) => {
    const response = await axios.post(`${API_BASE}/deleteReview`);
    return response.data;
}

export const findAllMovies = async () => {
    const response = await axios.get(`${API_BASE}/movies`);
    const reviews = response.data;
    return reviews;
}




