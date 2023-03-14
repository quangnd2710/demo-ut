import dogSaga from "@/pages/DogsWithRedux/dogSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([dogSaga()]);
}
