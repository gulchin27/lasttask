import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: "light",
  searchTerm:'',
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setTheme, setSearchTerm } = uiSlice.actions;
export default uiSlice.reducer;
