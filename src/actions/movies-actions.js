import * as service from '../services/movies-service';

export const LIKE_MOVIE = 'LIKE_MOVIE';
export const DISLIKE_MOVIE = 'DISLIKE_MOVIE';
export const REVIEW_MOVIE = 'REVIEW_MOVIE';
export const DELETE_MOVIE_REVIEW = 'DELETE_MOVIE_REVIEW';
export const FIND_ALL_MOVIES = 'FIND_ALL_MOVIES';



export const likeMovie = async (dispatch, movie) => {
    const updatedMovie = await service.likeMovie(movie);
    dispatch({
                 type: LIKE_MOVIE,
                 updatedMovie
             });
}
export const dislikeMovie = async (dispatch, movie) => {
    const updatedMovie = await service.dislikeMovie(movie);
    dispatch({
                 type: DISLIKE_MOVIE,
                 updatedMovie
             });
}
export const reviewMovie = async (dispatch, movie) => {
    const updatedMovie = await service.reviewMovie(movie);
    dispatch({
                 type: REVIEW_MOVIE,
                 updatedMovie
             });
}
export const deleteMovieReview = async (dispatch, movie) => {
    const updatedMovie = await service.deleteMovieReview(movie);
    dispatch({
                 type: DELETE_MOVIE_REVIEW,
                 updatedMovie
             });
}

export const findAllMovies = async (dispatch) => {
    const movies = await service.findAllMovies();
    dispatch({
                 type: FIND_ALL_MOVIES,
                 movies
             });
}