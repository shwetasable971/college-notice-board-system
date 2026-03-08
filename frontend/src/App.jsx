import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoticeDetailPage from "./pages/NoticeDetailPage";
import { Toaster } from "react-hot-toast";

const App=() => {
  return (
    <div>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<CreatePage />} />
        <Route path="/notice/:id" element={<NoticeDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;