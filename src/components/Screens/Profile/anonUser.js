import {findAllUsers} from "../../../actions/users-actions";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import ReviewItemLinkedToAlbum from "../../AlbumReviewSite/RenderReviews/renderReviewItemLinkedToAlbum";

const API_URL = 'https://album-review-server-app.herokuapp.com/api';

const AnonUser = () => {
    const {pID} = useParams()
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const user = users.find(x => x._id === pID);

    const [positiveAlbums, setPositiveAlbums] = useState([])
    const [negativeAlbums, setNegativeAlbums] = useState([])
    const [reviewedAlbums, setReviewedAlbums] = useState([])
    const getOurAlbums = async () => {
        const response = await axios.get(`${API_URL}/albums`)
        const response2 = await axios.get(`${API_URL}/users/${pID}`)
        const response3 = await axios.get(`${API_URL}/reviews`)
        setReviewedAlbums(response3.data.filter(r => r.postedBy.userID === pID));
        const thisUser = response2.data
        setPositiveAlbums(
            response.data.filter(m => m.likes > 0 && thisUser.likedAlbums.includes(m.imdbID)))
        setNegativeAlbums(
            response.data.filter(m => m.likes < 0 && thisUser.dislikedAlbums.includes(m.imdbID)))
    }
    useEffect(() => {
                  findAllUsers(dispatch)
                  getOurAlbums()
              }, []
    );

    return (
        <div>
            <h2>{user && user.firstName} {user && user.lastName}</h2>
            <hr/>
            <h4>@{user && user.handle}</h4>
            <hr/>
            <ul className="list-group">
                {reviewedAlbums.length > 0 ?
                 <li className="list-group-item">
                     All Reviews for Albums
                 </li> : <div></div>
                }

                {
                    reviewedAlbums.map(review => {
                        return (<ReviewItemLinkedToAlbum review={review}/>);
                    })
                }

                {positiveAlbums.length > 0 ?
                 <li className="list-group-item">
                     Liked Albums
                 </li> : <div></div>
                }
                {positiveAlbums &&
                 positiveAlbums.map(album =>
                                        <li className="list-group-item">
                                            <Link to={`/details/${album.imdbID}`}>
                                                <img src={album.poster} className="me-2"
                                                     height={100}/>
                                                {album.title}
                                            </Link>
                                        </li>
                 )
                }
                {negativeAlbums.length > 0 ?
                 <li className="list-group-item">
                     Disliked Albums
                 </li> : <div></div>
                }
                {negativeAlbums &&
                 negativeAlbums.map(album =>
                                        <li className="list-group-item">
                                            <Link to={`/details/${album.imdbID}`}>
                                                <img src={album.poster} className="me-2"
                                                     height={100}/>
                                                {album.title}
                                            </Link>
                                        </li>
                 )
                }
            </ul>


        </div>
    )

}

export default AnonUser;