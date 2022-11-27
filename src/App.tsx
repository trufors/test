import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './layout';
import { AlbumsPage, PostFormPage, PostsPage, TodosPage } from './pages';
import { EditAlbumPage } from './pages/EditAlbumPage';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/create" element={<PostFormPage />} />
        <Route path="/posts/:postId/edit" element={<PostFormPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/:albumId/edit" element={<EditAlbumPage />} />
        <Route path="/todos" element={<TodosPage />} />
      </Route>
    </Routes>
  );
};

export default App;
