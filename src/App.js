import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProfileProvider} from "./context/profile-context";
import SecureRoute from "./components/Secure/SecureRoute";
import './components/AlbumReviewSite/albumReviewSite.css'
import HomeScreen from "./components/AlbumReviewSite/HomeScreen";
import LoggedInProfileScreen from "./components/Screens/Profile/loggedInProfile";
import Blog from "./components/AlbumReviewSite";
import OmdbSearch from "./components/Screens/omdb-search";
import Signup from "./components/Screens/signup";
import Signin from "./components/Screens/signin";
import OmdbDetails from "./components/Screens/omdb-details";
import EditUsersScreen from "./components/Screens/all-users";
import ProfileScreen from "./components/Screens/Profile/ProfileScreen";

function App() {
    return (
        <ProfileProvider>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Blog/>}>
                            <Route index
                                   element={<HomeScreen/>}/>
                            <Route path="signup" element={<Signup/>}/>
                            <Route path="signin" element={<Signin/>}/>
                            <Route path="profile"
                                   element={
                                       <SecureRoute>
                                           <LoggedInProfileScreen/>
                                       </SecureRoute>
                                   }/>
                            <Route path="profile/:pID"
                                   element={<ProfileScreen/>}/>
                            <Route path="search" element={<OmdbSearch/>}/>
                            <Route path="search/:albumSearch" element={<OmdbSearch/>}/>
                            <Route path="/details/:imdbID" element={<OmdbDetails/>}/>
                            <Route path="allUsers" element={<EditUsersScreen/>}/>
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </ProfileProvider>
    );
}

export default App;
