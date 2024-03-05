import axios, { AxiosResponse } from 'axios';
import { PagedList } from '../types/UserType';
import { PARKS_ENDPONT, host } from './backendClient.config';

// interface ITagsEndpoints {
//   createTag(
//     tagTypeId: string,
//     identifier: string
//   ): Promise<AxiosResponse<tagResponse[]> | undefined>;
//   getTags(): Promise<AxiosResponse<PagedList<tagResponse>> | undefined>;
//   getTagById(tagId: string): Promise<AxiosResponse<tagResponse> | undefined>;
//   deleteTag(tagId: string): Promise<AxiosResponse<tagResponse> | undefined>;
// }

export class ParksEndpoints {
  async createPark(name: string) {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${host}${PARKS_ENDPONT}`, {
        name,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getParks(
    page: number,
    pageSize: number
  ): Promise<AxiosResponse<PagedList<ParksResponse>, any> | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${host}${PARKS_ENDPONT}`, {
        params: {
          page,
          pageSize,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getParkById(
    parkId: string
  ): Promise<AxiosResponse<any, any> | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${host}${PARKS_ENDPONT}/${parkId}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePark(
    parkId: string,
    name: string
  ): Promise<AxiosResponse<any, any> | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.put(`${host}${PARKS_ENDPONT}/${parkId}`, {
        name,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deletePark(
    parkId: string
  ): Promise<AxiosResponse<any, any> | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.delete(`${host}${PARKS_ENDPONT}/${parkId}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export interface ParksResponse {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
