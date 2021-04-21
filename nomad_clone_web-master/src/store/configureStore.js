import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import reducer from "../reducers";
import rootSaga from "../sagas";

export const history = createBrowserHistory();

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares, routerMiddleware(history)))
      : composeWithDevTools(
          applyMiddleware(...middlewares, routerMiddleware(history))
        );
  const store = createStore(reducer(history), enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
export default configureStore;
