import { FullScreen, useFullScreenHandle } from "react-full-screen";

import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Products from './pages/orders/Orders'
import Delivery from './pages/delivery/Delivery';
import Kanban from './pages/kanban/Kanban';
import Calendar from './pages/calendar/Calendar';
import Sheet from './pages/sheet/Sheet';
import Editor from './pages/editor/Editor'

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
                <Route index element={<Users handle={handle} />} />
              </Route>
              <Route path="orders">
                <Route index element={<Products handle={handle} />} />
              </Route>
              <Route path="delivery">
                <Route index element={<Delivery handle={handle} />} />
              </Route>
              <Route path="kanban">
                <Route index element={<Kanban handle={handle} />} />
              </Route>
              <Route path="calendar">
                <Route index element={<Calendar handle={handle} />} />
              </Route>
              <Route path="sheet">
                <Route index element={<Sheet handle={handle} />} />
              </Route>
              <Route path="editor">
                <Route index element={<Editor handle={handle} />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </FullScreen>
    </div>
  );
}

export default App;
