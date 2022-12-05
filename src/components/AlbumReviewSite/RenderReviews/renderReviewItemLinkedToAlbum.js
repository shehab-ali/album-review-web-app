import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const ReviewItemLinkedToAlbum = ({
                                     review = {
                                         albumID: "",
                                         review: "",
                                     }
                                 }
) => {
    const [album, setAlbum] = useState([])
    const getTheAlbum = async () => {
        const response = await axios.get('http://localhost:4000/api/albums')
        setAlbum(response.data.find(m => m.imdbID == review.albumID));
    }
    useEffect(() => {
                  getTheAlbum()
              }
        ,
              []);
    return (

        <li className="list-group-item wd-album-details-container">


            <div>
                <Link className=" text-decoration-none"
                      to={album && `/details/${album.imdbID}`}>
                    <h6>{album && album.title}</h6>
                    <img className=" wd-image-container" src={album && album.poster}/>
                </Link>
                <div className=" wd-album-plot"> {review && review.review}</div>
            </div>


        </li>

    );
}
export default ReviewItemLinkedToAlbum;
