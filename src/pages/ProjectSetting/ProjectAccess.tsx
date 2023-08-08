import { KeyboardEvent, ChangeEvent, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import "./ProjectAccess.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import InviteProMemModal from "../../components/Modal/InviteProMemModal";

export const ProjectAccess = () => {
  const navigate = useNavigate();
  const { projectPk, projectName } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<{ name: string; email: string }[]>([]); // 검색 결과의 타입 선언
  const [showModal, setShowModal] = useState(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 타입 지정
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    // 타입 지정
    if (e.key === "Enter") {
      // 검색 로직
      const results = [
        { name: "홍길동", email: "hong@example.com" },
        { name: "김철수", email: "kim@example.com" },
      ];
      setSearchResults(results);
    }
  };

  return (
    <div className="ProjectAccess">
      <FloatingWrapper width="250px" height="80vh" padding="2%">
        <div className="title">Project Setting</div>

        <div className="projectNameWrapper">
          <div className="icon"></div>
          <h2>A-Log</h2>
        </div>
        <div className="prevPageWrapper">
          <AiOutlineArrowLeft className="arrow" size={24} />
          <div>전체 프로젝트</div>
        </div>

        <h5 className="leftMenuItem" onClick={() => navigate(`/projectSetting/${projectPk}/${projectName}`)}>
          세부 사항
        </h5>
        <h5 className="leftMenuItem" onClick={() => navigate(`/projectAccess/${projectPk}/${projectName}`)}>
          액세스
        </h5>
      </FloatingWrapper>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <FloatingWrapper style={{ width: "600px", display: "flex", alignItems: "center", justifyContent: "center" }} padding="6%">
          <div className="ProjectAccess-header">
            <h2 className="ProjectAccess-header-title">액세스</h2>
            <Button className="add-button" variant="outline-success" type="submit" onClick={() => setShowModal(true)}>
              사용자 추가
            </Button>
          </div>

          <div className="ProjectAccess-body">
            <div className="ProjectAccess-body-title">프로젝트 멤버</div>
            <div className="ProjectMember-search">
              <input
                className="searchbar"
                type="text"
                placeholder="이름, 이메일 주소를 검색"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleSearchSubmit}
              />
            </div>

            <div className="ProjectMember-list">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>이메일</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result, index) => (
                    <tr key={index}>
                      <td>{result.name}</td>
                      <td>{result.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </FloatingWrapper>
        <InviteProMemModal show={showModal} onHide={() => setShowModal(false)} projectPk={projectPk} projectName={projectName} />
      </div>
    </div>
  );
};
