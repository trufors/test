import { RootState } from '../..';

export const selectAlbums = (state: RootState) => state.albums;
export const selectAlbumsIds = (state: RootState) => state.albums.ids;
export const selectAlbumEntities = (state: RootState) => state.albums.entities;
export const selectAlbumById = (state: RootState, id: number) =>
  Object.values(state.albums.entities).find((entity) => entity!.id === id);
