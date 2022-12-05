import {UPDATE_USER,CREATE_USER, DELETE_USER, FIND_ALL_USERS} from "../actions/users-actions";
const usersReducer = (state = [], action) => {
    switch (action.type) {
        case FIND_ALL_USERS:
            return action.users;
        case UPDATE_USER:
            return state.map(
                user => user._id === action.user._id ?
                        action.user : user);
        case DELETE_USER:
            return state.filter(
                user => user._id !== action.user._id);
        case CREATE_USER:
            return [action.newUser,
                    ...state
                   ];
        default:
            return state;
    }
}

export default usersReducer;