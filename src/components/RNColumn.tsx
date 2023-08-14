import { BsDot } from "react-icons/bs";
import { FloatingWrapper } from "./FloatingWrapper";
import { RNBadge } from "./RNBadge";
import "./RNColumn.css";
import { RNColumnContentData, RNTag, ReleaseNoteColumnData, ReleaseNoteData } from "../interfaces/releaseNote.interface";
import { Button } from "react-bootstrap";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { TextButton } from "./Buttons";
import FadeIn from "../animation/FadeIn";
import yorkie, { type Document as YorkieDoc } from 'yorkie-js-sdk';

const RNColumnContent: RNColumnContentData[] = [{ key: 0, content: "" }];

export const RNColumn = ({
    columnId,
    tag,
    content,
    doc,
    data,
    setRender,
}: {
    columnId: number;
    tag: RNTag;
    content: RNColumnContentData[];
    data: ReleaseNoteData;
    doc: YorkieDoc<ReleaseNoteData>;
    setRender: Dispatch<SetStateAction<{}>>;
}) => {
    const contentId = useRef(1);

    const deleteItem = (id: number) => {
        doc.update((root) => {
            for (let column = 0; column < data.content.length; column++) {
                if (data.content[column].key === columnId) {
                    const newColumnContentData = data.content[column].content.filter((item) => item.key !== id);
                    root.content[column].content = newColumnContentData;
                    contentId.current -= 1;
                    setRender({});
                    break;
                }
            }
        }, `delete column item`);
    };

    const addItem = () => {
        doc.update((root) => {
            const newColumnContentData: RNColumnContentData = { key: contentId.current, content: "" };
            root.content[columnId].content.push(newColumnContentData);
            contentId.current += 1;
            setRender({});
        }, `add column item`);
    };

    const handleInputChange = (itemId: number, inputValue: string) => {
        doc.update((root) => {
            for (let column = 0; column < data.content.length; column++) {
                if (data.content[column].key === columnId) {
                    for (let item = 0; item < data.content[column].content.length; item++) {
                        if (data.content[column].content[item].key === itemId) {
                            root.content[column].content[item].content = inputValue;
                            setRender({});
                        }
                    }
                }
            }
        }, 'update column item');
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
