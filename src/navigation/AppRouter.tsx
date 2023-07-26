import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopNavBar } from "./TopNavBar";
import { LeftNavSection } from "./LeftNavSection";
import Board from "../pages/Board/Board";
import Home from "../pages/Home/Home";
import { Timeline } from "../pages/Timeline/Timeline";
import { ReleaseNote } from "../pages/ReleaseNote/ReleaseNote";
import { CreateReleaseNote } from "../pages/ReleaseNote/CreateReleaseNote";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import RegisterForm from "../pages/Register/Registerform";
import MyProjects from "../pages/MyProjects/MyProjects";
import LeftTeamSection from "./LeftTeamSection";
import CreateProject from "../pages/CreateProject/CreateProject";

const AppRouter = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TopNavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerform" element={<RegisterForm />} />
          <Route element={<LeftTeamSection />}>
            <Route path="/myProjects" element={<MyProjects />} />
            <Route path="/CreateProject" element={<CreateProject />} />
          </Route>
          <Route element={<LeftNavSection />}>
            <Route path="/Board" element={<Board />} />
            <Route path="/Timeline" element={<Timeline />} />
            <Route path="/ReleaseNote" element={<ReleaseNote />} />
            <Route path="/CreateReleaseNote" element={<CreateReleaseNote />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
