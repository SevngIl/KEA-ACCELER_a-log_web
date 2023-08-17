import { Button, Fade } from "react-bootstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./CreateReleaseNote.css";
import { RNBadge } from "../../components/RNBadge";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import { RNColumn } from "../../components/RNColumn";
import { RNColumnContentData, RNTag, ReleaseNoteColumnData, ReleaseNoteData, Peer, Presence } from "../../interfaces/releaseNote.interface";
import { useRef, useState, useEffect, useContext } from "react";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import axios from "axios";
import FadeIn from "../../animation/FadeIn";
import yorkie, { Text as YorkieText, Document as YorkieDocument } from 'yorkie-js-sdk';

const yorkieApiURL: string = process.env.REACT_APP_YORKIE_API_URL!;
const yorkieApiKey: string = process.env.REACT_APP_YORKIE_API_KEY!;

const COLORS = ["#0074D9", "#2ECC40", "#FF4136", "#7FDBFF", "#01FF70", "#FF851B", "#FFDC00", "#B10DC9", "#FFD700", "#F012BE", "#39CCCC", "#85144b", "#3D9970", "#111111", "#AAAAAA", "#DDDDDD", "#001F3F", "#0074D9", "#7FDBFF", "#39CCCC", "#3D9970", "#2ECC40", "#01FF70", "#FFDC00", "#FF851B", "#FF4136", "#85144b", "#F012BE", "#B10DC9", "#111111", "#AAAAAA", "#DDDDDD"];

const getRandomColor = () => {
  const index = Math.floor(Math.random() * COLORS.length);
  return COLORS[index];
};

const initialDisplayData: ReleaseNoteData = {
  version: {
    editing: [],
    content: "",
  },
  date: {
    editing: [],
    content: "",
  },
  content: [
    { key: 0, content: [{ content: { editing: [], content: "" } }], tag: "new", show: false },
    { key: 1, content: [{ content: { editing: [], content: "" } }], tag: "featured", show: false },
    { key: 2, content: [{ content: { editing: [], content: "" } }], tag: "changed", show: false },
    { key: 3, content: [{ content: { editing: [], content: "" } }], tag: "fixed", show: false },
    { key: 4, content: [{ content: { editing: [], content: "" } }], tag: "deprecated", show: false },
    { key: 5, content: [{ content: { editing: [], content: "" } }], tag: "bug", show: false },
  ],
};

export const CreateReleaseNote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pjPk = useParams().projectPk;
  const teamPk = useParams().teamPk;
  const notePk = useParams().notePk;
  const { userToken } = useContext(AuthenticationContext);
  const tokenParts = userToken.split(".");
  const decodedToken = JSON.parse(atob(tokenParts[1]));
  const myPresence: Presence  = { name: decodedToken.userNN, color: getRandomColor()};
  const [render, setRender] = useState({});
  const [client, setClient] = useState(new yorkie.Client(yorkieApiURL, { apiKey: yorkieApiKey, presence:  myPresence}));
  const [doc, setDoc] = useState<YorkieDocument<ReleaseNoteData>>(new YorkieDocument<ReleaseNoteData>('releasenote-' + notePk));
  const [peers, setPeers] = useState<Peer[]>([]);

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
    client.deactivate();
    navigate(`/${teamPk}/${pjPk}/ReleaseNote`, { state: location.state });
  };

  const addPeers = (newPeers: Peer[]) => {
    for (let i = 0; i < newPeers.length; i++) {
      if (newPeers[i].presence.name) {
        peers.push(newPeers[i]);
      }
    }
    setPeers([...peers]);
  };

  const removePeers = (list: Peer[]) => {
    let newPeers = [...peers];
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < peers.length; j++) {
        if (list[i].clientID === peers[j].clientID) {
          newPeers.splice(j, 1);
          break;
        }
      }
    }
    setPeers(newPeers);
  }

  useEffect(() => {
    client.activate().then(() => {
      // subscribe peer change event
      client.subscribe((event) => {
        if (event.type === "peers-changed") {
          // const remotePeers: Peer[] = event.value.peers[doc.getKey()];
          console.log(client.getPeersByDocKey(doc.getKey()));
          setPeers([...client.getPeersByDocKey(doc.getKey())])
          // switch (event.value.type) {
          //   case 'initialized':
          //     setPeers(remotePeers);
          //     break;
          //   case 'watched':
          //     addPeers(remotePeers);
          //     // peer as follows:
          //     // {
          //     //   clientID: 'xxxxxxxxxxxxxxxxxxxx',
          //     //   presence: {username: 'bob', color: 'red'}
          //     // }
          //     break;
          //   case 'unwatched':
          //     removePeers(remotePeers);
          //     break;
          //   case 'presence-changed':
          //     // setPeers([...client.getPeersByDocKey(doc.getKey())])
          //     break;
          //   default:
          //     break;
          // }
        }
      });

      client.attach(doc).then(() => {
        // 02-2. subscribe document event.
        doc.update((root) => {
          console.log(root);
          if (!root.content) {
            console.log("log: create content if not exists");
            // root = initialData;
            root.date = { editing: [], content: "" };
            root.version = { editing: [], content: "" };
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
              <Button className="backBtn" variant="outline-primary" onClick={() => onSaveRelaseNote()}>
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
                {
                  (doc.getRoot().version ? doc.getRoot().version.editing.filter((it) => it.name !== myPresence.name).length : 0) > 0 ? 
                    <input
                      className="versionInput"
                      style={{ border: `${peers.filter((it) => it.presence.name !== myPresence.name).length > 0 ? '1px solid ' + peers.filter((it) => it.presence.name !== myPresence.name)[0].presence.color : ''}` }}
                      value={doc.getRoot().version.content}
                      onFocus={() => {
                        doc.update((root) => {
                          root.version.editing.push(myPresence);
                          setRender({});
                        });
                      }}
                      onBlur={() => {
                        doc.update((root) => {
                          root.version.editing = root.version.editing.filter((it) => it.name !== decodedToken.userNN);
                          // remain editing user when include in peers
                          for (let i = 0; i < root.version.editing.length; i++) {
                            let exist = false;
                            for (let j = 0; j < peers.length; j++) {
                              if (root.version.editing[i].name === peers[j].presence.name) {
                                exist = true;
                                break;
                              }
                            }
                            if (!exist) {
                              root.version.editing.splice(i, 1);
                              i--;
                            }
                          }
                          setRender({});
                        });
                      }}
                      onChange={(e) => {
                        doc.update((root) => {
                          root.version.content = e.target.value;
                          setRender({});
                        });
                      }}
                      placeholder={"V0.0.0"}
                    />
                   : 
                    <input
                      className="versionInput"
                      value={doc.getRoot().version ? doc.getRoot().version.content : ""}
                      onFocus={() => {
                        doc.update((root) => {
                          root.version.editing.push(myPresence);
                          setRender({});
                        });
                      }}
                      onBlur={() => {
                        doc.update((root) => {
                          root.version.editing = root.version.editing.filter((it) => it.name !== decodedToken.userNN);
                          // remain editing user when include in peers
                          for (let i = 0; i < root.version.editing.length; i++) {
                            let exist = false;
                            for (let j = 0; j < peers.length; j++) {
                              if (root.version.editing[i].name === peers[j].presence.name) {
                                exist = true;
                                break;
                              }
                            }
                            if (!exist) {
                              root.version.editing.splice(i, 1);
                              i--;
                            }
                          }
                          setRender({});
                        });
                      }}
                      onChange={(e) => {
                        doc.update((root) => {
                          root.version.content = e.target.value;
                          setRender({});
                        });
                      }}
                      placeholder={"V0.0.0"}
                    />
                }
              </h6>
              <h6>
                Update Date :{" "}
                {
                  (doc.getRoot().date ? doc.getRoot().date.editing.filter((it) => it.name !== myPresence.name).length : 0) > 0 ? 
                    <input
                      className="updateDateInput"
                      style={{ border: `${peers.filter((it) => it.presence.name !== myPresence.name).length > 0 ? '1px solid ' + peers.filter((it) => it.presence.name !== myPresence.name)[0].presence.color : ''}` }}
                      value={doc.getRoot().date.content}
                      onFocus={() => {
                        doc.update((root) => {
                          root.date.editing.push(myPresence);
                          setRender({});
                        });
                      }}
                      onBlur={() => {
                        doc.update((root) => {
                          root.date.editing = root.date.editing.filter((it) => it.name !== decodedToken.userNN);
                          // remain editing user when include in peers
                          for (let i = 0; i < root.date.editing.length; i++) {
                            let exist = false;
                            for (let j = 0; j < peers.length; j++) {
                              if (root.date.editing[i].name === peers[j].presence.name) {
                                exist = true;
                                break;
                              }
                            }
                            if (!exist) {
                              root.date.editing.splice(i, 1);
                              i--;
                            }
                          }
                          setRender({});
                        });
                      }}
                      onChange={(e) => {
                        doc.update((root) => {
                          root.date.content = e.target.value;
                          setRender({});
                        });
                      }}
                      placeholder={"YYYY-MM-DD"}
                    />
                    : 
                    <input
                      className="updateDateInput"
                      value={doc.getRoot().date ? doc.getRoot().date.content : ""}
                      onFocus={() => {
                        doc.update((root) => {
                          root.date.editing.push(myPresence);
                          setRender({});
                        });
                      }}
                      onBlur={() => {
                        doc.update((root) => {
                          root.date.editing = root.date.editing.filter((it) => it.name !== decodedToken.userNN);
                          // remain editing user when include in peers
                          for (let i = 0; i < root.date.editing.length; i++) {
                            let exist = false;
                            for (let j = 0; j < peers.length; j++) {
                              if (root.date.editing[i].name === peers[j].presence.name) {
                                exist = true;
                                break;
                              }
                            }
                            if (!exist) {
                              root.date.editing.splice(i, 1);
                              i--;
                            }
                          }
                          setRender({});
                        });
                      }}
                      onChange={(e) => {
                        doc.update((root) => {
                          root.date.content = e.target.value;
                          setRender({});
                        });
                      }}
                      placeholder={"YYYY-MM-DD"}
                    />
                }
              </h6>
            </div>
            {doc.getRoot().content &&
              doc.getRoot().content.map((it, index) =>
                it.show ? (
                  <RNColumn columnIndex={index} tag={it.tag} data={doc.getRoot()} myPresence={myPresence} peers={peers} doc={doc} setRender={setRender} />
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
        <FadeIn className="rightNavigationWrapper" childClassName="childClassName">
          <h4 style={{ marginTop: '2rem' }}>Current Editor</h4>
          {peers.map((peer) => peer.presence ? 
              <div key={peer.clientID} className="peer">
                <span className="peerColor" style={{color: `${peer.presence.color}`}}><b>●</b>{' '}</span>
                <span className="peerName">{peer.presence.name}</span>
              </div>
              : null
          )}
        </FadeIn>
      </FloatingWrapper>
    </div>
  );
};
