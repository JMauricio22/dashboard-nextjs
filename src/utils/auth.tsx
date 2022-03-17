import axios, { AxiosResponse, AxiosError } from 'axios';
import { User, AuthError, UserStateChangedCallback, AuthLoadingCallback } from '@customTypes/user/auth';
import endPoints from '../services/api';
import Cookies from 'js-cookie';

const USER_EMAIL = 'john@mail.com';
const USER_NAME = 'John';

class AuthConfigError extends Error {
  constructor() {
    super(`is necessary initialize configure onAuthStateChanged and onAuthLoading`);
  }
}

export default class Auth {
  user: User;
  error: AuthError;
  cb: UserStateChangedCallback;
  cbLoading: AuthLoadingCallback;

  onAuthStateChanged(cb: UserStateChangedCallback) {
    this.cb = cb;
    return this;
  }

  onAuthLoading(cb: AuthLoadingCallback) {
    this.cbLoading = cb;
    return this;
  }

  private onUserChange(user: User | null, error: AuthError = null) {
    this.cb && this.cb(user, error);
  }

  private async getProfile(): Promise<User> {
    const { data }: AxiosResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile');
    const user = data
      ? data
      : {
          email: USER_EMAIL,
          name: USER_NAME,
        };

    this.user = user;
    Cookies.set('user', JSON.stringify(user));

    return user;
  }

  async signIn(email, password) {
    if (!this.cbLoading || !this.cb) {
      throw new AuthConfigError();
    }

    this.cbLoading(true);

    const headers = {
      'Content-Type': 'application/json',
      accept: '*/*',
    };

    try {
      const { data: access_token }: AxiosResponse = await axios.post(
        endPoints.auth.login,
        {
          email,
          password,
        },
        { headers }
      );
      if (access_token) {
        const token = access_token.access_token;
        Cookies.set('token', token, {
          expires: 1,
        });
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;

        await this.getProfile();
      }

      this.onUserChange(this.user, this.error);
    } catch (error: any) {
      if (error.response && (error as AxiosError).response.status === 401) {
        this.error = { message: 'Invalid email or password' };
      } else {
        this.error = error.message;
      }
      this.onUserChange(this.user, this.error);
    }
  }

  signOut() {
    Cookies.remove('user');
    Cookies.remove('token');
    this.user = null;
    this.error = null;
    delete axios.defaults.headers['Authorization'];
    this.onUserChange(this.user, this.error);
  }

  async resolveUser() {
    if (!this.cbLoading || !this.cb) {
      throw new AuthConfigError();
    }
    const token = Cookies.get('token');
    this.cbLoading(true);

    try {
      if (token) {
        const user = await this.getProfile();
        this.onUserChange(this.user);
      } else {
        this.user = null;
      }
      this.onUserChange(this.user);
    } catch (error: any) {
      this.onUserChange(null, { message: error.message });
    }
  }
}
