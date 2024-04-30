import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App';
import EventPage from './pages/EventPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' Component={App}>
      <Route index Component={HomePage} />
      <Route path='login' Component={LoginPage} />
      <Route path='events' Component={EventPage} />
      <Route path='*' element={<div>Page not found</div>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
