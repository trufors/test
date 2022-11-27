import { RootState } from '../..';

export const selectAlbums = (state: RootState) => state.albums;

export const selectAlbumsIds = (state: RootState) => state.albums.ids;

export const selectAlbumsEntities = (state: RootState) => state.albums.entities;

export const selectAlbumsStatus = (state: RootState) => state.albums.status;

export const selectAlbumById = (state: RootState, id: string) =>
  Object.values(state.albums.entities).find((entity) => entity!.id === parseInt(id));
