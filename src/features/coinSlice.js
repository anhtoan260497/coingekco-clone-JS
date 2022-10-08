import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coinAPI from "api/CoinAPI";

const initialState = {
  coins: [],
  exchanges: [],
  isLoading: false,
};

export const getTrending = createAsyncThunk("coin/getTrending", async () => {
  try {
    const result = await coinAPI.getTrendingCoins();
    return result;
  } catch (err) {
    console.log(err);
  }
});

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTrending.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTrending.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
    });
    builder.addCase(getTrending.fulfilled, (state, action) => {
      state.isLoading = false;
      state.coins = action.payload.coins;
    });
  },
});

const { reducer } = coinSlice;
export default reducer;
