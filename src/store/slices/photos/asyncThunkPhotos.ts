import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { HttpService } from '../../../api';
import { IdParams, PhotoType } from '../../../types';
import { LoadingStatus } from '../../constants';
import { selectPhotosById } from './selectors';

export const fetchPhotos = createAsyncThunk<PhotoType[], IdParams>(
  'photos/fetchPhotos',
  async ({ id }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (selectPhotosById(state, id).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatus.EARLYADDED);
    }
    const { data } = await HttpService.get<PhotoType[]>(`/albums/${id}/photos`);
    return data;
  },
);

export const fetchDeletePhoto = createAsyncThunk<number, IdParams>(
  'photos/fetchDeletePhotos',
  async ({ id }, thunkAPI) => {
    await HttpService.delete(`/photos/${id}`);
    return parseInt(id);
  },
);
