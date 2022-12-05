import * as service from '../services/reviews-service';

export const CREATE_REVIEW = 'CREATE_REVIEW';
export const FIND_ALL_REVIEWS = 'FIND_ALL_REVIEWS';
export const FIND_ALL_REVIEWS_FOR_MOVIE = 'FIND_ALL_REVIEWS_FOR_MOVIE';
export const UPDATE_REVIEW = 'UPDATE_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';


export const createReview = async (dispatch, review) => {
    const newReview = await service.createReview(review);
    dispatch({
                 type: CREATE_REVIEW,
                 newReview
             });
}
export const findAllReviews = async (dispatch) => {
    const reviews = await service.findAllReviews();
    dispatch({
                 type: FIND_ALL_REVIEWS,
                 reviews
             });
}

export const findAllReviewsForMovie = async (dispatch, movieID) => {
    let reviews = await service.findAllReviews();
    reviews = reviews.filter(r => r.movieID == movieID);
    dispatch({
                 type: FIND_ALL_REVIEWS_FOR_MOVIE,
                 reviews
             });
}


export const updateReview = async (dispatch, review) => {
    const status = await service.updateReview(review);
    dispatch({
                 type: UPDATE_REVIEW,
                 review
             });
}

export const deleteReview = async (dispatch, review) => {
    const response = await service.deleteReview(review);
    dispatch({
                 type: DELETE_REVIEW,
                 review
             })
}
