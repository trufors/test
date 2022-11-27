import { store } from '../';
import { PostType } from '../../types';
import { fetchCreatePost, fetchDeletePost, fetchUpdatePost } from '../slices/posts/asyncThunkPosts';

const checkPost = {
  userId: 1,
  id: 0,
  title: '',
  body: '',
};

describe('Redux post tests', () => {
  test('Create Post', async () => {
    const result = await store.dispatch(fetchCreatePost());
    const check = result.payload as PostType;

    expect(result.type).toBe('posts/fetchCreatePost/fulfilled');
    expect(check).toEqual({ ...checkPost });
  });

  test('fetch delete post', async () => {
    const result = await store.dispatch(fetchDeletePost({ id: '1' }));

    expect(result.type).toBe('posts/fetchDeletePost/fulfilled');
  });
});
