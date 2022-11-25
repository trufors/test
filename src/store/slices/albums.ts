import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { HttpService } from '../../api';

export type AlbumType = {
  userId: string;
  id: number;
  title: string;
};

const albumsEntityAdapter = createEntityAdapter<AlbumType>({
  sortComparer: (a, b) => b.id - a.id,
});

export const fetchAlbums = createAsyncThunk('albums/fetchAlbum', async (_, thunkAPI) => {
  const { data } = await HttpService.get(`/users/1/albums`);
  return data as AlbumType[];
});

export const albumsSlice = createSlice({
  name: 'albums',
  initialState: albumsEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.fulfilled, (state, { payload }) => {
      albumsEntityAdapter.addMany(state, payload);
    });
  },
});

export const {} = albumsSlice.actions;

export const selectAlbums = (state: RootState) => state.albums;

export default albumsSlice.reducer;
