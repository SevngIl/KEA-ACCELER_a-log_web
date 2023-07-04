import { useNavigate } from "react-router-dom";

export const Page1 = () => {
    const navigate = useNavigate();

    return (
        <div>
            page1<button onClick={() => navigate("/page2")}>page2</button>
        </div>
    );
};
