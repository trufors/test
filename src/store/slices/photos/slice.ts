import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { fetchDeletePhoto, fetchPhotos } from './asyncThunkPhotos';
import { PhotoType } from '../../../types';
import { LoadingStatus } from '../../constants';

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
        state.status = LoadingStatus.LOADING;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.SUCCESS;
        photosEntityAdapter.addMany(state, payload);
      })
      .addCase(fetchPhotos.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatus.EARLYADDED ? LoadingStatus.EARLYADDED : LoadingStatus.ERROR;
      })
      .addCase(fetchDeletePhoto.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.SUCCESS;
        photosEntityAdapter.removeOne(state, payload);
      })
      .addCase(fetchDeletePhoto.rejected, (state) => {
        state.status = LoadingStatus.ERROR;
      });
  },
});

export const {} = photosSlice.actions;

export default photosSlice.reducer;
