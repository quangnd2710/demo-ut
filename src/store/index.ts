import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer, { RootState } from "./rootReducers";
import rootSaga from "./rootSaga";
import { routerMiddleware } from "connected-react-router";
import { history } from "@/utils/history";

const sagaMiddleware = createSagaMiddleware();

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
    ...preloadedState,
  });
};

export const store = setupStore();

sagaMiddleware.run(rootSaga);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof setupStore>;
export type StoreState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
