import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchAlbums, fetchDeleteAlbum, fetchUpdateAlbum } from './asyncThunkAlbums';

import { LoadingStatus } from '../../constants';
import { AlbumType } from '../../../types';

const albumsEntityAdapter = createEntityAdapter<AlbumType>({
  sortComparer: (a, b) => b.id - a.id,
});

export const albumsSlice = createSlice({
  name: 'albums',
  initialState: albumsEntityAdapter.getInitialState({
    status: '',
    activeAlbumId: 0,
  }),
  reducers: {
    setActiveAlbum: (state, { payload }: PayloadAction<number>) => {
      state.activeAlbumId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.SUCCESS;
        albumsEntityAdapter.addMany(state, payload);
      })
      .addCase(fetchAlbums.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatus.EARLYADDED ? LoadingStatus.EARLYADDED : LoadingStatus.ERROR;
      })
      .addCase(fetchDeleteAlbum.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.SUCCESS;
        albumsEntityAdapter.removeOne(state, payload);
      })
      .addCase(fetchDeleteAlbum.rejected, (state) => {
        state.status = LoadingStatus.ERROR;
      })
      .addCase(fetchUpdateAlbum.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.SUCCESS;
        albumsEntityAdapter.updateOne(state, { id: payload.id, changes: payload });
      })
      .addCase(fetchUpdateAlbum.rejected, (state) => {
        state.status = LoadingStatus.ERROR;
      });
  },
});

export const { setActiveAlbum } = albumsSlice.actions;

export default albumsSlice.reducer;
