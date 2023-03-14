import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllBreeds, getDetailBreed, selectBreed } from "./dogSlice";
import placeholderImg from "@/assets/undraw_relaxing_walk.svg";

function DogsWithRedux() {
  const {
    breeds,
    detailBreed: dogImages,
    error: errorMessage,
    loading,
    selectedBreed,
  } = useAppSelector((state) => state.dogs);
  const dispatch = useAppDispatch();

  const searchByBreed = () => {
    dispatch(getDetailBreed(selectedBreed));
  };

  const setSelectedBreed = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectBreed(event.target.value));
  };

  useEffect(() => {
    dispatch(getAllBreeds());
  }, []);

  return (
    <div className="d-flex justify-content-center flex-column text-center">
      <header>
        <h1 className="mt-4 mb-5">Doggy Directory 🐶</h1>
      </header>
      <main role="main">
        <div className="d-flex justify-content-center">
          <select
            className="form-select w-25"
            aria-label="Select a breed of dog to display results"
            value={selectedBreed}
            onChange={setSelectedBreed}
            data-testid="select-type-dog"
          >
            <option value="" disabled>
              Select a breed
            </option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-info mx-2"
            disabled={!selectedBreed}
            onClick={searchByBreed}
            data-testid="search-dog"
          >
            Search
          </button>
          {errorMessage && <p data-testid="error-message">{errorMessage}</p>}
        </div>
        {dogImages.length > 0 && !loading && (
          <div className="px-5 mx-5 text-end" data-testid="results-count">
            <p className="fs-5">{dogImages.length} results</p>
          </div>
        )}
        <div className="mt-5 d-flex justify-content-center flex-wrap px-5 mx-5">
          {dogImages.length === 0 && !loading && (
            <img
              src={placeholderImg}
              className="mx-auto d-block mt-4 w-50"
              alt=""
            />
          )}
          {loading && (
            <div className="d-flex align-items-center ">
              <p className="h1 me-2">Loading</p>
              <div
                className="spinner-border ms-auto text-info fs-3"
                role="status"
                aria-hidden="true"
              ></div>
            </div>
          )}
          {dogImages.length > 0 &&
            !loading &&
            dogImages.map((imgSrc, index) => (
              <img
                key={`${index}-${selectedBreed}`}
                src={imgSrc}
                className="img-thumbnail w-25"
                alt={`${selectedBreed} ${index + 1} of ${dogImages.length}`}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export default DogsWithRedux;
