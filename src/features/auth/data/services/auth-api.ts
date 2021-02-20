import User from "../../types/user";
import {GenericError} from "../../../../shared/generic-error";
import {EmailPass} from "../../types/email-pass";

export interface IAuthApi {
  getCurrentUser(): Promise<User>;

  signInWithEmailAndPassword(emailPass: EmailPass): Promise<User>;
}

export class FakeAuthApi implements IAuthApi {
  private static fakeUser: User = {
    accessToken: 'some_access_token',
    username: 'escanor',
    photoURL: 'https://avatars.githubusercontent.com/u/56047563?s=460&u=bec218f4b26de23ad44779a2d3cfd964fcb0732a&v=4'
  };
  private static validEmail = 'escanor@gmail.com';
  private static validPassword = 'password';

  async getCurrentUser(): Promise<User> {
    await this.waiter();
    return this.getUser();
  }

  async signInWithEmailAndPassword({email, password}: EmailPass): Promise<User> {
    await this.waiter();
    if (email == FakeAuthApi.validEmail && password == FakeAuthApi.validPassword)
      return this.getUser();
    throw new GenericError('invalid_email_or_password');
  }

  async getUser() {
    await this.waiter();
    return FakeAuthApi.fakeUser;
  }

  waiter() {
    return new Promise(resolve => {
      setTimeout(() => resolve(null), 1000);
    });
  }
}