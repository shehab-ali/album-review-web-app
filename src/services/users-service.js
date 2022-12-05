import axios from 'axios';
const API_BASE = 'http://localhost:4000/api';// process.env.REACT_APP_API_BASE ||
const USERS_API = `${API_BASE}/users`;

export const createUser = async (user) => {
    const response = await axios.post(USERS_API, user)
    return response.data;
}

export const findAllUsers = async () => {
    const response = await axios.get(USERS_API);
    const users = response.data;
    return users;
}

export const deleteUser = async (user) => {
    const response = await axios
        .delete(`${USERS_API}/${user._id}`);
    return response.data;
}

export const updateUser = async (user) => {
    const response = await axios
        .put(`${USERS_API}/${user._id}`, user);
    return response.data;
}