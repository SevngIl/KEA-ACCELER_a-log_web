import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ReleaseNote = () => {
    const navigation = useNavigate();
    return (
        <div>
            ReleaseNote
            <Button onClick={() => navigation("/CreateReleaseNote")}>Create New</Button>
        </div>
    );
};
