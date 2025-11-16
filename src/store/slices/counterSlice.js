import { createSlice } from "@reduxjs/toolkit";

const initialState = { counterValue: 1, carriageNumber: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.counterValue += 1;
    },
    decrement: (state) => {
      if (state.counterValue > 1) {
        state.counterValue -= 1;
      }
    },
    setCarriageNumber: (state, action) => {
      state.carriageNumber = action.payload;
      localStorage.setItem("carriageNumber", action.payload);
    },
  },
});

export const { increment, decrement, setCarriageNumber } = counterSlice.actions;
export default counterSlice.reducer;
