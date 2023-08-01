import { Button, Fade } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CreateReleaseNote.css";
import { RNBadge } from "../../components/RNBadge";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import { RNColumn } from "../../components/RNColumn";
import { RNTag, ReleaseNoteColumnData, ReleaseNoteData } from "../../interfaces/releaseNote.interface";
import { useRef, useState } from "react";
import FadeIn from "../../animation/FadeIn";

const mockRNData: ReleaseNoteData = {
    version: "0.0.0",
    date: "2999.01.01",
    content: [
        { key: 0, content: [{ key: 0, content: "" }], tag: "new", show: false },
        { key: 1, content: [{ key: 0, content: "" }], tag: "featured", show: false },
        { key: 2, content: [{ key: 0, content: "" }], tag: "changed", show: false },
        { key: 3, content: [{ key: 0, content: "" }], tag: "fixed", show: false },
        { key: 4, content: [{ key: 0, content: "" }], tag: "deprecated", show: false },
        { key: 5, content: [{ key: 0, content: "" }], tag: "bug", show: false },
    ],
};
const Mock: ReleaseNoteData[] = [
    {
        version: "V1.0.10",
        date: "2023.06.04",
        content: [
            {
                key: 0,
                tag: "new",
                content: [
                    { key: 0, content: "Added homepage to allow user to show they are logged in" },
                    { key: 1, content: "Added a sort button allowing the user to filter the value array according to their needs." },
                ],
                show: true,
            },
            { key: 1, tag: "featured", show: true, content: [{ key: 0, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo." }] },
            { key: 2, tag: "changed", show: true, content: [{ key: 0, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo." }] },
            { key: 3, tag: "fixed", show: true, content: [{ key: 0, content: "Adaptation of the languages ​​and texts of the commentary part to better reflect reality" }] },
        ],
    },
    {
        version: "V1.0.9",
        date: "2023.06.04",
        content: [
            { key: 0, show: true, tag: "new", content: [{ key: 0, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo." }] },
            {
                key: 1,
                show: true,
                tag: "featured",
                content: [
                    { key: 0, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo." },
                    { key: 1, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo." },
                ],
            },
            { key: 2, show: true, tag: "changed", content: [{ key: 0, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo." }] },
            { key: 3, show: true, tag: "fixed", content: [{ key: 0, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo." }] },
        ],
    },
    {
        version: "V1.0.8",
        date: "2023.06.04",
        content: [
            { key: 0, show: true, tag: "new", content: [{ key: 0, content: "content" }] },
            {
                key: 1,
                show: true,
                tag: "featured",
                content: [
                    { key: 0, content: "content1" },
                    { key: 0, content: "content2" },
                ],
            },
            { key: 2, show: true, tag: "changed", content: [{ key: 0, content: "content" }] },
            { key: 3, show: true, tag: "fixed", content: [{ key: 0, content: "content" }] },
        ],
    },
    {
        version: "V1.0.7",
        date: "2023.06.04",
        content: [
            { key: 0, show: true, tag: "new", content: [{ key: 0, content: "content" }] },
            {
                key: 1,
                show: true,
                tag: "featured",
                content: [
                    { key: 0, content: "content1" },
                    { key: 0, content: "content2" },
                ],
            },
            { key: 2, show: true, tag: "changed", content: [{ key: 0, content: "content" }] },
            { key: 3, show: true, tag: "fixed", content: [{ key: 0, content: "content" }] },
        ],
    },
];

export const CreateReleaseNote = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(mockRNData);
    const [version, setVersion] = useState("");
    const [updateDate, setUpdateDate] = useState("");

    const [categoryData, setCategoryData] = useState(mockRNData.content);

    const toggleTag = (tag: RNTag) => {
        let filteredData = data;
        const filteredContentData = data.content.map((it) => (it.tag === tag ? { ...it, show: !it.show } : it));
        console.log(filteredContentData);
        setCategoryData(filteredContentData);
        filteredData.content = filteredContentData;
        setData(filteredData);
    };

    const onSaveRelaseNote = () => {
        const newRNData = data;
        data.version = version;
        data.date = updateDate;
        const RNData = [...Mock];
        RNData.unshift(newRNData);
        localStorage.setItem("RNData", JSON.stringify(RNData));
        console.log(RNData);
        navigate("/releasenote");
    };
    return (
        <div className="CreateReleaseNote">
            <FadeIn width={"100%"}>
                <div className="mainContainer">
                    <div className="topWrapper">
                        <h1>Create New Release Note</h1>
                        <div className="btnWrapper">
                            <Button className="backBtn" variant="outline-primary" onClick={() => navigate(-1)}>
                                Back
                            </Button>
                            <Button className="saveBtn" variant="outline-primary" onClick={() => onSaveRelaseNote()}>
                                Save
                            </Button>
                        </div>
                    </div>
                    <FloatingWrapper className="newRelaseNote" width="90%" borderRadius="25px">
                        <div className="detailsWrapper">
                            <div className="rnTag">AL-123</div>
                            <h6>
                                Version : <input className="versionInput" value={version} onChange={(e) => setVersion(e.target.value)} placeholder={"V0.0.0"} />
                            </h6>
                            <h6>
                                Update Date :{" "}
                                <input
                                    className="updateDateInput"
                                    value={updateDate}
                                    onChange={(e) => {
                                        setUpdateDate(e.target.value);
                                    }}
                                    placeholder={data.date}
                                />
                            </h6>
                        </div>
                        {categoryData.map((it) => (it.show ? <RNColumn columnId={it.key} tag={it.tag} key={it.key} content={it.content} data={data} setData={setData} /> : null))}
                        {/* show 값이 true인 column만 렌더링 한다 */}
                    </FloatingWrapper>
                </div>
            </FadeIn>
            <FloatingWrapper className="rightNavigation" width="220px" height="fit-content">
                <FadeIn className="rightNavigationWrapper" childClassName="childClassName">
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
                </FadeIn>
            </FloatingWrapper>
        </div>
    );
};
