import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CreateReleaseNote.css";
import { RNBadge } from "../../components/RNBadge";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import { RNColumn } from "../../components/RNColumn";
import { RNTag, ReleaseNoteColumnData } from "../../interfaces/releaseNote.interface";
import { useState } from "react";

const mock: ReleaseNoteColumnData[] = [
    { key: 0, tag: "new", show: true },
    { key: 1, tag: "featured", show: false },
    { key: 2, tag: "changed", show: true },
    { key: 3, tag: "fixed", show: false },
    { key: 4, tag: "deprecated", show: false },
    { key: 5, tag: "bug", show: false },
];

export const CreateReleaseNote = () => {
    const navigation = useNavigate();
    const [data, setData] = useState(mock);

    const toggleTag = (tag: RNTag) => {
        const filteredData = data.map((it) => (it.tag === tag ? { ...it, show: !it.show } : it));
        console.log(filteredData);
        setData(filteredData);
    };
    return (
        <div className="CreateReleaseNote">
            <div className="mainContainer">
                <div className="topWrapper">
                    <h1>Create New Release Note</h1>
                    <div className="btnWrapper">
                        <Button className="backBtn" variant="outline-primary" onClick={() => navigation(-1)}>
                            Back
                        </Button>
                        <Button className="saveBtn" variant="outline-primary" onClick={() => navigation("")}>
                            Save
                        </Button>
                    </div>
                </div>
                <FloatingWrapper className="newRelaseNote" width="90%" borderRadius="25px">
                    <div className="detailsWrapper">
                        <div className="rnTag">AL-123</div>
                        <h6>
                            Version : V<input className="versionInput" />.<input className="versionInput" />.<input className="versionInput" />.
                        </h6>
                        <h6>
                            Update Date : <input className="updateDateInput" />
                        </h6>
                    </div>
                    {data.map((it) => (it.show ? <RNColumn tag={it.tag} key={it.key} /> : null))}
                    {/* show 값이 true인 column만 렌더링 한다 */}
                </FloatingWrapper>
            </div>
            <FloatingWrapper className="rightNavigation" width="220px" height="fit-content">
                <h4>Add New Category</h4>
                <div className="tagButton" onClick={() => toggleTag("new")}>
                    <RNBadge tag={"new"} />
                </div>
                <div className="tagButton" onClick={() => toggleTag("featured")}>
                    <RNBadge tag={"featured"} />
                </div>
                <div className="tagButton" onClick={() => toggleTag("changed")}>
                    <RNBadge tag={"changed"} />
                </div>
                <div className="tagButton" onClick={() => toggleTag("fixed")}>
                    <RNBadge tag={"fixed"} />
                </div>
                <div className="tagButton" onClick={() => toggleTag("deprecated")}>
                    <RNBadge tag={"deprecated"} />
                </div>
                <div className="tagButton" onClick={() => toggleTag("bug")}>
                    <RNBadge tag={"bug"} />
                </div>
            </FloatingWrapper>
        </div>
    );
};
