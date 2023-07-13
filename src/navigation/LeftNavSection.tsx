import { Outlet, useNavigate } from "react-router-dom";
import "./LeftNavSection.css";
import { Button } from "react-bootstrap";

export const LeftNavSection = () => {
    const navigate = useNavigate();
    return (
        <div className="LeftNavSection">
            <div className="container">
                <div>image</div>
                <div>A-Log</div>
                <div>Planning</div>
                <div>
                    <Button onClick={() => navigate("/Timeline")}>TimeLine</Button>
                </div>
                <div>
                    <Button onClick={() => navigate("/Board")}>Board</Button>
                </div>
                <div>Release</div>
                <div>
                    <Button onClick={() => navigate("/ReleaseNote")}>Notes</Button>
                </div>
            </div>
            <Outlet />
        </div>
    );
};
