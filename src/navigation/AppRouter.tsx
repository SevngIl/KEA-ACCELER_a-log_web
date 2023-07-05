import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopNavBar } from "./TopNavBar";
import { LeftNavSection } from "./LeftNavSection";
import Board from "../pages/Board/Board";
import Home from "../pages/Home/Home";
import { Timeline } from "../pages/Timeline/Timeline";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<TopNavBar />}>
                    <Route path="/" element={<Home />} />
                    <Route element={<LeftNavSection />}>
                        <Route path="/Board" element={<Board />} />
                        <Route path="/Timeline" element={<Timeline />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default AppRouter;
