let initState = {
    name:"小童豆子",
    description:"哇咔咔咔"
}

export default function InfoReducer(state, action){
    if(!state){
        state = initState;
    }
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name:action.name
            }
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.description
            }
        default:
            return  state;
    }
}