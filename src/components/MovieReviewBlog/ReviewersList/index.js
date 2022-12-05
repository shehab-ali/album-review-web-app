import React, {useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import ReviewersListItem from "./ReviewersListItem";
import{findAllUsers} from "../../../actions/users-actions";

const WhoToFollowList = () => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    useEffect(() =>
                  findAllUsers(dispatch),
              []);
    return (
        <ul className="list-group wd-list-group-override">
            <li className="list-group-item">
                Active Reviewers
            </li>

            {
                users.filter(u => u.role == 'REVIEWER').map(user => {
                    return (<ReviewersListItem who={user}/>);
                })
            }

        </ul>
    );
}

export default WhoToFollowList;
