import * as service from "../../../services/auth-service"
import {Link, useNavigate} from "react-router-dom";
import {useProfile} from "../../../context/profile-context";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {signin} from "../../../services/auth-service";
import ReviewItemLinkedToAlbum from "../../AlbumReviewSite/RenderReviews/renderReviewItemLinkedToAlbum";

const API_URL = 'https://album-review-server-app.herokuapp.com/api';

const LoggedInProfileScreen = () => {
    const {profile} = useProfile()
    const navigate = useNavigate()

    const logout = async () => {
        await service.logout()
        navigate('/signin')
    };
    const [info, setInfo] =
        useState(profile);

    const [positiveAlbums, setPositiveAlbums] = useState([])
    const [negativeAlbums, setNegativeAlbums] = useState([])
    const [reviewedAlbums, setReviewedAlbums] = useState([])

    const getOurAlbums = async () => {
        const response = await axios.get(`${API_URL}/albums`)
        const response2 = await axios.get(`${API_URL}/reviews`)
        console.log(response.data)
        setReviewedAlbums(response2.data.filter(r => r.postedBy.userID === profile._id));
        setPositiveAlbums(
            response.data.filter(m => m.likes > 0 && profile.likedAlbums.includes(m.imdbID)))
        setNegativeAlbums(
            response.data.filter(m => m.likes < 0 && profile.dislikedAlbums.includes(m.imdbID)))
    }

    useEffect(() => {
        setInfo(profile)
        getOurAlbums()
    }, [])

    const updateInfo = async () => {
        const response = await axios.put(`${API_URL}/users/${profile._id}`, info)
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

                {reviewedAlbums.length > 0 ?
                 <li className="list-group-item">
                     All Reviews for Album
                 </li> : <div></div>
                }

                {
                    reviewedAlbums.map(review => {
                        return (<ReviewItemLinkedToAlbum review={review}/>);
                    })
                }


                {positiveAlbums.length > 0 ?
                 <li className="list-group-item">
                     My Liked Albums
                 </li> : <div></div>
                }
                {positiveAlbums &&
                 positiveAlbums.map(album =>
                                        <li className="list-group-item">
                                            <Link to={`/details/${album.imdbID}`}>
                                                <img src={album.poster} className="me-2"
                                                     height={60}/>
                                                {album.title}
                                            </Link>
                                        </li>
                 )
                }
                {negativeAlbums.length > 0 ?
                 <li className="list-group-item">
                     My Disliked Albums
                 </li> : <div></div>
                }

                {negativeAlbums &&
                 negativeAlbums.map(album =>
                                        <li className="list-group-item">
                                            <Link to={`/details/${album.imdbID}`}>
                                                <img src={album.poster} className="me-2"
                                                     height={60}/>
                                                {album.title}
                                            </Link>
                                        </li>
                 )
                }
            </ul>

        </div>
    );
};

export default LoggedInProfileScreen;