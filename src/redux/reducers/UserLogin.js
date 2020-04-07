let initState = {
    user:"",
    password:""
}

export default function UserLoginReducer(state, action) {
    if(!state){
        state = initState;
    }
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case "SET_PASSWORD":
            return {
                ...state,
                password: action.password
            }
        default:
            return state;
    }
}