import { BsDot } from "react-icons/bs";
import { FloatingWrapper } from "./FloatingWrapper";
import { RNBadge } from "./RNBadge";
import "./RNColumn.css";
import { RNColumnContentData, RNTag } from "../interfaces/releaseNote.interface";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { TextButton } from "./Buttons";

const RNColumnContent: RNColumnContentData[] = [{ key: 0, content: "" }];

export const RNColumn = ({ tag }: { tag: RNTag }) => {
    const [data, setData] = useState(RNColumnContent);

    const deleteItem = (id: number) => {
        setData(data.filter((it) => (it.key === id ? null : it)));
    };
    return (
        <FloatingWrapper className="RNColumn" borderRadius="20px">
            <div className="rnColumnTag">
                <RNBadge tag={tag} type="tag" />
            </div>
            {data.map((it) => (
                <div className="rnBoxItem" key={it.key}>
                    <TextButton className="deleteColumnBtn" onClick={() => deleteItem(it.key)}>
                        X
                    </TextButton>
                    <BsDot />
                    <input className="rnBoxItemContent" />
                    <div>
                        <TextButton className="connectIssueBtn">Connect Issue</TextButton>
                    </div>
                </div>
            ))}
            <Button
                className="addContentBtn"
                variant="outline-success"
                onClick={() => {
                    setData([...data, { key: data.length, content: "" }]);
                }}
            >
                Add Content
            </Button>
        </FloatingWrapper>
    );
};
