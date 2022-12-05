import AnonUser from "./anonUser";
import LoggedInProfileScreen from "./loggedInProfile";
import {useParams} from "react-router-dom";
import {useProfile} from "../../../context/profile-context";
import {useEffect, useState} from "react";

const ProfileScreen = () => {
    const {pID} = useParams()
    const {profile,checkLoggedIn} = useProfile();
    const [currentUser, setCurrentUser] = useState()
    const check = async () => {
        try {
            const user = await checkLoggedIn()
            setCurrentUser(user)
        } catch (e) {
            setCurrentUser(null);
        }
    }
    useEffect(() => { check() }, [])
    return (
        (currentUser && profile && profile._id === pID) ? <LoggedInProfileScreen/> : <AnonUser/>
    )

}

export default ProfileScreen