import * as service from '../services/reviews-service';

export const CREATE_REVIEW = 'CREATE_REVIEW';
export const FIND_ALL_REVIEWS = 'FIND_ALL_REVIEWS';
export const FIND_ALL_REVIEWS_FOR_ALBUM = 'FIND_ALL_REVIEWS_FOR_ALBUM';
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

export const findAllReviewsForAlbum = async (dispatch, albumID) => {
    let reviews = await service.findAllReviews();
    reviews = reviews.filter(r => r.albumID === albumID);
    dispatch({
                 type: FIND_ALL_REVIEWS_FOR_ALBUM,
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
