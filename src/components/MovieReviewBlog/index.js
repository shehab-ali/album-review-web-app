import {Outlet, useLocation} from "react-router-dom";
import NavigationSidebar from "./NavigationSidebar";
import usersReducer from "../../reducers/users-reducer";
import reviewsReducer from "../../reducers/reviews-reducer";
import moviesReducer from "../../reducers/movies-reducer";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import WhoToFollowList
    from "./ReviewersList";

const reducer = combineReducers({
                                    users: usersReducer, reviews: reviewsReducer, movies: moviesReducer
                                });
const store = createStore(reducer);

const Blog = () => {
    const active = useLocation().pathname;
    console.log(active);
    return (
        <Provider store={store}>
            <div className="row mt-2">
                <div className="col-2 col-lg-1 col-xl-2">
                    <NavigationSidebar active={active}/>
                </div>
                <div className="col-10 col-lg-7 col-xl-6">
                    <Outlet/>
                </div>
                <div className="d-none d-lg-block col-lg-4 col-xl-4">
                    <WhoToFollowList/>
                </div>
            </div>
        </Provider>
    );
};
export default Blog;