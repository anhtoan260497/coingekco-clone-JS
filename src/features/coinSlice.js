import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coinAPI from "api/CoinAPI";
import {numberWithCommas} from 'helper'

const initialState = {
  coins: [],
  exchanges: [],
  global : {},
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

export const getGlobal = createAsyncThunk("coin/getGlobal", async () => {
  try {
    const result = await coinAPI.getGlobal();
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
    builder.addCase(getGlobal.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(getGlobal.rejected, (state,action) => {
      state.isLoading = false
      console.log(action.error)
    });
    builder.addCase(getGlobal.fulfilled, (state,action) => {
      const {active_cryptocurrencies,markets,market_cap_change_percentage_24h_usd,market_cap_percentage} = action.payload.data
      state.global = {
          coins : {
            label : 'Coins',
            value : active_cryptocurrencies
          },
          exchanges : {
            label : 'Exchanges',
            value : markets
          },
          marketCap : {
            label : 'Market Cap',
            value : `${numberWithCommas(979342551254)}$ `,
            percent : market_cap_change_percentage_24h_usd.toFixed(1)
          },
          volume24h: {
            label : '24h Vol',
            value : `${numberWithCommas(31160956624)}$`
          },
          Dominance : {
            label : 'Dominance',
            value : `${(Object.keys(market_cap_percentage)[0].toUpperCase())} ${(market_cap_percentage[Object.keys(market_cap_percentage)[0]]).toFixed(1)}% ${(Object.keys(market_cap_percentage)[1].toUpperCase())} ${(market_cap_percentage[Object.keys(market_cap_percentage)[1]]).toFixed(1)}%`
          }


      }
    });
  },
});

const { reducer } = coinSlice;
export default reducer;
