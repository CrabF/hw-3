import { ROUTES } from 'config/constants';
import { CardPage, MainPage } from 'pages/index';
import { Route, Routes } from 'react-router';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';

const App = () => {
  useQueryParamsStoreInit();
  return (
    <Routes>
      <Route path={ROUTES.RECIPE} element={<CardPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};

export default App;
