import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ReviewItem from "./renderReviewItem";
import {findAllReviewsForMovie} from "../../../actions/reviews-actions";
const RenderReviewsForMovie = (movieID = "000") => {
    const reviews = useSelector((state) => state.reviews);
    const dispatch = useDispatch();
    useEffect(() =>
                  findAllReviewsForMovie(dispatch,movieID.movieID)
        ,
              []);
    return (
        <ul className="list-group ">
            <li className="list-group-item">
                All Reviews for Movie
            </li>

            {
                reviews.map(review => {
                    return (<ReviewItem review={review}/>);
                })
            }

        </ul>
    );
}

export default RenderReviewsForMovie;

