import React from "react";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { renderWithProviders } from "@/utils/renderWithProviders";
import { api } from "@/api";
import { setupStore } from "@/store";
import {
  getAllBreedSuccess,
  getAllBreedsError,
  getDetailBreedSuccess,
  getDetailBreedError,
} from "@/pages/DogsWithRedux/dogSlice";
import DogsWithRedux from "./";

const mockListImages = [
  "https://link-mock-dog-1.com",
  "https://link-mock-dog-2.com",
];

describe("Dogs with Redux", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("Render correctly", async () => {
    renderWithProviders(<DogsWithRedux />);
    expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
    expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
  });

  it("Render with list types dog in options", async () => {
    vi.spyOn(api, "get")
      .mockResolvedValueOnce({
        status: 200,
        data: {
          message: { alaska: [], husky: [], becgie: [] },
        },
      })
      .mockResolvedValueOnce({
        status: 200,
        data: {
          message: mockListImages,
        },
      });
    const store = setupStore();
    renderWithProviders(<DogsWithRedux />, {
      store,
    });
    await waitFor(() => {
      store.dispatch(getAllBreedSuccess(["alaska", "husky", "becgie"]));
      fireEvent.change(screen.getByTestId("select-type-dog"), {
        target: { value: "alaska" },
      });
      expect(screen.getByTestId("select-type-dog")).toHaveDisplayValue(
        "alaska"
      );
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button"));
      store.dispatch(getDetailBreedSuccess([...mockListImages]));
    });

    const images = screen.getAllByRole("img");
    images.forEach((image, index) => {
      expect(image).toHaveAttribute("src", mockListImages[index]);
    });
  });

  it("Render message error when get list types dog in options failed", async () => {
    vi.spyOn(api, "get").mockResolvedValueOnce({
      status: 500,
      data: {
        message: "failed",
      },
    });
    const store = setupStore();
    renderWithProviders(<DogsWithRedux />, {
      store,
    });
    await waitFor(() => {
      store.dispatch(getAllBreedsError("HTTP error status: 500"));
      expect(screen.getByTestId("error-message").textContent).toEqual(
        "HTTP error status: 500"
      );
    });
  });

  it("Render message error when get list types dog in options successfully but failed in get detail list images", async () => {
    vi.spyOn(api, "get")
      .mockResolvedValueOnce({
        status: 200,
        data: {
          message: { alaska: [], husky: [], becgie: [] },
        },
      })
      .mockResolvedValueOnce({
        status: 500,
        data: {
          message: "failed",
        },
      });
    const store = setupStore();
    renderWithProviders(<DogsWithRedux />, {
      store,
    });
    await waitFor(() => {
      store.dispatch(getAllBreedSuccess(["alaska", "husky", "becgie"]));
      fireEvent.change(screen.getByTestId("select-type-dog"), {
        target: { value: "alaska" },
      });
      expect(screen.getByTestId("select-type-dog")).toHaveDisplayValue(
        "alaska"
      );
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button"));
      store.dispatch(getDetailBreedError("HTTP error status: 503"));
    });

    expect(screen.getByTestId("error-message").textContent).toEqual(
      "HTTP error status: 503"
    );
  });
});
