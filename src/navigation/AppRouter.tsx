import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopNavBar } from "./TopNavBar";
import Board from "../pages/Board/Board";
import Home from "../pages/Home/Home";
import { Timeline } from "../pages/Timeline/Timeline";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <TopNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Board" element={<Board />} />
        <Route path="/Timeline" element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
