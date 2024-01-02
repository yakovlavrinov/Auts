import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const authUser = createAsyncThunk(
  "post/authUser",
  async (paylod, { rejectWithValue }) => {
    try {
      const { user, params } = paylod;

      const res = await axios.post(`http://localhost:4444/${params}`, user);
      if (res.status !== 201 && params === "register") {
        throw new Error("Ошибка при создании");
      }
      if (res.status !== 200 && params === "login") {
        throw new Error("Ошибка при входе");
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  user: null,
  status: "Idle",
  error: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authUser.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
      state.token = null;
    });
    builder.addCase(authUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.status = "connect";
      state.error = null;
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    });
  },
});
export default authSlice.reducer;
