import React, { useState, createContext, useEffect } from "react";
import { DeleteTeamMembers, DeleteTeams, GetTeamInfo, GetTeamList, GetTeamMembers, PostAddTeamMembers, PostCreateTeams } from "./teams.service";

export const TeamsContext = createContext();

export const TeamsContextProvider = ({ children }) => {
  const OnCreateTeam = async (teamName, userNNList, userPk, userToken) => {
    const res = await PostCreateTeams(teamName, userNNList, userPk, userToken)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const OnGetTeamInfo = async (teamPk, userPk, userToken) => {
    const res = await GetTeamInfo(teamPk, userPk, userToken)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => console.log(err));
    return res;
  };
  const OnDeleteTeam = async (teamPk, userPk, userToken) => {
    const res = await DeleteTeams(teamPk, userPk, userToken)
      .then((res) => {
        console.log(res);
        if (res.data === "team deleted successfully") {
          alert("team deleted successfully");
          return true;
        } else if (res.data === "you are not team leader") {
          alert("you are not team leader");
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  };
  const OnGetTeamList = async (userPk, userToken) => {
    const res = await GetTeamList(userPk, userToken)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));

    return res;
  };
  const OnGetTeamMembers = async (teamPk, userPk, userToken) => {
    const res = await GetTeamMembers(teamPk, userPk, userToken)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));

    return res;
  };
  const OnAddTeamMembers = async (teamPk, userNNList, userPk, userToken) => {
    const res = await PostAddTeamMembers(teamPk, userNNList, userPk, userToken)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));

    return res;
  };
  const OnDeleteTeamMembers = async (teamPk, userNNList, userPk, userToken) => {
    const res = await DeleteTeamMembers(teamPk, userNNList, userPk, userToken)
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));

    return res;
  };

  const [selectedTeamPk, setSelectedTeamPk] = useState(null);

  return (
    <TeamsContext.Provider
      value={{
        OnCreateTeam,
        OnGetTeamList,
        OnDeleteTeam,
        OnGetTeamInfo,
        OnGetTeamMembers,
        OnAddTeamMembers,
        OnDeleteTeamMembers,
        selectedTeamPk,
        setSelectedTeamPk,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};
