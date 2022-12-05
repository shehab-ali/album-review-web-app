import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const RenderAllReviewedMovies = () => {
    const [reviewedMovies, setReviewedMovies] = useState([])
    const [positiveMovies, setPositiveMovies] = useState([])
    const [negativeMovies, setNegativeMovies] = useState([])
    const getOurMovies = async () => {
        const response = await axios.get('http://localhost:4000/api/movies')
        setReviewedMovies(response.data.filter(m => m.reviews > 0));
        setPositiveMovies(response.data.filter(m => m.likes > 0))
        setNegativeMovies(response.data.filter(m => m.likes < 0))

    }
    useEffect(() => {
        getOurMovies()
    }, [])

    return (
        <ul className="list-group wd-list-group-override">
            <li className="list-group-item">
                Movies with Reviews
            </li>
            {reviewedMovies &&
             reviewedMovies.map(movie =>
                 <li className="list-group-item">
                     <Link to={`/details/${movie.imdbID}`}>
                         <img src={movie.poster} className="me-2" height={60}/>
                         {movie.title}
                     </Link>
                 </li>
             )
            }
            <li className="list-group-item">
                Movies with Positive Feedback
            </li>
            {positiveMovies &&
             positiveMovies.map(movie =>
                                    <li className="list-group-item">
                                        <Link to={`/details/${movie.imdbID}`}>
                                            <img src={movie.poster} className="me-2" height={60}/>
                                            {movie.title}
                                        </Link>
                                    </li>
             )
            }
            <li className="list-group-item">
                Movies with Negative Feedback
            </li>
            {negativeMovies &&
             negativeMovies.map(movie =>
                                    <li className="list-group-item">
                                        <Link to={`/details/${movie.imdbID}`}>
                                            <img src={movie.poster} className="me-2" height={60}/>
                                            {movie.title}
                                        </Link>
                                    </li>
             )
            }
        </ul>
    );
}

export default RenderAllReviewedMovies;

