import axios, { AxiosResponse } from 'axios';
import { User } from '../types/UserType';
import { AUTH_ENDPOINT, USER_ENDPOINT, host } from './backendClient.config';

interface IUsersEndpoints {
  login(
    credentials: loginInput
  ): Promise<AxiosResponse<loginResponse> | undefined>;
  lookup(): Promise<loginResponse | undefined>;
  logout(): Promise<any>;
  getAccountInfo(id: string): Promise<User | undefined>;
}

export class UsersEndpoints implements IUsersEndpoints {
  async login(
    credentials: loginInput
  ): Promise<AxiosResponse<loginResponse> | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const authResponse = await axios.post(`${host}${AUTH_ENDPOINT}/login`, {
        email: credentials.email,
        password: credentials.password,
      });
      return authResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async logout(): Promise<any> {
    try {
      axios.defaults.withCredentials = true;
      const authResponse = await axios.post(`${host}${AUTH_ENDPOINT}/logout`);
      return authResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async lookup(): Promise<loginResponse | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${host}${AUTH_ENDPOINT}/lookup`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAccountInfo(id: string): Promise<User | undefined> {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${host}${USER_ENDPOINT}/info/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export type loginInput = {
  email: string;
  password: string;
};

type loginResponse = {
  id: any;
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  phoneNumber: string;
  photoUrl: string | undefined;
};
