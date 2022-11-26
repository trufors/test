import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { HttpService } from '../../../api';
import { FetchParams, PhotoType } from '../../../types';
import { LoadingStatuses } from '../../constants';
import { selectPhotosById } from './selectors';

export const fetchPhotos = createAsyncThunk<PhotoType[], FetchParams>(
  'photos/fetchPhotos',
  async ({ id }, thunkAPI) => {
    console.log(id);
    const state = thunkAPI.getState() as RootState;
    if (selectPhotosById(state, id).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatuses.EARLYADDED);
    }
    const { data } = await HttpService.get<PhotoType[]>(`/albums/${id}/photos`);
    return data;
  },
);

export const fetchDeletePhoto = createAsyncThunk<number, FetchParams>(
  'photos/fetchDeletePhotos',
  async ({ id }, thunkAPI) => {
    await HttpService.delete(`/photos/${id}`);
    return parseInt(id);
  },
);
