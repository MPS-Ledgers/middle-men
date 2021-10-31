import {createStore} from "redux";
//import thunk from "redux-thunk";
// import reducers from "./reducers";
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(state => state
);
// export const store = createStore(
//     {},
//     composeEnhancers(applyMiddleware(thunk))
// );