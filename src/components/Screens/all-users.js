import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useProfile} from "../../context/profile-context";

const EditUsersScreen = () => {
    const {profile} = useProfile()
    const [users, setUsers] = useState([])
    const findAllUsers = async () => {
        const response = await axios.get('http://localhost:4000/api/users')
        let usersMinusCurrent = response.data.filter(user => user.role && user.role != 'ADMIN');
        setUsers(usersMinusCurrent);
    }
    useEffect(() => {
        findAllUsers();
    }, [])

    const handleDelete = async (userID) => {
        const response1 = await axios.get("http://localhost:4000/api/reviews")
        let reviews = response1.data
        let reviewsToDelete = reviews.filter(r => r.postedBy.userID == userID);
        reviewsToDelete.forEach(r => deleteReview(r))

        const response2 = await axios.get(`http://localhost:4000/api/users/${userID}`)
        let user = response2.data;
        const response3 = await axios.get("http://localhost:4000/api/movies")

        let moviesToUnLike = response3.data.filter(m => user.likedMovies.includes(m.imdbID));
        let moviesToUnDislike = response3.data.filter(m => user.dislikedMovies.includes(m.imdbID));
        moviesToUnLike.forEach(m => unLike(m))
        moviesToUnDislike.forEach(m => unDislike(m));

        const response = await axios.delete(`http://localhost:4000/api/users/${userID}`);
        await findAllUsers();
    }

    const deleteReview = async (r) => {
        await axios.delete(`http://localhost:4000/api/reviews/${r._id}`)
        const response2 = await axios.get("http://localhost:4000/api/movies")
        let movies = response2.data
        let movie = movies.find(m => m.imdbID == r.movieID)
        await axios.post("http://localhost:4000/api/deleteReview", movie);
    }

    const unLike = async (m) => {
        await axios.post("http://localhost:4000/api/dislikes", m)
    }

    const unDislike = async (m) => {
        await axios.post("http://localhost:4000/api/likes", m)
    }

    return (
        (

            <div>
                <h5 className="mt-3 ms-2 ">All Users</h5>
                <ul className="list-group wd-list-group-override">

                    {
                        users.filter(u => u.role == 'USER').map(user =>
                                                                    <li className="list-group-item">
                                                                        <Link
                                                                            className="text-decoration-none"
                                                                            to={`/profile/${user._id}`}>
                                                                            <h6 className="mt-1 mb-1">{user.firstName} {user.lastName}</h6>
                                                                            @{user.handle}
                                                                        </Link>
                                                                        {profile && profile.role
                                                                         == 'ADMIN' ?
                                                                         <button
                                                                             onClick={() => handleDelete(
                                                                                 user._id)}
                                                                             className="btn btn-primary float-end">
                                                                             Delete
                                                                         </button>
                                                                                    : <></>}
                                                                    </li>
                        )
                    }
                </ul>

                <h5 className="mt-3 ms-2 ">All Reviewers</h5>

                <ul className="list-group wd-list-group-override">
                    {
                        users.filter(u => u.role == 'REVIEWER').map(user =>
                                                                        <li className="list-group-item ">
                                                                            <Link
                                                                                className="text-decoration-none"
                                                                                to={`/profile/${user._id}`}>
                                                                                <h6 className="mt-1 mb-1">{user.firstName} {user.lastName}</h6>
                                                                                @{user.handle}
                                                                            </Link>
                                                                            {profile && profile.role
                                                                             == 'ADMIN' ?
                                                                             <button
                                                                                 onClick={() => handleDelete(
                                                                                     user._id)}
                                                                                 className="btn btn-primary float-end">
                                                                                 Delete
                                                                             </button>
                                                                                        : <></>}
                                                                        </li>
                        )
                    }
                </ul>

            </div>
        )
    );
};

export default EditUsersScreen;