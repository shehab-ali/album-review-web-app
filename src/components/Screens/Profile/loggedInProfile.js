import * as service from "../../../services/auth-service"
import {Link, useNavigate} from "react-router-dom";
import {useProfile} from "../../../context/profile-context";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {signin} from "../../../services/auth-service";
import ReviewItemLinkedToMovie from "../../MovieReviewBlog/RenderReviews/renderReviewItemLinkedToMovie";

const LoggedInProfileScreen = () => {
    const {profile} = useProfile()
    const navigate = useNavigate()

    const logout = async () => {
        await service.logout()
        navigate('/signin')
    };
    const [info, setInfo] =
        useState(profile);

    const [positiveMovies, setPositiveMovies] = useState([])
    const [negativeMovies, setNegativeMovies] = useState([])
    const [reviewedMovies, setReviewedMovies] = useState([])

    const getOurMovies = async () => {
        const response = await axios.get('http://localhost:4000/api/movies')
        const response2 = await axios.get('http://localhost:4000/api/reviews')
        console.log(response.data)
        setReviewedMovies(response2.data.filter(r => r.postedBy.userID == profile._id));
        setPositiveMovies(
            response.data.filter(m => m.likes > 0 && profile.likedMovies.includes(m.imdbID)))
        setNegativeMovies(
            response.data.filter(m => m.likes < 0 && profile.dislikedMovies.includes(m.imdbID)))
    }

    useEffect(() => {
        setInfo(profile)
        getOurMovies()
    }, [])

    const updateInfo = async () => {
        const response = await axios.put(`http://localhost:4000/api/users/${profile._id}`, info)
        await signin(
            info.email, info.password
        )
        navigate('/profile')
    }

    return (
        <div>
            <h1>Profile</h1>
            <h5>
                @{profile.handle}
                <button className="btn btn-danger rounded-pill float-end"
                        onClick={logout}>Logout
                </button>
            </h5>

            <hr/>
            <h4>Personal Information</h4>
            <h6>Email: {profile.email}</h6>

            <input onChange={(e) => setInfo({...info, firstName: e.target.value})}
                   placeholder={"First Name: " + profile.firstName}
                   className="wd-input-field form-control w-50"
                   type="email"/>
            <input onChange={(e) => setInfo({...info, lastName: e.target.value})}
                   placeholder={"Last Name: " + profile.lastName}
                   className="wd-input-field form-control w-50"
                   type="email"/>
            <input onChange={(e) => setInfo({...info, handle: e.target.value})}
                   placeholder={"Handle: " + profile.handle}
                   className="wd-input-field form-control w-50"
                   type="email"/>
            <input onChange={(e) => setInfo({...info, password: e.target.value})}
                   placeholder={"Password: " + profile.password}
                   className="wd-input-field form-control w-50"
                   type="email"/>


            <button onClick={updateInfo} className="rounded-pill btn btn-primary">
                Update Info
            </button>
            <hr/>


            <ul className="list-group ">

                {reviewedMovies.length > 0 ?
                 <li className="list-group-item">
                     All Reviews for Movie
                 </li> : <div></div>
                }

                {
                    reviewedMovies.map(review => {
                        return (<ReviewItemLinkedToMovie review={review}/>);
                    })
                }


                {positiveMovies.length > 0 ?
                 <li className="list-group-item">
                     My Liked Movies
                 </li> : <div></div>
                }
                {positiveMovies &&
                 positiveMovies.map(movie =>
                                        <li className="list-group-item">
                                            <Link to={`/details/${movie.imdbID}`}>
                                                <img src={movie.poster} className="me-2"
                                                     height={60}/>
                                                {movie.title}
                                            </Link>
                                        </li>
                 )
                }
                {negativeMovies.length > 0 ?
                 <li className="list-group-item">
                     My Disliked Movies
                 </li> : <div></div>
                }

                {negativeMovies &&
                 negativeMovies.map(movie =>
                                        <li className="list-group-item">
                                            <Link to={`/details/${movie.imdbID}`}>
                                                <img src={movie.poster} className="me-2"
                                                     height={60}/>
                                                {movie.title}
                                            </Link>
                                        </li>
                 )
                }
            </ul>

        </div>
    );
};

export default LoggedInProfileScreen;