import axios, { AxiosResponse } from 'axios';
import { PagedList } from '../types/UserType';
import { TAGS_ENDPONT, host } from './backendClient.config';

interface ITagsEndpoints {
  createTag(
    tagTypeId: string,
    identifier: string
  ): Promise<AxiosResponse<tagResponse[]> | undefined>;
  getTags(): Promise<AxiosResponse<PagedList<tagResponse>> | undefined>;
  getTagById(tagId: string): Promise<AxiosResponse<tagResponse> | undefined>;
  deleteTag(tagId: string): Promise<AxiosResponse<tagResponse> | undefined>;
}

export class TagsEndpoints implements ITagsEndpoints {
  async createTag(
    tagTypeId: string,
    identifier: string
  ): Promise<AxiosResponse<tagResponse[], any> | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${host}${TAGS_ENDPONT}/register`, {
        tagTypeId,
        identifier,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getTags(): Promise<
    AxiosResponse<PagedList<tagResponse>, any> | undefined
  > {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${host}${TAGS_ENDPONT}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getTagById(
    tagId: string
  ): Promise<AxiosResponse<tagResponse, any> | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${host}${TAGS_ENDPONT}/${tagId}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTag(
    tagId: string
  ): Promise<AxiosResponse<tagResponse, any> | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.delete(`${host}${TAGS_ENDPONT}/${tagId}`);
      return response;
    } catch (error) {}
  }
}

export type tagResponse = {
  _id: string;
  identifier: string;
  tagTypeId: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
};
