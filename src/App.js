import React, { useCallback } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const handle = useFullScreenHandle();
  return (
    <div className="App">
      <FullScreen handle={handle}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home handle={handle} />} />
              <Route path="login" element={<Login />} />
              <Route path="users">
                <Route index element={<List />} />
                <Route path=":userId" element={<Single />} />
                {/* <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              /> */}
              </Route>
              <Route path="products">
                <Route index element={<List />} />
                <Route path=":productId" element={<Single />} />
                {/* <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              /> */}
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </FullScreen>
    </div>
  );
}

export default App;
