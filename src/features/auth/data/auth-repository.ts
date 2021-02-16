import {Either, left, right} from "fp-ts/Either";
import User from "../types/user";
import {IAuthApi} from "./services/auth-api";
import AuthError from "../types/auth-error";
import {ILocalStorage} from "./services/local-storage";
import {isGenericError} from "../../../shared/generic-error";
import {EmailPass} from "../types/email-pass";

export default interface IAuthRepository {
  getCurrentUser(): Promise<Either<AuthError, User | null>>;

  signInWithEmailAndPassword(emailPass: EmailPass): Promise<Either<AuthError, User>>;

  signOut(): Promise<Either<AuthError, null>>;
}

export class AuthRepository implements IAuthRepository {
  private static KEY_ACCESS_TOKEN = 'access_token';

  private _authApi: IAuthApi;
  private _localStorage: ILocalStorage;

  constructor(
    authApi: IAuthApi,
    localStorage: ILocalStorage,
  ) {
    this._authApi = authApi;
    this._localStorage = localStorage;
  }

  async getCurrentUser(): Promise<Either<AuthError, User | null>> {
    const accessToken = await this._localStorage.read(AuthRepository.KEY_ACCESS_TOKEN);
    if (accessToken) {
      const user = await this._authApi.getCurrentUser();
      return right(user);
    }
    return right(null);
  }

  async signInWithEmailAndPassword(emailPass: EmailPass): Promise<Either<AuthError, User>> {
    try {
      const user = await this._authApi.signInWithEmailAndPassword(emailPass);
      await this._localStorage.write(AuthRepository.KEY_ACCESS_TOKEN, user.accessToken);
      return right(user);
    } catch (e) {
      // TODO: check for error types and return the corresponding values
      if (isGenericError(e)) {
        if (e.code == 'invalid_email_or_password')
          return left(AuthError.invalidEmailOrPassword);
      }
      return left(AuthError.general);
    }
  }

  async signOut(): Promise<Either<AuthError, null>> {
    this._localStorage.deleteAll().then();
    return right(null);
  }
}

