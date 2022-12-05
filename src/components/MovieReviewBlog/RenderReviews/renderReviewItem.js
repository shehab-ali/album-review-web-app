import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllUsers} from "../../../actions/users-actions";
import {Link} from "react-router-dom";

const ReviewItem = ({
                        review = {
                            movieID: "",
                            postedBy: {userID: "111"},
                            review: "",
                        }
                    }
) => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    useEffect(() =>
                  findAllUsers(dispatch)
        ,
              []);
    const user = users.find(x => x._id == review.postedBy.userID)

    return (

        <li className="list-group-item p-3 wd-post-container">
            <div className="wd-post-with-image">
                <div className="wd-content">
                    <div className="wd-content"> {review && review.review}</div>
                    <Link to={`/profile/${review && review.postedBy.userID}`}>
                         By : {user && user.firstName} {user && user.lastName}
                    </Link>

                </div>
            </div>
        </li>

    );
}
export default ReviewItem;
