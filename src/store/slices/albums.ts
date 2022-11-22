import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface AlbumsState {
  data: any;
  activeAlbum: number;
  currentAlbum: any;
}

const initialState: AlbumsState = {
  data: [],
  activeAlbum: 0,
  currentAlbum: [],
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbumsState: (state, { payload }) => {
      state.data = payload;
    },
    setActiveAlbum: (state, { payload }) => {
      console.log(payload);
      state.activeAlbum = payload;
    },
    setCurrentAlbum: (state, { payload }) => {
      console.log(payload);
      state.currentAlbum = payload;
    },
  },
});

export const { setAlbumsState, setActiveAlbum, setCurrentAlbum } = albumsSlice.actions;

export const selectData = (state: RootState) => state.albums.data;

export default albumsSlice.reducer;
