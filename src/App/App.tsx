import { ROUTES } from 'config/constants';
import { CardPage, MainPage } from 'pages/index';
import { BrowserRouter, Route, Routes } from 'react-router';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.RECIPE} element={<CardPage />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
