import { Outlet, useNavigate } from "react-router-dom";
import "./LeftNavSection.css";
import { Button } from "react-bootstrap";
import logo from "../assets/logo/alog-logo.png";
import { FloatingWrapper } from "../components/FloatingWrapper";

export const LeftNavSection = () => {
    const navigate = useNavigate();
    return (
        <div className="LeftNavSection">
            <FloatingWrapper width={"200px"} height={"500px"} className="container">
                <div className="head_container">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="A-Log">A-Log</div>
                </div>

                <div className="planning_container">
                    <div className="planning">Planning</div>
                    <div className="Timeline">
                        <Button variant="outline-primary" onClick={() => navigate("/Timeline")}>
                            TimeLine
                        </Button>
                    </div>
                    <div className="Board">
                        <Button variant="outline-primary" onClick={() => navigate("/Board")}>
                            Board
                        </Button>
                    </div>
                </div>

                <div className="release_container">
                    <div className="release">Release</div>
                    <div className="Notes">
                        <Button variant="outline-primary" onClick={() => navigate("/ReleaseNote")}>
                            Notes
                        </Button>
                    </div>
                </div>
            </FloatingWrapper>
            <Outlet />
        </div>
    );
};
