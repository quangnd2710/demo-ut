// @ts-nocheck
import { dogsApi } from "@/api";
import { call, put } from "redux-saga/effects";
import { fetchBreedsList, fetchDetailBreed } from "./dogSaga";
import { dogsActions } from "./dogSlice";

describe("test fetchBreedsList", () => {
  it("case successfully", () => {
    const fetchAllObject = fetchBreedsList();
    expect(fetchAllObject.next().value).toEqual(call(dogsApi.getAllBreeds));
    expect(
      fetchAllObject.next({
        status: 200,
        data: {
          message: { alaska: [], husky: [], becgie: [] },
        },
      }).value
    ).toEqual(
      put(dogsActions.getAllBreedSuccess(["alaska", "husky", "becgie"]))
    );
    expect(fetchAllObject.next().done).toBeTruthy();
  });
});

describe("test fetchDetailBreed", () => {
  it("ase successfully", () => {
    const fetchDetailObject = fetchDetailBreed({ payload: "fakeBreedId" });
    expect(fetchDetailObject.next().value).toEqual(
      call(dogsApi.getDetailBreeds, "fakeBreedId")
    );
    expect(
      fetchDetailObject.next({
        status: 200,
        data: {
          message: [
            "https://link-mock-dog-1.com",
            "https://link-mock-dog-2.com",
          ],
        },
      }).value
    ).toEqual(
      put(
        dogsActions.getDetailBreedSuccess([
          "https://link-mock-dog-1.com",
          "https://link-mock-dog-2.com",
        ])
      )
    );
    expect(fetchDetailObject.next().done).toBeTruthy();
  });
});
