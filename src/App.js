import React, { useState, createContext, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "./app.css"
import { lightMode } from "./components/map/light.js";
import { darkMode } from "./components/map/dark.js";
import { c3DarkMode } from './components/chart/c3';
import Signup from './pages/signup/Signup';
import Loader from './components/loader/Loader';
import Layout from './layout/Layout';

const Signin = React.lazy(() => import('./pages/signin/Signin'));
const ResetPassword = React.lazy(() => import('./pages/resetPassword/ResetPassword'));
const Home = React.lazy(() => import("./pages/home/Home"));
const Users = React.lazy(() => import("./pages/users/Users"));
const Products = React.lazy(() => import('./pages/orders/Orders'));
const Delivery = React.lazy(() => import('./pages/delivery/Delivery'));
const Kanban = React.lazy(() => import('./pages/kanban/Kanban'));
const Calendar = React.lazy(() => import('./pages/calendar/Calendar'));
const Sheet = React.lazy(() => import('./pages/sheet/Sheet'));
const Editor = React.lazy(() => import('./pages/editor/Editor'));
const Prediction = React.lazy(() => import('./pages/prediction/Prediction'));
const Health = React.lazy(() => import('./pages/health/Health'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));

export const DarkMode = createContext();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('dark') === 'true' ? true : false);
  const handleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.background = '#121212';
      toggleTheme('true');
    }
    else {
      document.body.style.background = '#fff';
      toggleTheme('false')
    }
  }, [isDarkMode])

  const toggleTheme = (param) => {
    if (param === 'true') {
      document.getElementsByTagName('body')[0].style.display = 'none';
      let styleLink = document.getElementById('css-link');
      styleLink.href = 'https://cdn.syncfusion.com/ej2/21.1.35/highcontrast.css';
      const styleTag = document.getElementById('theme');
      styleTag.innerHTML = darkMode + c3DarkMode;
      setTimeout(function () { document.getElementsByTagName('body')[0].style.display = 'block'; }, 50);
      localStorage.setItem('dark', 'true');
    } else {
      document.getElementsByTagName('body')[0].style.display = 'none';
      let styleLink = document.getElementById('css-link');
      styleLink.href = 'https://cdn.syncfusion.com/ej2/21.1.35/material.css';
      const styleTag = document.getElementById('theme');
      styleTag.innerHTML = lightMode;
      setTimeout(function () { document.getElementsByTagName('body')[0].style.display = 'block'; }, 50);
      localStorage.setItem('dark', 'false');
    }
  }

  return (
    <DarkMode.Provider value={isDarkMode}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Navigate to="/signup" />} />
              <Route path="signup">
                <Route index element={<Signup />} />
              </Route>
              <Route path="signin">
                <Route index element={
                  <React.Suspense fallback={<Loader />}>
                    <Signin />
                  </React.Suspense>
                } />
              </Route>
              <Route path="reset">
                <Route index element={
                  <React.Suspense fallback={<Loader />}>
                    <ResetPassword />
                  </React.Suspense>
                } />
              </Route>
              <Route element={<Layout handleDarkMode={handleDarkMode} />}>
                <Route path="home">
                  <Route index element={
                    <React.Suspense fallback={<Loader />}>
                      <Home />
                    </React.Suspense>
                  } />
                </Route>
                <Route path="users">
                  <Route index element={
                    <React.Suspense fallback={<Loader />}>
                      <Users />
                    </React.Suspense>
                  } />
                </Route>
                <Route path="orders">
                  <Route index element={
                    <React.Suspense fallback={<Loader />}>
                      <Products />
                    </React.Suspense>
                  } />
                </Route>
                <Route path="delivery">
                  <Route index element={
                    <React.Suspense fallback={<Loader />}>
                      <Delivery />
                    </React.Suspense>
                  } />
                </Route>
                <Route path="kanban">
                  <Route index element={
                    <React.Suspense fallback={<Loader />}>
                      <Kanban />
                    </React.Suspense>
                  } />
                </Route>
                <Route path="calendar">
                  <Route index element={
                    <React.Suspense fallback={<Loader />}>
                      <Calendar />
                    </React.Suspense>
                  } />
                </Route>
                <Route path="sheet">
                  <Route index element={
                    <React.Suspense fallback={<Loader />}>
                      <Sheet />
                    </React.Suspense>
                  } />
                </Route>
                <Route path="editor">
                  <Route index element={
                    <React.Suspense fallback={<Loader />}>
                      <Editor />
                    </React.Suspense>
                  } />
                </Route>
                <Route path="prediction">
                  <Route index element={
                    <React.Suspense fallback={<Loader />}>
                      <Prediction />
                    </React.Suspense>
                  } />
                </Route>
                <Route path="health">
                  <Route index element={
                    <React.Suspense fallback={<Loader />}>
                      <Health />
                    </React.Suspense>
                  } />
                </Route>
                <Route path="profile">
                  <Route index element={
                    <React.Suspense fallback={<Loader />}>
                      <Profile />
                    </React.Suspense>
                  } />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div >
    </DarkMode.Provider>
  );
}

export default App;
