import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { HttpService } from '../../api';

export type PhotoType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const photosEntityAdapter = createEntityAdapter<PhotoType>({
  sortComparer: (a, b) => b.id - a.id,
});

export const fetchPhotos = createAsyncThunk<PhotoType[], string, { rejectValue: string }>(
  'photos/fetchPhotos',
  async (id, thunkAPI) => {
    const { data } = await HttpService.get(`/albums/${id}/photos`);
    return data as PhotoType[];
  },
);

export const photosSlice = createSlice({
  name: 'photos',
  initialState: photosEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.fulfilled, (state, { payload }) => {
      photosEntityAdapter.setAll(state, payload);
    });
  },
});

export const {} = photosSlice.actions;

export const selectPhotos = (state: RootState) => state.photos;

export default photosSlice.reducer;
