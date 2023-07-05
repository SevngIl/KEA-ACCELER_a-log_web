import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page1 } from "./pages/Page1";
import { Page2 } from "./pages/Page2";
import Home from "./pages/Home/Home";
import ProjectBoard from "./pages/Project/ProjectBoard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/projectBoard" element={<ProjectBoard />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
