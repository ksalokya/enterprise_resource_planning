import React, { useCallback } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Products from './pages/orders/Orders'

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
                <Route index element={<Users handle={handle}/>} />
              </Route>
              <Route path="orders">
                <Route index element={<Products handle={handle}/>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </FullScreen>
    </div>
  );
}

export default App;
