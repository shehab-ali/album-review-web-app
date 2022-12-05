import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import SecureContent from "../Secure/SecureContent";
import {useProfile} from "../../context/profile-context";
import PostReview from "../MovieReviewBlog/PostReview";
import RenderReviewsForMovie from "../MovieReviewBlog/RenderReviews/renderReviewsForMovie";
import {likeMovie, dislikeMovie} from "../../actions/movies-actions";
import {useDispatch, useSelector} from "react-redux";
import {findAllMovies} from "../../actions/movies-actions";
import { ACCESSTOKEN } from './omdb-search';
const OmdbDetails = () => {


    const [status, setStatus] = useState("NEITHER")
    const [movieDetails, setMovieDetails] = useState({})

    const {imdbID} = useParams()
    let {profile} = useProfile()
    const {signin} = useProfile()
    const [info, setInfo] =
        useState(profile);
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
        
        setMovieDetails(response)
    }
    const dispatch = useDispatch();
    useEffect(() => {
        searchMovieByImdbID()
        findAllMovies()
        setInfo(profile)
    }, [])

    const movies = useSelector((state) => state.movies);
    let movie = movies.find(mv => mv.imdbID == imdbID);

    const handleLike = async () => {
        signin(info.email,info.password)
        setInfo(profile);
        if (status == "LIKED") {
            return;
        } else if (status == "DISLIKED") {
            let x = info.dislikedMovies.indexOf(imdbID)
            info.dislikedMovies.splice(x,1);
            info.likedMovies.push(imdbID)
            const response = await axios.put(`http://localhost:4000/api/users/${profile._id}`, info)

            const newMovie = {
                title: movieDetails.Title,
                poster: movieDetails.Poster,
                imdbID: movieDetails.imdbID
            }
            {
                movie ? await likeMovie(dispatch, movie) : await likeMovie(dispatch, newMovie)
            }

        } else {
            info.likedMovies.push(imdbID)
            const response = await axios.put(`http://localhost:4000/api/users/${profile._id}`, info)
        }

        const newMovie = {
            title: movieDetails.Title,
            poster: movieDetails.Poster,
            imdbID: movieDetails.imdbID
        }
        {
            movie ? await likeMovie(dispatch, movie) : await likeMovie(dispatch, newMovie)
        }
        signin(info.email,info.password)
        setInfo(profile);
        setStatus("LIKED");
    }

    const handleDislike = async () => {
        signin(info.email,info.password)
        setInfo(profile);
        if (status == "DISLIKED") {
            return;
        } else if (status == "LIKED") {
            let x = info.likedMovies.indexOf(imdbID)
            info.likedMovies.splice(x,1);
            info.dislikedMovies.push(imdbID)
            const response = await axios.put(`http://localhost:4000/api/users/${profile._id}`, info)

            const newMovie = {
                title: movieDetails.Title,
                poster: movieDetails.Poster,
                imdbID: movieDetails.imdbID
            }
            {
                movie ? await dislikeMovie(dispatch, movie) : await dislikeMovie(dispatch, newMovie)
            }

        } else {
            info.dislikedMovies.push(imdbID)
            const response = await axios.put(`http://localhost:4000/api/users/${profile._id}`, info)
        }
        const newMovie = {
            title: movieDetails.Title,
            poster: movieDetails.Poster,
            imdbID: movieDetails.imdbID
        }
        {
            movie ? await dislikeMovie(dispatch, movie) : await dislikeMovie(dispatch, newMovie)
        }
        setStatus("DISLIKED");
        signin(info.email,info.password)
        setInfo(profile);
    }

    let id = movieDetails.imdbID
    return (
        <div>
            <h1>{movieDetails.Title}</h1>
            <div className="wd-movie-details-container list-group-item">
                <img className="wd-image-container " src={movieDetails.Poster}/>
                <div className="wd-movie-plot ps-3">
                    {movieDetails.Plot}
                </div>
                <SecureContent>
                    <button className="rounded-pill wd-likes-dislikes-button m-2"
                            onClick={handleLike}>Like
                    </button>
                    <button className="rounded-pill wd-likes-dislikes-button "
                            onClick={handleDislike}>Dislike
                    </button>
                </SecureContent>
            </div>


            <SecureContent>
                {profile && movieDetails.imdbID && profile.role == 'REVIEWER' ? <PostReview
                    idDetails={{"movieID": movieDetails.imdbID, "userID": profile._id}}/> : <></>}
            </SecureContent>

            {movieDetails.imdbID && <RenderReviewsForMovie movieID={id}/>}
        </div>
    );
};

export default OmdbDetails;