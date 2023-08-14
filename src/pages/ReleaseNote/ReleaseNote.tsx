import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./ReleaseNote.css";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import { RNBadge } from "../../components/RNBadge";
import { ReleaseNoteData } from "../../interfaces/releaseNote.interface";
import { BsDot } from "react-icons/bs";
import { Dispatch, useEffect, useState } from "react";
import FadeIn from "../../animation/FadeIn";
import move from "../../assets/images/move.png";

export const ReleaseNote = () => {
  const navigation = useNavigate();
  const [RNData, setRNData] = useState<ReleaseNoteData[]>(JSON.parse(localStorage.getItem("RNData")!) || []);
  const location = useLocation();
  const [teamPk, projectPk] = location.pathname.split("/").slice(1, 3);

  return (
    <div className="ReleaseNote">
      <FadeIn className="mainWrapper">
        <div className="topWrapper">
          <h1>ReleaseNotes</h1>

          <Button className="createNewBtn" variant="outline-primary" onClick={() => navigation(`/${teamPk}/${projectPk}/createReleaseNote`, { state: it })}>
            Create New
          </Button>
        </div>
        <div className="releaseNoteList">
          {RNData !== null
            ? RNData!.map((it) => (
                <FloatingWrapper className="releaseNote" width="90%" borderRadius="25px">
                  <div className="titleWrapper">
                    <h5 className="version">{it.version}</h5>
                    <div className="date">{it.date}</div>
                    <img src={move} className="moveCreateRN" onClick={() => navigation(`/${teamPk}/${projectPk}/createReleaseNote`, { state: it })} />
                  </div>

                  {it.content.map(
                    (contentItem) =>
                      contentItem.show && (
                        <div className="releaseNoteContentItem">
                          <RNBadge tag={contentItem.tag} type="tag" />
                          <div>
                            {contentItem.content.map((item) => (
                              <div className="content">
                                <BsDot width={18} />
                                <div className="text">{item.content}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                  )}
                </FloatingWrapper>
              ))
            : null}
        </div>
      </FadeIn>
      <FadeIn>
        <FloatingWrapper className="rightNavigation" width="150px" height="fit-content">
          {RNData.map((it) => (
            <a className="navContent">{it.version}</a>
          ))}
        </FloatingWrapper>
      </FadeIn>
    </div>
  );
};
