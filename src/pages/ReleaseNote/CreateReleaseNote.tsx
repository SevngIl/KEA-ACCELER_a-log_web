import { Button, Fade } from "react-bootstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./CreateReleaseNote.css";
import { RNBadge } from "../../components/RNBadge";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import { RNColumn } from "../../components/RNColumn";
import { RNColumnContentData, RNTag, ReleaseNoteColumnData, ReleaseNoteData } from "../../interfaces/releaseNote.interface";
import { useRef, useState, useEffect, useContext } from "react";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import axios from "axios";
import FadeIn from "../../animation/FadeIn";
import yorkie, { Text as YorkieText, Document as YorkieDocument } from 'yorkie-js-sdk';

const yorkieApiURL: string = process.env.REACT_APP_YORKIE_API_URL!;
const yorkieApiKey: string = process.env.REACT_APP_YORKIE_API_KEY!;

const initialDisplayData: ReleaseNoteData = {
  version: "",
  date: "",
  content: [
    { key: 0, content: [{ key: 0, content: "" }], tag: "new", show: false },
    { key: 1, content: [{ key: 0, content: "" }], tag: "featured", show: false },
    { key: 2, content: [{ key: 0, content: "" }], tag: "changed", show: false },
    { key: 3, content: [{ key: 0, content: "" }], tag: "fixed", show: false },
    { key: 4, content: [{ key: 0, content: "" }], tag: "deprecated", show: false },
    { key: 5, content: [{ key: 0, content: "" }], tag: "bug", show: false },
  ],
};

export const CreateReleaseNote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pjPk = useParams().projectPk;
  const teamPk = useParams().teamPk;
  const notePk = useParams().notePk;
  const { userToken } = useContext(AuthenticationContext);
  const [render, setRender] = useState({});
  const [client, setClient] = useState(new yorkie.Client(yorkieApiURL, { apiKey: yorkieApiKey }));
  const [doc, setDoc] = useState<YorkieDocument<ReleaseNoteData>>(new YorkieDocument<ReleaseNoteData>('rn-' + notePk));

  const toggleTag = (tag: RNTag) => {
    doc.update((root) => {
      console.log("log: update toggle");
      for (let column = 0; column < root.content.length; column++) {
        if (root.content[column].tag === tag) {
          root.content[column].show = !root.content[column].show;
          break;
        }
      }
      setRender({});
    }, "update toggle");
  };

  const onSaveRelaseNote = () => {
    navigate(`/${teamPk}/${pjPk}/ReleaseNote`, { state: location.state });
  };

  useEffect(() => {
    client.activate().then(() => {
      // subscribe peer change event
      client.subscribe((event) => {
        if (event.type === "peers-changed") {
        }
      });

      client.attach(doc).then(() => {
        // 02-2. subscribe document event.
        doc.update((root) => {
          console.log(root);
          if (!root.content) {
            console.log("log: create content if not exists");
            // root = initialData;
            root.date = "";
            root.version = "";
            root.content = [...initialDisplayData.content];
          }
          setRender({});
        }, "create content if not exists");

        doc.subscribe((event) => {
          if (event.type === "snapshot") {
            // The text is replaced to snapshot and must be re-synced.
            console.log(event);
            setRender({});
          } else if (event.type === "remote-change") {
            // The text is updated by remote changes.
            console.log(event);
            setRender({});
          } else if (event.type === "local-change") {
            console.log(event);
          }
        });
        client.sync();
      });
    });
  }, []);

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
                Version :{" "}
                <input
                  className="versionInput"
                  value={doc.getRoot().version}
                  onChange={(e) => {
                    doc.update((root) => {
                      root.version = e.target.value;
                      setRender({});
                    });
                  }}
                  placeholder={"V0.0.0"}
                />
              </h6>
              <h6>
                Update Date :{" "}
                <input
                  className="updateDateInput"
                  value={doc.getRoot().date}
                  onChange={(e) => {
                    doc.update((root) => {
                      root.date = e.target.value;
                      setRender({});
                    });
                  }}
                  placeholder={"YYYY-MM-DD"}
                />
              </h6>
            </div>
            {doc.getRoot().content &&
              doc
                .getRoot()
                .content.map((it) =>
                  it.show ? (
                    <RNColumn columnId={it.key} tag={it.tag} key={it.key} content={it.content} data={doc.getRoot()} doc={doc} setRender={setRender} />
                  ) : null
                )}
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
