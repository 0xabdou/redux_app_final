import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import User from "./types/user";
import AuthError from "./types/auth-error";
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

const loginWithEmailAndPass = createAsyncThunk<User, EmailPass, ThunkApi>(
  'auth/loginWithEmailAndPass',
  async (emailPass, thunkAPI) => {
    const result = await thunkAPI.extra.authRepo.signInWithEmailAndPassword(emailPass);
    if (isRight(result)) {
      return result.right;
    }
    return thunkAPI.rejectWithValue(result.left);
  }
);

const logout = createAsyncThunk<null, void, ThunkApi>(
  'auth/logout',
  async (_, thunkAPI) => {
    const result = await thunkAPI.extra.authRepo.signOut();
    if (isRight(result)) {
      return result.right;
    }
    return thunkAPI.rejectWithValue(result.left);
  }
);

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  reducers: {},
  initialState,
  extraReducers: builder => {
    // loginWithEmailAndPass
    builder
      .addCase(loginWithEmailAndPass.pending, state => {
        // Login started
        state.loading = true;
        state.error = null;
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
    // logout
    builder
      .addCase(logout.pending, state => {
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.currentUser = null;
      })
      .addCase(logout.rejected, (state, action) => {
        if (action.payload == undefined)
          state.error = AuthError.general;
        else
          state.error = action.payload;
        state.loading = false;
      });
  }
});

export const authActions = {loginWithEmailAndPass, logout};
export default authSlice.reducer;
