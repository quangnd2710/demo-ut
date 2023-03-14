import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { api } from "@/api";
import Dogs from "./";

const mockListImages = [
  "https://link-mock-dog-1.com",
  "https://link-mock-dog-2.com",
];

describe("Dogs", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("Render correctly", async () => {
    render(<Dogs />);
    expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
    expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
  });

  it("Render images with list types dog in options", async () => {
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
    render(<Dogs />);
    expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
    expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
    await waitFor(() => {
      fireEvent.change(screen.getByTestId("select-type-dog"), {
        target: { value: "alaska" },
      });
      expect(screen.getByTestId("select-type-dog")).toHaveDisplayValue(
        "alaska"
      );
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button"));
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
    render(<Dogs />);
    expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
    expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
    await waitFor(() => {
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
        status: 503,
        data: {
          message: "failed",
        },
      });
    render(<Dogs />);
    expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
    expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
    await waitFor(() => {
      fireEvent.change(screen.getByTestId("select-type-dog"), {
        target: { value: "alaska" },
      });
      expect(screen.getByTestId("select-type-dog")).toHaveDisplayValue(
        "alaska"
      );
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getByTestId("error-message").textContent).toEqual(
        "HTTP error status: 503"
      );
    });
  });
});
