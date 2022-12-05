import {Link} from "react-router-dom";
import React from "react";

const ReviewersListItem = ({
                                 who = {
                                     firstName: 'fn',
                                     lastName: 'ln',
                                     handle: '@'
                                 }
                             }
) => {
    return (
        <li className="list-group-item  position-relative">
            <div className="wd-content wd-post-container">
                <li className="list-group-item border-0 w-75 p-1">
                    <Link className="text-decoration-none" to={`/profile/${who._id}`}>
                        <h6 className="mt-1 mb-1">{who.firstName} {who.lastName}</h6>
                        @{who.handle}
                    </Link>
                </li>
            </div>

        </li>
    );
}
export default ReviewersListItem;

