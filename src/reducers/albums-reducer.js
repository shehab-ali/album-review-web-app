import {LIKE_ALBUM,DISLIKE_ALBUM,REVIEW_ALBUM,DELETE_ALBUM_REVIEW,FIND_ALL_ALBUMS} from "../actions/albums-actions";
const albumsReducer = (state = [], action) => {
    switch (action.type) {
        case FIND_ALL_ALBUMS:
            return action.albums;
        case LIKE_ALBUM:
            return state.map(
                album => album._id === action.updatedAlbum._id ?
                          action.updatedAlbum : album);
        case DISLIKE_ALBUM:
            return state.map(
                album => album._id === action.updatedAlbum._id ?
                         action.updatedAlbum : album);
        case REVIEW_ALBUM:
            return state.map(
                album => album._id === action.updatedAlbum._id ?
                         action.updatedAlbum : album);
        case DELETE_ALBUM_REVIEW:
            return state.map(
                album => album._id === action.updatedAlbum._id ?
                         action.updatedAlbum : album);
        default:
            return state;
    }
}

export default albumsReducer;