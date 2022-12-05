import {findAllUsers} from "../../../actions/users-actions";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import ReviewItemLinkedToMovie from "../../MovieReviewBlog/RenderReviews/renderReviewItemLinkedToMovie";

const AnonUser = () => {
    const {pID} = useParams()
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const user = users.find(x => x._id == pID);

    const [positiveMovies, setPositiveMovies] = useState([])
    const [negativeMovies, setNegativeMovies] = useState([])
    const [reviewedMovies, setReviewedMovies] = useState([])
    const getOurMovies = async () => {
        const response = await axios.get('http://localhost:4000/api/movies')
        const response2 = await axios.get(`http://localhost:4000/api/users/${pID}`)
        const response3 = await axios.get('http://localhost:4000/api/reviews')
        setReviewedMovies(response3.data.filter(r => r.postedBy.userID == pID));
        const thisUser = response2.data
        setPositiveMovies(
            response.data.filter(m => m.likes > 0 && thisUser.likedMovies.includes(m.imdbID)))
        setNegativeMovies(
            response.data.filter(m => m.likes < 0 && thisUser.dislikedMovies.includes(m.imdbID)))
    }
    useEffect(() => {
                  findAllUsers(dispatch)
                  getOurMovies()
              }, []
    );

    return (
        <div>
            <h2>{user && user.firstName} {user && user.lastName}</h2>
            <hr/>
            <h4>@{user && user.handle}</h4>
            <hr/>
            <ul className="list-group">
                {reviewedMovies.length > 0 ?
                 <li className="list-group-item">
                     All Reviews for Movies
                 </li> : <div></div>
                }

                {
                    reviewedMovies.map(review => {
                        return (<ReviewItemLinkedToMovie review={review}/>);
                    })
                }

                {positiveMovies.length > 0 ?
                 <li className="list-group-item">
                     Liked Movies
                 </li> : <div></div>
                }
                {positiveMovies &&
                 positiveMovies.map(movie =>
                                        <li className="list-group-item">
                                            <Link to={`/details/${movie.imdbID}`}>
                                                <img src={movie.poster} className="me-2"
                                                     height={100}/>
                                                {movie.title}
                                            </Link>
                                        </li>
                 )
                }
                {negativeMovies.length > 0 ?
                 <li className="list-group-item">
                     Disliked Movies
                 </li> : <div></div>
                }
                {negativeMovies &&
                 negativeMovies.map(movie =>
                                        <li className="list-group-item">
                                            <Link to={`/details/${movie.imdbID}`}>
                                                <img src={movie.poster} className="me-2"
                                                     height={100}/>
                                                {movie.title}
                                            </Link>
                                        </li>
                 )
                }
            </ul>


        </div>
    )

}

export default AnonUser;