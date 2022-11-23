import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './layout';
import { Albums, PostsPage, Todos } from './pages';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/todos" element={<Todos />} />
      </Route>
    </Routes>
  );
};

export default App;
