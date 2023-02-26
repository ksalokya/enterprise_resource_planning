import React from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "./app.css"
import Signup from './pages/signup/Signup';
import Loader from './components/loader/Loader';

const Signin          = React.lazy(() => import('./pages/signin/Signin'));
const ResetPassword   = React.lazy(() => import('./pages/resetPassword/ResetPassword'));
const Home            = React.lazy(() => import("./pages/home/Home"));
const Users           = React.lazy(() => import("./pages/users/Users"));
const Products        = React.lazy(() => import('./pages/orders/Orders'));
const Delivery        = React.lazy(() => import('./pages/delivery/Delivery'));
const Kanban          = React.lazy(() => import('./pages/kanban/Kanban'));
const Calendar        = React.lazy(() => import('./pages/calendar/Calendar'));
const Sheet           = React.lazy(() => import('./pages/sheet/Sheet'));
const Editor          = React.lazy(() => import('./pages/editor/Editor'));
const Health          = React.lazy(() => import('./pages/health/Health'));
const Profile         = React.lazy(() => import('./pages/profile/Profile'));

function App() {
  const handle = useFullScreenHandle();
  return (
    <div className="App">
      <FullScreen handle={handle}>
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
              <Route path="home">
                <Route index element={
                  <React.Suspense fallback={<Loader />}>
                    <Home handle={handle} />
                  </React.Suspense>
                } />
              </Route>
              <Route path="users">
                <Route index element={
                  <React.Suspense fallback={<Loader />}>
                    <Users handle={handle} />
                  </React.Suspense>
                } />
              </Route>
              <Route path="orders">
                <Route index element={
                  <React.Suspense fallback={<Loader />}>
                    <Products handle={handle} />
                  </React.Suspense>
                } />
              </Route>
              <Route path="delivery">
                <Route index element={
                  <React.Suspense fallback={<Loader />}>
                    <Delivery handle={handle} />
                  </React.Suspense>
                } />
              </Route>
              <Route path="kanban">
                <Route index element={
                  <React.Suspense fallback={<Loader />}>
                    <Kanban handle={handle} />
                  </React.Suspense>
                } />
              </Route>
              <Route path="calendar">
                <Route index element={
                  <React.Suspense fallback={<Loader />}>
                    <Calendar handle={handle} />
                  </React.Suspense>
                } />
              </Route>
              <Route path="sheet">
                <Route index element={
                  <React.Suspense fallback={<Loader />}>
                    <Sheet handle={handle} />
                  </React.Suspense>
                } />
              </Route>
              <Route path="editor">
                <Route index element={
                  <React.Suspense fallback={<Loader />}>
                    <Editor handle={handle} />
                  </React.Suspense>
                } />
              </Route>
              <Route path="health">
                <Route index element={
                  <React.Suspense fallback={<Loader />}>
                    <Health handle={handle} />
                  </React.Suspense>
                } />
              </Route>
              <Route path="profile">
                <Route index element={
                  <React.Suspense fallback={<Loader />}>
                    <Profile handle={handle} />
                  </React.Suspense>
                } />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </FullScreen>
    </div>
  );
}

export default App;
