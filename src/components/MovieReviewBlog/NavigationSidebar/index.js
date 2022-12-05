import React from "react";
import {Link} from "react-router-dom";
import {useProfile} from "../../../context/profile-context";

const NavigationSidebar = ({
                               active = 'explore'
                           }
) => {
    const {profile} = useProfile()
    return (
        <>
            <div className="list-group">
                <Link to="/"
                   className={`list-group-item list-group-item-action ${active === '/' ? 'active'
                                                                                         : ''}`}>
                    <i className="fas fa-home fa-lg p-1 wd-icon"></i> <span
                    className="d-none d-xl-block">Home</span></Link>
                <Link to="/search"
                   className={`list-group-item list-group-item-action ${active === '/search' ? 'active'
                                                                                         : ''}`}>
                    <i className="fas fa-search fa-lg p-1 wd-icon"></i> <span
                    className="d-none d-xl-block">Search</span></Link>
                <Link to="/signup"
                      className={`list-group-item list-group-item-action ${active === '/signup' ? 'active'
                                                                                                : ''}`}>
                    <i className="fas fa-user-plus fa-lg p-1 wd-icon"></i> <span
                    className="d-none d-xl-block">Sign Up</span></Link>
                <Link to="/signin"
                      className={`list-group-item list-group-item-action ${active === '/signin' ? 'active'
                                                                                                : ''}`}>
                    <i className="fas fa-sign-in-alt fa-lg p-1 wd-icon"></i> <span
                    className="d-none d-xl-block">Sign In</span></Link>


                <Link to="/profile"
                      className={`list-group-item  list-group-item-action ${active === '/profile'
                                                                            ? 'active'
                                                                            : ''}`}>
                    <i className="fas fa-user fa-lg p-1 wd-icon"></i> <span
                    className="d-none d-xl-block">Profile</span></Link>


                <Link to="/allUsers"
                      className={`list-group-item  list-group-item-action ${active === '/allUsers'
                                                                            ? 'active'
                                                                            : ''}`}>
                    <i className="fas fa-users fa-lg p-1 wd-icon"></i> <span
                    className="d-none d-xl-block">All Users</span></Link>


            </div>

        </>
    )
        ;
}
export default NavigationSidebar;
