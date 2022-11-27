import { RootState } from '../..';

export const selectPhotos = (state: RootState) => state.photos;

export const selectPhotosIds = (state: RootState) => state.photos.ids;

export const selectPhotosEntities = (state: RootState) => state.photos.entities;

export const selectPhotosStatus = (state: RootState) => state.photos.status;

export const selectPhotosById = (state: RootState, id: string) =>
  Object.values(state.photos.entities).filter((entity) => entity!.albumId === parseInt(id));
