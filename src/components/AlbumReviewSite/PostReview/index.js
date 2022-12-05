import {useDispatch}
    from "react-redux";
import React, {useEffect, useState} from "react";
import {createReview} from "../../../actions/reviews-actions";
import axios from "axios";
import {useParams} from "react-router-dom";
import { ACCESSTOKEN } from "../../Screens/omdb-search";

const API_URL = 'http://localhost:4000/api'

const PostReview = ({
                        idDetails = {
                            albumID: "000",
                            userID: "000"
                        }

                    }) => {
    const dispatch = useDispatch();
    const [newReview, setNewReview] =
        useState({
                     albumID: idDetails.albumID,
                     postedBy: {
                         userID: idDetails.userID,
                     },
                     review: "",
                     likes: 0,
                 });

    const [albumDetails, setAlbumDetails] = useState({})

    const {imdbID} = useParams()

    const searchAlbumByImdbID = async () => {
        const albumParams = {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + ACCESSTOKEN
            }
        }
        var response = await fetch('https://api.spotify.com/v1/albums/' + imdbID, albumParams)
        .then(response => response.json())

        response.Title = response.name
        response.Poster = response.images[0].url
        response.imdbID = response.id
        
        setAlbumDetails(response)
    }

    const handleReview = async () => {
        const album = {
            title: albumDetails.Title,
            poster: albumDetails.Poster,
            imdbID: albumDetails.imdbID
        }
        const response = await axios.post(`${API_URL}/review`, album)
        await createReview(dispatch,newReview)
    }

    useEffect(() => {
        searchAlbumByImdbID()
    }, [])

    return (
        <div className="list-group-item wd-whats-happening-container">
            <div className="p-3 wd-post-container">
                <textarea className="wd-review-textarea" placeholder="My Review"
                          onChange={(e) =>
                              setNewReview({
                                               ...newReview,
                                               albumID: idDetails.albumID,
                                               review: e.target.value
                                           })}>
                </textarea>
                <button className="float-end rounded-pill wd-review-button"
                        onClick={handleReview}>
                    Post
                </button>
            </div>
        </div>
    );
}
export default PostReview;