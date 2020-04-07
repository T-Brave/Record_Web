import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension"; //redux调试工具

import infoReducer from './reducers/info';
import UserLoginReducer from "./reducers/UserLogin";

const reducer = combineReducers({
    info: infoReducer,
    userlogin: UserLoginReducer
});

const store = createStore(reducer, {});

store.subscribe(() => {
    let state = store.getState();
});

// store.dispatch({
//     type: "SET_NAME",
//     name: "开心超人"
// });

export default store;