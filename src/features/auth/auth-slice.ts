import User from "./types/user";
import AuthError from "./types/auth-error";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {EmailPass} from "./types/email-pass";
import {StoreExtraArg} from "../../app/dependencies";
import {isRight} from "fp-ts/Either";


export type AuthState = {
  currentUser: User | null,
  loading: boolean,
  error: AuthError | null,
};

type ThunkApi = {
  rejectValue: AuthError,
  extra: StoreExtraArg,
};

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: null,
};

const loginWithEmailAndPass = createAsyncThunk<User, EmailPass, ThunkApi>(
  'auth/loginWithEmailAndPass',
  async (emailPass, thunkAPI) => {
    // Make the api call
    const result = await thunkAPI.extra.authRepo.signInWithEmailAndPassword(emailPass);
    // If the login succeeds, return the User
    if (isRight(result)) {
      return result.right;
    }
    // If the login fails, reject with the AuthError
    return thunkAPI.rejectWithValue(result.left);
  },
)

const authSlice = createSlice({
  name: 'auth',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loginWithEmailAndPass.pending, state => {
        // Login started
        state.loading = true;
      })
      .addCase(loginWithEmailAndPass.fulfilled, (state, action) => {
        // Login succeeded
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(loginWithEmailAndPass.rejected, (state, action) => {
        // Login failed
        if (action.payload == undefined)
          state.error = AuthError.general;
        else
          state.error = action.payload;
        state.loading = false;
      });
  }
});

export const authActions = {loginWithEmailAndPass};
export default authSlice.reducer;