import {FakeAuthApi, IAuthApi} from "../features/auth/data/services/auth-api";
import {ILocalStorage, LocalStorage} from "../features/auth/data/services/local-storage";
import IAuthRepository, {AuthRepository} from "../features/auth/data/auth-repository";
import createStore from "./store";

// Instantiate an auth repository with its dependencies
const authApi : IAuthApi = new FakeAuthApi();
const localStorage : ILocalStorage = new LocalStorage();
const authRepo : IAuthRepository = new AuthRepository(authApi, localStorage);

// the object that will be injected into the store as extra arg
const storeExtraArg = {
  authRepo,
}
// also export the type of the above object for convenience
export type StoreExtraArg = typeof storeExtraArg;

export const store = createStore(storeExtraArg);

