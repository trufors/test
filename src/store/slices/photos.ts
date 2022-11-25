import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { HttpService } from '../../api';
import { LoadingStatuses } from '../../types';

export type PhotoType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
type FetchParams = Record<string, string>;

const photosEntityAdapter = createEntityAdapter<PhotoType>({
  sortComparer: (a, b) => b.id - a.id,
});

export const fetchPhotos = createAsyncThunk<PhotoType[], FetchParams>(
  'photos/fetchPhotos',
  async ({ id }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (selectPhotosById(state, parseInt(id)).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatuses.EARLYADDED);
    }
    const { data } = await HttpService.get<PhotoType[]>(`/albums/${id}/photos`);
    return data;
  },
);
export const fetchDeletePhotos = createAsyncThunk<number, number, { rejectValue: string }>(
  'photos/fetchDeletePhotos',
  async (id, thunkAPI) => {
    const { data } = await HttpService.delete(`/photos/${id}`);
    return id;
  },
);
export const fetchPutPhotos = createAsyncThunk<number, number, { rejectValue: string }>(
  'photos/fetchDeletePhotos',
  async (id, thunkAPI) => {
    const { data } = await HttpService.delete(`/photos/${id}`);
    return id;
  },
);

export const photosSlice = createSlice({
  name: 'photos',
  initialState: photosEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.fulfilled, (state, { payload }) => {
      photosEntityAdapter.addMany(state, payload);
    });
    builder.addCase(fetchDeletePhotos.fulfilled, (state, { payload }) => {
      photosEntityAdapter.removeOne(state, payload);
    });
  },
});

export const {} = photosSlice.actions;

export const selectPhotos = (state: RootState) => state.photos;

export const selectPhotosIds = (state: RootState) => state.photos.ids;
export const selectPhotosEntities = (state: RootState) => state.photos.entities;
export const selectPhotosById = (state: RootState, id: number) =>
  Object.values(state.photos.entities).filter((entity) => entity!.id === id);

export default photosSlice.reducer;
