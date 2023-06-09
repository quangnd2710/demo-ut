import { dogsApi } from "@/api";
import { DogType, ListResponse, MessageType } from "@/models";
import { PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { dogsActions } from "./dogSlice";

export function* fetchBreedsList() {
  try {
    const response: ListResponse<MessageType<DogType>> = yield call(
      dogsApi.getAllBreeds
    );
    yield put(
      dogsActions.getAllBreedSuccess(Object.keys(response.data.message))
    );
  } catch (error) {
    console.log("Failed to fetch breeds list", get(error, "message", ""));
    yield put(dogsActions.getAllBreedsError(get(error, "message", "")));
  }
}

export function* fetchDetailBreed({ payload: breedId }: PayloadAction<string>) {
  try {
    const response: ListResponse<string[]> = yield call(
      dogsApi.getDetailBreeds,
      breedId
    );
    yield put(dogsActions.getDetailBreedSuccess(response.data.message));
  } catch (error) {
    console.log("Failed to fetch detail breed", get(error, "message", ""));
    yield put(dogsActions.getDetailBreedError(get(error, "message", "")));
  }
}

export default function* dogsSaga() {
  yield all([
    takeEvery(dogsActions.getAllBreeds.type, fetchBreedsList),
    takeEvery(dogsActions.getDetailBreed.type, fetchDetailBreed),
  ]);
}
