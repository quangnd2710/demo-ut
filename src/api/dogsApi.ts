import axiosClient from "./axiosClient";
import { DogType, ListResponse, MessageType } from "@/models";


const dogsApi = {
  getAllBreeds(): Promise<ListResponse<MessageType<DogType>>> {
    const url = "/api/breeds/list/all";
    return axiosClient.get(url);
  },
  getDetailBreeds(breedId: string): Promise<ListResponse<MessageType<string[]>>> {
    const url = `/api/breed/${breedId}/images`;
    return axiosClient.get(url);
  }
};

export default dogsApi;
