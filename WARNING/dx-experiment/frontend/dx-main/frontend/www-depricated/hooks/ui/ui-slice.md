import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  value: 'light' | 'dark' | 'green';
}

const initialState: UiState = {
  value: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<UiState['value']>) => {
      state.value = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
