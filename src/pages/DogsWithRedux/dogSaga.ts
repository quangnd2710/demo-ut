import { dogsApi } from "@/api";
import { call, put, takeEvery, all } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import { dogsActions } from "./dogSlice";
import { DogType, ListResponse, MessageType } from "@/models";

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
