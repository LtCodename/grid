import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { ComponentRestricted, ActionButton, InformationTable } from "../SharedStyles";
import ManageTeamForm from "./ManageTeamForm";
import TeamBlueprint from "../blueprints/TeamBlueprint";
import { useStore } from 'react-redux';
import { withRouter } from "react-router";

const TeamPage = ({...otherProps}) => {
  const [editTeamMode, changeEditTeamMode] = useState(false);

  const store = useStore();
  const storeState = store.getState();

  const team = storeState.teams.find(team => {
    return team.id === otherProps.match.params.team_id;
  });

  const onEditTeam = () => {
    changeEditTeamMode(!editTeamMode);
  };

  const tableRows = TeamBlueprint.map((elem, index) => {
    return (
      <tr key={index}>
        <th scope="row">{elem.name}</th>
        <td>{team[elem.db]}</td>
      </tr>
    )
  });

  const teamDataToDisplay = (
    <InformationTable className="table">
      <tbody>
      {tableRows}
      </tbody>
    </InformationTable>
  );

  return (
    <>
      <NavigationPanel/>
      <ComponentRestricted>
        {editTeamMode ? <ManageTeamForm teamId={otherProps.match.params.team_id} mode={'edit'}/> : teamDataToDisplay}
        <ActionButton
          className="btn btn-warning"
          onClick={onEditTeam}>
          {!editTeamMode ? "Edit Team" : "Hide"}
        </ActionButton>
      </ComponentRestricted>
    </>
  )
};

export default withRouter(TeamPage);
