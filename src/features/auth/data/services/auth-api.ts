import User from "../../types/user";
import {GenericError} from "../../../../shared/generic-error";

export interface IAuthApi {
  getCurrentUser(): Promise<User>;

  signInWithEmailAndPassword(email: string, password: string): Promise<User>;
}

export class FakeAuthApi implements IAuthApi {
  private static fakeUser: User = {
    accessToken: 'some_access_token',
    username: 'escanor',
    photoURL: 'https://avatars.githubusercontent.com/u/56047563?s=460&u=bec218f4b26de23ad44779a2d3cfd964fcb0732a&v=4'
  };
  private static validEmail = 'escanor@gmail.com';
  private static validPassword = 'password';

  getCurrentUser(): Promise<User> {
    return this.getUser();
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<User> {
    if (email == FakeAuthApi.validEmail && password == FakeAuthApi.validPassword)
      return this.getUser();
    throw new GenericError('invalid_email_or_password');
  }

  async getUser() {
    return new Promise<User>(resolve => {
      setTimeout(() => resolve(FakeAuthApi.fakeUser), 1000);
    });
  }
}