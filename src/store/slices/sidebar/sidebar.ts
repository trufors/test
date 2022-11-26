import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../index';

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: true,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setIsOpen } = sidebarSlice.actions;

export const selectIsOpen = (state: RootState) => state.sidebar.isOpen;

export default sidebarSlice.reducer;
