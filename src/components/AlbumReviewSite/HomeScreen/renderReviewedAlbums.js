import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const API_URL = 'http://localhost:4000/api'
const RenderAllReviewedAlbums = () => {
    const [reviewedAlbums, setReviewedAlbums] = useState([])
    const [positiveAlbums, setPositiveAlbums] = useState([])
    const [negativeAlbums, setNegativeAlbums] = useState([])
    const getOurAlbums = async () => {
        const response = await axios.get(`${API_URL}/albums`)
        setReviewedAlbums(response.data.filter(m => m.reviews > 0));
        setPositiveAlbums(response.data.filter(m => m.likes > 0))
        setNegativeAlbums(response.data.filter(m => m.likes < 0))

    }
    useEffect(() => {
        getOurAlbums()
    }, [])

    return (
        <ul className="list-group wd-list-group-override">
            <li className="list-group-item">
                Albums with Reviews
            </li>
            {reviewedAlbums &&
             reviewedAlbums.map(album =>
                 <li className="list-group-item">
                     <Link to={`/details/${album.imdbID}`}>
                         <img src={album.poster} className="me-2" height={60}/>
                         {album.title}
                     </Link>
                 </li>
             )
            }
            <li className="list-group-item">
                Albums with Positive Feedback
            </li>
            {positiveAlbums &&
             positiveAlbums.map(album =>
                                    <li className="list-group-item">
                                        <Link to={`/details/${album.imdbID}`}>
                                            <img src={album.poster} className="me-2" height={60}/>
                                            {album.title}
                                        </Link>
                                    </li>
             )
            }
            <li className="list-group-item">
                Albums with Negative Feedback
            </li>
            {negativeAlbums &&
             negativeAlbums.map(album =>
                                    <li className="list-group-item">
                                        <Link to={`/details/${album.imdbID}`}>
                                            <img src={album.poster} className="me-2" height={60}/>
                                            {album.title}
                                        </Link>
                                    </li>
             )
            }
        </ul>
    );
}

export default RenderAllReviewedAlbums;

