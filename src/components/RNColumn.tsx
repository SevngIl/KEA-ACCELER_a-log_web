import { BsDot } from "react-icons/bs";
import { FloatingWrapper } from "./FloatingWrapper";
import { RNBadge } from "./RNBadge";
import "./RNColumn.css";
import { RNColumnContentData, RNTag, ReleaseNoteColumnData, ReleaseNoteData } from "../interfaces/releaseNote.interface";
import { Button } from "react-bootstrap";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { TextButton } from "./Buttons";
import FadeIn from "../animation/FadeIn";

const RNColumnContent: RNColumnContentData[] = [{ key: 0, content: "" }];

export const RNColumn = ({
    columnId,
    tag,
    content,
    data,
    setData,
}: {
    columnId: number;
    tag: RNTag;
    content: RNColumnContentData[];
    data: ReleaseNoteData;
    setData: Dispatch<SetStateAction<ReleaseNoteData>>;
}) => {
    const contentId = useRef(1);

    const deleteItem = (id: number) => {
        setData((prevData) => {
            const newContent = prevData.content.map((column) => {
                if (column.key === columnId) {
                    const newColumnContentData = column.content.filter((item) => item.key !== id);
                    return { ...column, content: newColumnContentData };
                }
                return column;
            });
            return { ...prevData, content: newContent };
        });
    };
    const addItem = () => {
        setData((prevData) => {
            const newColumnContentData: RNColumnContentData = { key: contentId.current, content: "" };
            const columnContentData: RNColumnContentData[] = [...prevData.content[columnId].content, newColumnContentData];
            const newColumnData: ReleaseNoteColumnData = prevData.content[columnId];
            newColumnData.content = columnContentData;

            const newContentData = prevData.content.map((column) => {
                if (column.key === columnId) {
                    return newColumnData;
                }
                return column;
            });

            const newData: ReleaseNoteData = { ...prevData, content: newContentData };
            contentId.current += 1;
            return newData;
        });
    };

    const handleInputChange = (itemId: number, inputValue: string) => {
        setData((prevData) => {
            const newContentData = prevData.content.map((column) => {
                if (column.key === columnId) {
                    const newColumnContentData = column.content.map((item) => {
                        if (item.key === itemId) {
                            return { ...item, content: inputValue };
                        }
                        return item;
                    });
                    return { ...column, content: newColumnContentData };
                }
                return column;
            });

            return { ...prevData, content: newContentData };
        });
    };
    return (
        <FloatingWrapper className="RNColumn" borderRadius="20px">
            <FadeIn childClassName="childClassName" width="100%">
                <div className="rnColumnTag">
                    <RNBadge tag={tag} type="tag" />
                </div>
                {data.content[columnId].content.map((it) => (
                    <div className="rnBoxItem" key={it.key}>
                        <TextButton className="deleteColumnBtn" onClick={() => deleteItem(it.key)}>
                            X
                        </TextButton>
                        <BsDot />
                        <input className="rnBoxItemContent" value={it.content} onChange={(e) => handleInputChange(it.key, e.target.value)} />
                        <div>
                            <TextButton className="connectIssueBtn">Connect Issue</TextButton>
                        </div>
                    </div>
                ))}
                <Button
                    className="addContentBtn"
                    variant="outline-success"
                    onClick={() => {
                        addItem();
                    }}
                >
                    Add Content
                </Button>
            </FadeIn>
        </FloatingWrapper>
    );
};
