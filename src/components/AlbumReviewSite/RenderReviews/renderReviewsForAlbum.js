import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ReviewItem from "./renderReviewItem";
import {findAllReviewsForAlbum} from "../../../actions/reviews-actions";
const RenderReviewsForAlbum = (albumID = "000") => {
    const reviews = useSelector((state) => state.reviews);
    const dispatch = useDispatch();
    useEffect(() =>
                  findAllReviewsForAlbum(dispatch,albumID.albumID)
        ,
              []);
    return (
        <ul className="list-group ">
            <li className="list-group-item">
                All Reviews for Album
            </li>

            {
                reviews.map(review => {
                    return (<ReviewItem review={review}/>);
                })
            }

        </ul>
    );
}

export default RenderReviewsForAlbum;

