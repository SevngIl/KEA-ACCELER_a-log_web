import { Button } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./ReleaseNote.css";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import { RNBadge } from "../../components/RNBadge";
import { ReleaseNoteData } from "../../interfaces/releaseNote.interface";
import { BsDot } from "react-icons/bs";
import { Dispatch, useEffect, useState, useContext } from "react";
import FadeIn from "../../animation/FadeIn";
import move from "../../assets/images/move.png"; 
import { PostReleaseNote, GetReleaseNoteList, GetReleaseNote } from "../../service/release/release.service";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import yorkie, { Text as YorkieText, Document as YorkieDocument } from 'yorkie-js-sdk';

const yorkieApiURL: string = process.env.REACT_APP_YORKIE_API_URL!;
const yorkieApiKey: string = process.env.REACT_APP_YORKIE_API_KEY!;

type ReleaseNoteList = {
  data: ReleaseNoteData,
  pk: number,
}

export const ReleaseNote = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const pjPk = useParams().projectPk;
  const teamPk = useParams().teamPk;
  const userToken = useContext(AuthenticationContext).userToken;
  const [RNData, setRNData] = useState<ReleaseNoteList[]>([]);

  const getReleaseNoteData = async (data: any) => {
    const newReleaseNoteList: ReleaseNoteList[] = [];
    for (let i = 0; i < data.length; i++) {
      console.log("get release note data", data[i])
      const client = new yorkie.Client(yorkieApiURL, { apiKey: yorkieApiKey });
      await client.activate();
      const doc = new YorkieDocument<ReleaseNoteData>('releasenote-' + data[i].notePk);
      await client.attach(doc);
      newReleaseNoteList.push({ data: doc.getRoot(), pk: data[i].notePk });
      await client.detach(doc);
      await client.deactivate();
    }
    return newReleaseNoteList;
  }

  useEffect(() => {
    GetReleaseNoteList(Number(pjPk), Number(teamPk), userToken).then(async (res) => {
      const data = await getReleaseNoteData(res.data.data.rspList);
      setRNData(data);
    });
  }, []);

  return (
    <div className="ReleaseNote">
      <FadeIn className="mainWrapper">
        <div className="topWrapper">
          <h1>ReleaseNotes</h1>

          <Button className="createNewBtn" variant="outline-primary" onClick={() => {
            PostReleaseNote(Number(pjPk), Number(teamPk), true, userToken).then((res) => {
              navigation(`/${teamPk}/${pjPk}/CreateReleaseNote/${res.data.data}`, { state: location.state } );
            });
          }}>
            Create New
          </Button>
        </div>
        <div className="releaseNoteList">
          {RNData !== null
            ? RNData!.map((it) => (
                <FloatingWrapper className="releaseNote" width="90%" borderRadius="25px">
                  <div className="titleWrapper">
                    <h5 className="version">{it.data.version ? it.data.version.content : ''}</h5>
                    <div className="date">{it.data.date ? it.data.version.content : ''}</div>
                    <img src={move} className="moveCreateRN" alt="moveCreateRN" onClick={() => {
                      navigation(`/${teamPk}/${pjPk}/CreateReleaseNote/${it.pk}`, { state: location.state } );
                    }} />
                  </div>

                  {it.data.content && it.data.content.map(
                    (contentItem) =>
                      contentItem.show && (
                        <div className="releaseNoteContentItem">
                          <RNBadge tag={contentItem.tag} type="tag" />
                          <div>
                            {contentItem.content.map((item) => (
                              <div className="content">
                                <BsDot width={18} />
                                <div className="text">{item.content.content}</div>
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
            <a className="navContent">{it.data.version ? it.data.version.content : ''}</a>
          ))}
        </FloatingWrapper>
      </FadeIn>
    </div>
  );
};
