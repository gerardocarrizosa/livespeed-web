import axios, { AxiosResponse } from 'axios';
import { PagedList } from '../types/UserType';
import { TRACKS_ENDPONT, host } from './backendClient.config';

// interface ITagsEndpoints {
//   createTag(
//     tagTypeId: string,
//     identifier: string
//   ): Promise<AxiosResponse<tagResponse[]> | undefined>;
//   getTags(): Promise<AxiosResponse<PagedList<tagResponse>> | undefined>;
//   getTagById(tagId: string): Promise<AxiosResponse<tagResponse> | undefined>;
//   deleteTag(tagId: string): Promise<AxiosResponse<tagResponse> | undefined>;
// }

export class TracksEndpoints {
  async createTrack(name: string, difficulty: string, parkId: string) {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${host}${TRACKS_ENDPONT}`, {
        name,
        difficulty,
        parkId,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getTracksByPark(
    page: number,
    pageSize: number,
    parkId: string
  ): Promise<AxiosResponse<PagedList<TrackResponse>, any> | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        `${host}${TRACKS_ENDPONT}/by-park/${parkId}`,
        {
          params: {
            page,
            pageSize,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getTrackById(
    trackId: string
  ): Promise<AxiosResponse<any, any> | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${host}${TRACKS_ENDPONT}/${trackId}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTrack(
    parkId: string,
    name: string,
    difficulty: string
  ): Promise<AxiosResponse<any, any> | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.put(`${host}${TRACKS_ENDPONT}/${parkId}`, {
        name,
        difficulty,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTrack(
    trackId: string
  ): Promise<AxiosResponse<any, any> | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.delete(
        `${host}${TRACKS_ENDPONT}/${trackId}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export interface TrackResponse {
  _id: string;
  name: string;
  difficulty: string;
  // parkId: string;
  parkId: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}
