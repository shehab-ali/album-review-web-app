import {UPDATE_REVIEW,CREATE_REVIEW,DELETE_REVIEW,FIND_ALL_REVIEWS,FIND_ALL_REVIEWS_FOR_ALBUM} from "../actions/reviews-actions";
const reviewsReducer = (state = [], action) => {
    switch (action.type) {
        case FIND_ALL_REVIEWS:
            return action.reviews;
        case FIND_ALL_REVIEWS_FOR_ALBUM:
            return action.reviews;
        case UPDATE_REVIEW:
            return state.map(
                review => review._id === action.review._id ?
                        action.review : review);
        case DELETE_REVIEW:
            return state.filter(
                review => review._id !== action.review._id);
        case CREATE_REVIEW:
            return [action.newReview,
                    ...state
            ];
        default:
            return state;
    }
}

export default reviewsReducer;