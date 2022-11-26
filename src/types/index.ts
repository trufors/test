export type AlbumType = {
  userId: string;
  id: number;
  title: string;
};

export type FetchParams = { id: string };

export type PhotoType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type CommentType = {
  postId: number;
  id: number;
  email: string;
  name: string;
  body: string;
};
