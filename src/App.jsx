import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Sidebar from "./components/sidebar.jsx";
import Detail from "./pages/detail/index.jsx";
import Feed from "./pages/feed/index.jsx";
import Search from "./pages/search/index.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0f0f0f] text-white">
        <Header />

        <div className="flex w-full">
          <Sidebar />

          <main className="flex-1 w-full overflow-y-auto overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/watch" element={<Detail />} />
              <Route path="/results" element={<Search />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;