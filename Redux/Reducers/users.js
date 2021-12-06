import { USERS_DATA_STATE_CHANGE } from "../Constants";

const initialState={
    users:[]
}

export const users = (state = initialState, action) => {
    switch(action.type){
        case USERS_DATA_STATE_CHANGE :
            return{
                ...state,
                users: [...state.users, action.users]


            }
            default:
                return state
    }

}