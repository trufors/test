import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './layout';
import { Albums, MainPage, PostFormPage, PostsPage, TodosPage } from './pages';
import { EditAlbumPage } from './pages/EditAlbumPage';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/create" element={<PostFormPage />} />
        <Route path="/posts/:postId/edit" element={<PostFormPage />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:albumId/edit" element={<EditAlbumPage />} />
        <Route path="/todos" element={<TodosPage />} />
      </Route>
    </Routes>
  );
};

export default App;
