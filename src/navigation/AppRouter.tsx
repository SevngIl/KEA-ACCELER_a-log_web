import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopNavBar } from "./TopNavBar";
import { LeftNavSection } from "./LeftNavSection";
import Board from "../pages/Board/Board";
import Home from "../pages/Home/Home";
import { Timeline } from "../pages/Timeline/Timeline";
import { ReleaseNote } from "../pages/ReleaseNote/ReleaseNote";
import { CreateReleaseNote } from "../pages/ReleaseNote/CreateReleaseNote";
import Login from "../pages/Login/Login";
import RegisterForm from "../pages/Register/Registerform";
import MyProjects from "../pages/MyProjects/MyProjects";
import LeftTeamSection from "./LeftTeamSection";
import CreateProject from "../pages/CreateProject/CreateProject";
import MyIssues from "../pages/MyIssues/MyIssues";
import TeamInfo from "../pages/TeamInfo/TeamInfo";
import TeamSetting from "../pages/TeamSetting/TeamSetting";
import { ProjectAccess } from "../pages/ProjectSetting/ProjectAccess";
import { ProjectSetting } from "../pages/ProjectSetting/ProjectSetting";
import { Profile } from "../pages/Profile/Profile";
import { GithubLogin } from "../pages/Login/GithubLogin";

const AppRouter = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TopNavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ghLogin" element={<GithubLogin />} />
          <Route path="/registerform" element={<RegisterForm />} />
          <Route path="/teamInfo" element={<TeamInfo />} />
          <Route path="/teamSetting" element={<TeamSetting />} />
          <Route path="/projectSetting/:projectPk" element={<ProjectSetting />} />
          <Route path="/projectAccess/:projectPk" element={<ProjectAccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<LeftTeamSection />}>
            <Route path="/myProjects" element={<MyProjects />} />
            <Route path="/myIssues" element={<MyIssues />} />
            <Route path="/CreateProject" element={<CreateProject />} />
          </Route>
          <Route element={<LeftNavSection />}>
            <Route path="/Board/:projectPk" element={<Board />} />
            <Route path="/Timeline/:projectPk" element={<Timeline />} />
            <Route path="/ReleaseNote/:projectPk" element={<ReleaseNote />} />
            <Route path="/CreateReleaseNote/:projectPk" element={<CreateReleaseNote />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
