import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import SecureContent from "../Secure/SecureContent";
import {useProfile} from "../../context/profile-context";
import PostReview from "../AlbumReviewSite/PostReview";
import RenderReviewsForAlbum from "../AlbumReviewSite/RenderReviews/renderReviewsForAlbum";
import {likeAlbum, dislikeAlbum} from "../../actions/albums-actions";
import {useDispatch, useSelector} from "react-redux";
import {findAllAlbums} from "../../actions/albums-actions";
import { ACCESSTOKEN } from './omdb-search';

const API_URL = 'http://localhost:4000/api'


const OmdbDetails = () => {


    const [status, setStatus] = useState("NEITHER")
    const [albumDetails, setAlbumDetails] = useState({})

    const {imdbID} = useParams()
    let {profile} = useProfile()
    const {signin} = useProfile()
    const [info, setInfo] =
        useState(profile);
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
        console.log('here brotha', response)
        response.Title = response.name
        response.Poster = response.images[0].url
        response.imdbID = response.id
        
        setAlbumDetails(response)
    }
    const dispatch = useDispatch();
    useEffect(() => {
        searchAlbumByImdbID()
        findAllAlbums()
        setInfo(profile)
    }, [])

    const albums = useSelector((state) => state.albums);
    let album = albums.find(mv => mv.imdbID == imdbID);

    const handleLike = async () => {
        signin(info.email,info.password)
        setInfo(profile);
        if (status == "LIKED") {
            return;
        } else if (status == "DISLIKED") {
            let x = info.dislikedAlbums.indexOf(imdbID)
            info.dislikedAlbums.splice(x,1);
            info.likedAlbums.push(imdbID)
            const response = await axios.put(`${API_URL}/users/${profile._id}`, info)

            const newAlbum = {
                title: albumDetails.Title,
                poster: albumDetails.Poster,
                imdbID: albumDetails.imdbID
            }
            {
                album ? await likeAlbum(dispatch, album) : await likeAlbum(dispatch, newAlbum)
            }

        } else {
            info.likedAlbums.push(imdbID)
            const response = await axios.put(`${API_URL}/users/${profile._id}`, info)
        }

        const newAlbum = {
            title: albumDetails.Title,
            poster: albumDetails.Poster,
            imdbID: albumDetails.imdbID
        }
        {
            album ? await likeAlbum(dispatch, album) : await likeAlbum(dispatch, newAlbum)
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
            let x = info.likedAlbums.indexOf(imdbID)
            info.likedAlbums.splice(x,1);
            info.dislikedAlbums.push(imdbID)
            const response = await axios.put(`${API_URL}/users/${profile._id}`, info)

            const newAlbum = {
                title: albumDetails.Title,
                poster: albumDetails.Poster,
                imdbID: albumDetails.imdbID
            }
            {
                album ? await dislikeAlbum(dispatch, album) : await dislikeAlbum(dispatch, newAlbum)
            }

        } else {
            info.dislikedAlbums.push(imdbID)
            const response = await axios.put(`${API_URL}/users/${profile._id}`, info)
        }
        const newAlbum = {
            title: albumDetails.Title,
            poster: albumDetails.Poster,
            imdbID: albumDetails.imdbID
        }
        {
            album ? await dislikeAlbum(dispatch, album) : await dislikeAlbum(dispatch, newAlbum)
        }
        setStatus("DISLIKED");
        signin(info.email,info.password)
        setInfo(profile);
    }

    let id = albumDetails.imdbID
    return (
        <div>
            <h1>{albumDetails.Title}</h1>
            <div className="wd-album-details-container list-group-item">
                <img className="wd-image-container " src={albumDetails.Poster}/>
                <div className="wd-album-plot ps-3">
                    {albumDetails.Plot}
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
                {profile && albumDetails.imdbID && profile.role == 'REVIEWER' ? <PostReview
                    idDetails={{"albumID": albumDetails.imdbID, "userID": profile._id}}/> : <></>}
            </SecureContent>

            {albumDetails.imdbID && <RenderReviewsForAlbum albumID={id}/>}
        </div>
    );
};

export default OmdbDetails;