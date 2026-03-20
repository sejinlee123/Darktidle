import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./components/layout/layout.tsx";
import Home from "./pages/Home.tsx";
import Game from "./pages/Game.tsx";
import Library from "./pages/Library.tsx";
import About from "./pages/About.tsx";
import Leaderboard from "./pages/Leaderboard.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="play" element={<Game />} />
          <Route path="library" element={<Library />} />
          <Route path="/about" element={<About />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
