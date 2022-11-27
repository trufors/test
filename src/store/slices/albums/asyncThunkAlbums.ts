import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { HttpService } from '../../../api';
import { AlbumType, IdParams } from '../../../types';
import { LoadingStatuses } from '../../constants';
import { selectAlbumsIds } from './selectors';

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
export const fetchDeleteAlbum = createAsyncThunk<number, IdParams>(
  'albums/fetchDeleteAlbum',
  async ({ id }, thunkAPI) => {
    await HttpService.delete(`/albums/${id}`);
    return parseInt(id);
  },
);

export const fetchUpdateAlbum = createAsyncThunk<AlbumType, AlbumType>(
  'albums/fetchUpdateAlbum',
  async (album, thunkAPI) => {
    const { data } = await HttpService.patch(`/albums/${album.id}`, { title: album.title });
    console.log(data);
    return album;
  },
);
