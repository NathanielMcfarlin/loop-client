import { Route, Routes } from "react-router-dom";
import { Home } from "/home/nathanielmcfarlin/workspace/loop-client/loop-client/src/pages/Home.jsx"
import { Login } from "/home/nathanielmcfarlin/workspace/loop-client/loop-client/src/components/auth/Login.jsx"
import { Register } from "/home/nathanielmcfarlin/workspace/loop-client/loop-client/src/components/auth/Register.jsx"
import { Authorized } from "/home/nathanielmcfarlin/workspace/loop-client/loop-client/src/views/Authorized.jsx"
import { Platform } from "/home/nathanielmcfarlin/workspace/loop-client/loop-client/src/pages/platforms.jsx";
import { Game } from "../pages/games";
import { NewGame } from "../components/forms/new-game";
import { EditGame } from "../components/forms/edit-game";
import { NewPlatformPost } from "../components/forms/new-platform-post";
import { EditPlatformPost } from "../components/forms/edit-platform-post";


export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="/" element={<Home setToken={setToken} />} />
          <Route path="/platforms/:platformId" element={<Platform setToken={token} />} />
          <Route path="/games/:gameId" element={<Game setToken={token} />} />
          <Route path="/new-game" element={<NewGame setToken={token} />} />
          <Route path="/edit-game/:gameId" element={<EditGame setToken={token} />} />
          <Route path="/new-post" element={<NewPlatformPost setToken={token} />} />
          <Route path="/:postId/edit-platform-post" element={<EditPlatformPost setToken={token} />} />
        </Route>
      </Routes>
    </>
  );
};
