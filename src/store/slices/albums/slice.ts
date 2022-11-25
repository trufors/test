import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../index';
import { HttpService } from '../../../api';
import { LoadingStatuses } from '../../../types';
import { fetchAlbums } from './thunk';

export type AlbumType = {
  userId: string;
  id: number;
  title: string;
};

const albumsEntityAdapter = createEntityAdapter<AlbumType>({
  sortComparer: (a, b) => b.id - a.id,
});

export const albumsSlice = createSlice({
  name: 'albums',
  initialState: albumsEntityAdapter.getInitialState({ status: '' }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.status = LoadingStatuses.LOADING;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, { payload }) => {
      state.status = LoadingStatuses.SUCCESS;
      albumsEntityAdapter.addMany(state, payload);
    });
    builder.addCase(fetchAlbums.rejected, (state, { payload }) => {
      state.status =
        payload === LoadingStatuses.EARLYADDED ? LoadingStatuses.EARLYADDED : LoadingStatuses.ERROR;
    });
  },
});

export const {} = albumsSlice.actions;

export default albumsSlice.reducer;
