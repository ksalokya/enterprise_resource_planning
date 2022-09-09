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
              <Route path="users">
                <Route index element={<List handle={handle}/>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </FullScreen>
    </div>
  );
}

export default App;
