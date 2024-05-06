import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import CreateEvent from "./pages/CreateEvent";
} from 'react-router-dom';
import App from './App';
import EventPage from './pages/EventPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={App}>
      <Route index Component={HomePage} />
      <Route path="login" Component={LoginPage} />
      <Route path="events" Component={EventPage} />
      <Route path="create" Component={CreateEvent} />
      <Route path='register' Component={RegisterPage} />
      <Route path='*' element={<div>Page not found</div>} />
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider> */}
      <RouterProvider router={router} />
      {/* </AuthProvider> */}
    </QueryClientProvider>
  </React.StrictMode>
);
