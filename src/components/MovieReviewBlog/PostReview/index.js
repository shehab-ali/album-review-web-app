import {useDispatch}
    from "react-redux";
import React, {useEffect, useState} from "react";
import {createReview} from "../../../actions/reviews-actions";
import axios from "axios";
import {useParams} from "react-router-dom";
import { ACCESSTOKEN } from "../../Screens/omdb-search";

const PostReview = ({
                        idDetails = {
                            movieID: "000",
                            userID: "000"
                        }

                    }) => {
    const dispatch = useDispatch();
    const [newReview, setNewReview] =
        useState({
                     movieID: idDetails.movieID,
                     postedBy: {
                         userID: idDetails.userID,
                     },
                     review: "",
                     likes: 0,
                 });

    const [movieDetails, setMovieDetails] = useState({})
    //const url = 'http://www.omdbapi.com/?apikey=852159f0'
    const {imdbID} = useParams()

    const searchMovieByImdbID = async () => {
        const albumParams = {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + ACCESSTOKEN
            }
        }
        var response = await fetch('https://api.spotify.com/v1/albums/' + imdbID, albumParams)
        .then(response => response.json())
        console.log('here brotha', response)
        response.Title = response.name
        response.Poster = response.images[0].url
        response.imdbID = response.id



        // const response = await axios.get(`${url}&i=${imdbID}`)
        // console.log(response.data)

        
        setMovieDetails(response)
    }

    const handleReview = async () => {
        const movie = {
            title: movieDetails.Title,
            poster: movieDetails.Poster,
            imdbID: movieDetails.imdbID
        }
        const response = await axios.post("http://localhost:4000/api/review", movie)
        await createReview(dispatch,newReview)
    }

    useEffect(() => {
        searchMovieByImdbID()
    }, [])

    return (
        <div className="list-group-item wd-whats-happening-container">
            <div className="p-3 wd-post-container">
                <textarea className="wd-review-textarea" placeholder="My Review"
                          onChange={(e) =>
                              setNewReview({
                                               ...newReview,
                                               movieID: idDetails.movieID,
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