import { BsDot } from "react-icons/bs";
import { FloatingWrapper } from "./FloatingWrapper";
import { RNBadge } from "./RNBadge";
import "./RNColumn.css";
import { RNColumnContentData, RNTag, ReleaseNoteColumnData, ReleaseNoteData, Peer, Presence } from "../interfaces/releaseNote.interface";
import { Button } from "react-bootstrap";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { TextButton } from "./Buttons";
import FadeIn from "../animation/FadeIn";
import yorkie, { type Document as YorkieDoc } from 'yorkie-js-sdk';

const RNColumnContent: RNColumnContentData[] = [{ content: { editing: [], content: "" } }];

export const RNColumn = ({
  columnIndex,
  tag,
  data,
  myPresence,
  peers,
  doc,
  setRender,
}: {
  columnIndex: number;
  tag: RNTag;
  data: ReleaseNoteData;
  myPresence: Presence;
  peers: Peer[];
  doc: YorkieDoc<ReleaseNoteData>;
  setRender: Dispatch<SetStateAction<{}>>;
}) => {
  const deleteItem = (index: number) => {
    doc.update((root) => {
      root.content[columnIndex].content.splice(index, 1);
      setRender({});
    }, `delete column item`);
  };

  const addItem = () => {
    doc.update((root) => {
      const newColumnContentData: RNColumnContentData = { content: { editing: [], content: "" } };
      root.content[columnIndex].content.push(newColumnContentData);
      setRender({});
    }, `add column item`);
  };

  const handleInputChange = (itemIndex: number, inputValue: string) => {
    doc.update((root) => {
      root.content[columnIndex].content[itemIndex].content.content = inputValue;
      setRender({});
    }, 'update column item');
  };

  return (
    <FloatingWrapper className="RNColumn" borderRadius="20px">
      <FadeIn childClassName="childClassName" width="100%">
        <div className="rnColumnTag">
          <RNBadge tag={tag} type="tag" />
        </div>
        {data.content[columnIndex].content.map((it, index) => (
          <div className="rnBoxItem" key={index}>
            <TextButton className="deleteColumnBtn" onClick={() => deleteItem(index)}>
              X
            </TextButton>
            <BsDot />
            {
              it.content.editing.filter((it) => it.name !== myPresence.name).length > 0 ? (
                <input className="rnBoxItemContent" value={it.content.content} style={{ border: `${peers.filter((it) => it.presence.name !== myPresence.name).length > 0 ? '1px solid ' + peers.filter((it) => it.presence.name !== myPresence.name)[0].presence : ''}` }}
                  onFocus={() => {
                    doc.update((root) => {
                      root.content[columnIndex].content[index].content.editing.push(myPresence);
                      setRender({});
                    });
                  }}
                  onBlur={() => {
                    doc.update((root) => {
                      root.content[columnIndex].content[index].content.editing = root.content[columnIndex].content[index].content.editing.filter((it) => it.name !== myPresence.name);
                      // remain editing user when include in peers
                      for (let i = 0; i < root.content[columnIndex].content[index].content.editing.length; i++) {
                        let exist = false;
                        for (let j = 0; j < peers.length; j++) {
                          if (root.content[columnIndex].content[index].content.editing[i].name === peers[j].presence.name) {
                            exist = true;
                            break;
                          }
                        }
                        if (!exist) {
                          root.content[columnIndex].content[index].content.editing.splice(i, 1);
                          i--;
                        }
                      }
                      setRender({});
                    });
                  }}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ) : (
                <input className="rnBoxItemContent" value={it.content.content}
                  onFocus={() => {
                    doc.update((root) => {
                      root.content[columnIndex].content[index].content.editing.push(myPresence);
                      setRender({});
                    });
                  }}
                  onBlur={() => {
                    doc.update((root) => {
                      root.content[columnIndex].content[index].content.editing = root.content[columnIndex].content[index].content.editing.filter((it) => it.name !== myPresence.name);
                      // remain editing user when include in peers
                      for (let i = 0; i < root.content[columnIndex].content[index].content.editing.length; i++) {
                        let exist = false;
                        for (let j = 0; j < peers.length; j++) {
                          if (root.content[columnIndex].content[index].content.editing[i].name === peers[j].presence.name) {
                            exist = true;
                            break;
                          }
                        }
                        if (!exist) {
                          root.content[columnIndex].content[index].content.editing.splice(i, 1);
                          i--;
                        }
                      }
                      setRender({});
                    });
                  }}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              )
            }
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
