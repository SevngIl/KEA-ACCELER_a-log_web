import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ReleaseNote.css";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import { RNBadge } from "../../components/RNBadge";
import { ReleaseNoteData } from "../../interfaces/releaseNote.interface";
import { BsDot } from "react-icons/bs";
import { useEffect, useState } from "react";

const Mock: ReleaseNoteData[] = [
    {
        version: "V1.0.10",
        date: "2023.06.04",
        content: [
            { tag: "new", content: ["Added homepage to allow user to show they are logged in", "Added a sort button allowing the user to filter the value array according to their needs."] },
            { tag: "featured", content: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo."] },
            { tag: "changed", content: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo."] },
            { tag: "fixed", content: ["Adaptation of the languages ​​and texts of the commentary part to better reflect reality"] },
        ],
    },
    {
        version: "V1.0.9",
        date: "2023.06.04",
        content: [
            { tag: "new", content: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo."] },
            {
                tag: "featured",
                content: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo.",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo.",
                ],
            },
            { tag: "changed", content: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo."] },
            { tag: "fixed", content: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maecenas nec aenean a placerat vitae commodo."] },
        ],
    },
    {
        version: "V1.0.8",
        date: "2023.06.04",
        content: [
            { tag: "new", content: ["content"] },
            { tag: "featured", content: ["content1", "content2"] },
            { tag: "changed", content: ["content"] },
            { tag: "fixed", content: ["content"] },
        ],
    },
    {
        version: "V1.0.7",
        date: "2023.06.04",
        content: [
            { tag: "new", content: ["content"] },
            { tag: "featured", content: ["content1", "content2"] },
            { tag: "changed", content: ["content"] },
            { tag: "fixed", content: ["content"] },
        ],
    },
];
export const ReleaseNote = () => {
    const navigation = useNavigate();
    return (
        <div className="ReleaseNote">
            <div className="mainWrapper">
                <div className="topWrapper">
                    <h1>ReleaseNotes</h1>

                    <Button className="createNewBtn" variant="outline-primary" onClick={() => navigation("/CreateReleaseNote")}>
                        Create New
                    </Button>
                </div>
                <div className="releaseNoteList">
                    {Mock.map((it) => (
                        <FloatingWrapper className="releaseNote" width="90%" borderRadius="25px">
                            <div className="titleWrapper">
                                <h5 className="version">{it.version}</h5>
                                <div className="date">{it.date}</div>
                            </div>

                            {it.content.map((it) => (
                                <div className="releaseNoteContentItem">
                                    <RNBadge tag={it.tag} type="tag" />
                                    <div>
                                        {it.content.map((it) => (
                                            <div className="content">
                                                <BsDot width={18} />
                                                <div className="text">{it}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </FloatingWrapper>
                    ))}
                </div>
            </div>
            <FloatingWrapper className="rightNavigation" width="150px" height="fit-content">
                {Mock.map((it) => (
                    <a className="navContent">{it.version}</a>
                ))}
            </FloatingWrapper>
        </div>
    );
};
