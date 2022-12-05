import {LIKE_MOVIE,DISLIKE_MOVIE,REVIEW_MOVIE,DELETE_MOVIE_REVIEW,FIND_ALL_MOVIES} from "../actions/movies-actions";
const moviesReducer = (state = [], action) => {
    switch (action.type) {
        case FIND_ALL_MOVIES:
            return action.movies;
        case LIKE_MOVIE:
            return state.map(
                movie => movie._id === action.updatedMovie._id ?
                          action.updatedMovie : movie);
        case DISLIKE_MOVIE:
            return state.map(
                movie => movie._id === action.updatedMovie._id ?
                         action.updatedMovie : movie);
        case REVIEW_MOVIE:
            return state.map(
                movie => movie._id === action.updatedMovie._id ?
                         action.updatedMovie : movie);
        case DELETE_MOVIE_REVIEW:
            return state.map(
                movie => movie._id === action.updatedMovie._id ?
                         action.updatedMovie : movie);
        default:
            return state;
    }
}

export default moviesReducer;