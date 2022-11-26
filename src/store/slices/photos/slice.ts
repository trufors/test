import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { fetchDeletePhoto, fetchPhotos } from './asyncThunkPhotos';
import { PhotoType } from '../../../types';
import { LoadingStatuses } from '../../constants';

const photosEntityAdapter = createEntityAdapter<PhotoType>({
  sortComparer: (a, b) => b.id - a.id,
});

export const photosSlice = createSlice({
  name: 'photos',
  initialState: photosEntityAdapter.getInitialState({ status: '' }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        photosEntityAdapter.addMany(state, payload);
      })
      .addCase(fetchPhotos.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.EARLYADDED
            ? LoadingStatuses.EARLYADDED
            : LoadingStatuses.ERROR;
      })
      .addCase(fetchDeletePhoto.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        photosEntityAdapter.removeOne(state, payload);
      })
      .addCase(fetchDeletePhoto.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      });
  },
});

export const {} = photosSlice.actions;

export default photosSlice.reducer;
