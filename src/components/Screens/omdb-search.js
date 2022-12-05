import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

const CLIENT_ID = '584784eb9509426987fa47434822e1ac'
const CLIENT_SECRET = '41d8877539f44239b1f3269a675db1db'

export var ACCESSTOKEN = ''
const OmdbSearch = () => {

    const [albums, setAlbums] = useState("");

    const setAccessToken = (dat) => {
        ACCESSTOKEN = dat
    }

    const titleSearchRef = useRef()
    const {movieSearch} = useParams()
    const navigate = useNavigate()

    var authParams = {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', authParams)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))

    const searchByTitle = async () => {

        const searchString = titleSearchRef.current.value || movieSearch || 'clairo'

        const artistParams = {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + ACCESSTOKEN
            }
        }

        var artistId = await fetch('https://api.spotify.com/v1/search?q=' + searchString + '&type=artist', artistParams)
        .then(response => response.json())
        .then(data => { return data.artists.items[0].id})

        var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_groups=album&market=US&limit=50', artistParams)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            setAlbums(data.items)
        })

        // console.log('album current', albums[0])
        // console.log('album name', albums[0].name)
        // console.log('album id', albums[0].id)
        // console.log('album artistname', albums[0].artists[0].name)
        // console.log('album artistid', albums[0].artists[0].id)

        var retal = await fetch('https://api.spotify.com/v1/albums/' + albums[0].id, artistParams)
        .then(response => response.json())
        .then(data => console.log(data))

        titleSearchRef.current.value = searchString
        navigate(`/search/${searchString}`)
    }
    useEffect(() => {       
        searchByTitle()
    }, [])
    return (
        <div>
            <h1>Search an Album!</h1>
            <ul className="list-group wd-list-group-override">
                <li className="list-group-item">
                    <button
                        onClick={searchByTitle}
                        className="btn btn-primary float-end">Search
                    </button>
                    <input
                        ref={titleSearchRef}
                        className="form-control w-75"/>
                </li>
                {
                    albums && albums.map(album =>
                                             <li className="list-group-item">
                                                 <Link to={`/details/${album.id}`}>
                                                     <img src={album.images[0].url} className="me-2"
                                                          height={100}/>
                                                     {album.name}
                                                 </Link>
                                             </li>
                    )
                }
            </ul>
        </div>
    );
};

export default OmdbSearch;