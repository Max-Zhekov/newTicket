import { createSlice } from "@reduxjs/toolkit";

const initialState = { counterValue: 1, carriageNumber: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.counterValue += 1;
      console.log(state.counterValue);
    },
    decrement: (state) => {
      if (state.counterValue > 0) {
        state.counterValue -= 1;
        console.log(state.counterValue);
      }
    },
    setCarriageNumber: (state, action) => {
      state.carriageNumber = action.payload;
      console.log(state.carriageNumber);
    },
  },
});

export const { increment, decrement, setCarriageNumber } = counterSlice.actions;
export default counterSlice.reducer;
