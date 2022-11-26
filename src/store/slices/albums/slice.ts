import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchAlbums, fetchDeleteAlbum, fetchUpdateAlbum } from './asyncThunkAlbums';

import { LoadingStatuses } from '../../constants';
import { AlbumType } from '../../../types';

const albumsEntityAdapter = createEntityAdapter<AlbumType>({
  sortComparer: (a, b) => b.id - a.id,
});

export const albumsSlice = createSlice({
  name: 'albums',
  initialState: albumsEntityAdapter.getInitialState({
    status: '',
    inputValue: '',
    activeAlbumId: '',
  }),
  reducers: {
    setEditInput: (state, { payload }: PayloadAction<string>) => {
      state.inputValue = payload;
    },
    setActiveAlbum: (state, { payload }: PayloadAction<string>) => {
      state.activeAlbumId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        albumsEntityAdapter.addMany(state, payload);
      })
      .addCase(fetchAlbums.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.EARLYADDED
            ? LoadingStatuses.EARLYADDED
            : LoadingStatuses.ERROR;
      })
      .addCase(fetchDeleteAlbum.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        albumsEntityAdapter.removeOne(state, payload);
      })
      .addCase(fetchDeleteAlbum.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      })
      .addCase(fetchUpdateAlbum.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        albumsEntityAdapter.updateOne(state, { id: payload.id, changes: payload });
      })
      .addCase(fetchUpdateAlbum.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      });
  },
});

export const { setActiveAlbum, setEditInput } = albumsSlice.actions;

export default albumsSlice.reducer;
