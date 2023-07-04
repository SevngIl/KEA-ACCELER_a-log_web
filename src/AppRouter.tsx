import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page1 } from "./pages/Page1";
import { Page2 } from "./pages/Page2";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Page1 />} />
                <Route path="/page2" element={<Page2 />} />
            </Routes>
        </BrowserRouter>
    );
};
export default AppRouter;
