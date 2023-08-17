import { KeyboardEvent, ChangeEvent, useState, useEffect, useContext } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import "./ProjectAccess.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import InviteProMemModal from "../../components/Modal/InviteProMemModal";
import { GetProjectMembers, GetProjectDetail } from "../../service/projects/projects.service";
import RemoveProMemModal from "../../components/Modal/RemoveProMemModal";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import FadeIn from "../../animation/FadeIn";

export const ProjectAccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [projectMembers, setProjectMembers] = useState([]);
  const [membersUpdated, setMembersUpdated] = useState(false);

  const { userToken } = useContext(AuthenticationContext);
  const [teamPk, projectPk] = location.pathname.split("/").slice(1, 3);
  const [projectDetails, setProjectDetails] = useState(null);
  const projectName = projectDetails ? projectDetails.name : "";
  const filteredProjectMembers = projectMembers.filter((member) => member.userNN.includes(searchTerm));
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const handleSearchChange = (e) => {
    // 타입 지정
    setSearchTerm(e.target.value);
  };

  const handleMemberAdded = () => {
    setMembersUpdated(!membersUpdated);
  };

  const handleMemberRemoved = () => {
    setMembersUpdated(!membersUpdated);
  };

  useEffect(() => {
    // 프로젝트 세부 정보를 가져오는 로직
    GetProjectDetail(projectPk, userToken)
      .then((res) => {
        setProjectDetails(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        alert("프로젝트 정보를 제대로 불러오지 못했습니다");
      });
  }, [projectPk, userToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetProjectMembers(projectPk, "", currentPage, pageSize, userToken);
        console.log("Project Members:", response);
        const userPksAndNNs = response.data.data.content.map((member) => ({
          userPk: member.userPk,
          userNN: member.userNN,
          userEmail: member.email,
        }));
        setProjectMembers(userPksAndNNs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectPk, membersUpdated, currentPage]); // projectPk, 멤버가 변경될 때마다

  // 다음 페이지로 이동하는 함수
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // 이전 페이지로 이동하는 함수
  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <FadeIn className="ProjectAccess">
      <FloatingWrapper className="leftContainer" width="250px" height="80vh" padding="2%">
        <div className="title">Project Setting</div>

        <div className="projectNameWrapper">
          <div className="icon"></div>
          <h2>{location.state.name}</h2>
        </div>
        <div className="prevPageWrapper">
          <AiOutlineArrowLeft className="arrow" size={24} />
          <div>전체 프로젝트</div>
        </div>

        <h5 className="leftMenuItem" onClick={() => navigate(`/${teamPk}/${projectPk}/projectSetting/`, { state: location.state })}>
          세부 사항
        </h5>
        <h5 className="leftMenuItem" onClick={() => navigate(`/${teamPk}/${projectPk}/projectAccess/`, { state: location.state })}>
          액세스
        </h5>
      </FloatingWrapper>
      <div className="rightContainer">
        <FloatingWrapper style={{ width: "600px", display: "flex", alignItems: "center", justifyContent: "center" }} padding="6%">
          <div className="ProjectAccess-header">
            <h2 className="ProjectAccess-header-title">액세스</h2>
            <div className="button-group">
              <Button className="delete-button" variant="outline-danger" type="submit" onClick={() => setShowRemoveModal(true)}>
                사용자 삭제
              </Button>
              <Button className="add-button" variant="outline-success" type="submit" onClick={() => setShowAddModal(true)}>
                사용자 추가
              </Button>
            </div>
          </div>

          <div className="ProjectAccess-body">
            <div className="ProjectAccess-body-title">프로젝트 멤버</div>
            <div className="ProjectMember-search">
              <input
                className="searchbar"
                type="text"
                placeholder="닉네임으로 검색 해보세요 :)"
                value={searchTerm}
                onChange={handleSearchChange}
                // onKeyPress={handleSearchSubmit}
              />
            </div>

            <div className="ProjectMember-list">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>닉네임</th>
                    <th>이메일</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjectMembers.map((member, index) => (
                    <tr key={index}>
                      <td>{`${member.userNN}`}</td>
                      <td>{`${member.userEmail}`}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="pagination" style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="outline-primary" onClick={handlePreviousPage} disabled={currentPage === 0}>
                이전 페이지
              </Button>
              <Button variant="outline-primary" onClick={handleNextPage} disabled={projectMembers.length < pageSize}>
                다음 페이지
              </Button>
            </div>
          </div>
        </FloatingWrapper>
        <InviteProMemModal show={showAddModal} onHide={() => setShowAddModal(false)} projectPk={projectPk} projectName={projectName} onMemberAdded={handleMemberAdded} userToken={userToken} />
        <RemoveProMemModal
          show={showRemoveModal}
          onHide={() => setShowRemoveModal(false)}
          projectPk={projectPk}
          projectName={projectName}
          onMemberRemoved={handleMemberRemoved}
          userToken={userToken}
        />
      </div>
    </FadeIn>
  );
};
