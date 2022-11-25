import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { HttpService } from '../../../api';
import { LoadingStatuses } from '../../../types';
import { selectAlbumsIds } from './selectors';
import { AlbumType } from './slice';

export const fetchAlbums = createAsyncThunk<AlbumType[]>(
  'albums/fetchAlbum',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (selectAlbumsIds(state).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatuses.EARLYADDED);
    }

    const { data } = await HttpService.get<AlbumType[]>(`/users/1/albums`);
    return data;
  },
);
