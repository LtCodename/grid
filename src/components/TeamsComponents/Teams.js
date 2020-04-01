import React, { useState } from 'react';
import NavigationPanel from "../NavigationPanel";
import { useStore } from "react-redux";
import ManageTeamForm from "./TeamEditForm";
import { ActionButton, ComponentRestricted } from "../../SharedStyles";
import styled from "styled-components";
import TeamBlock from "./TeamBlock";

const TeamsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 10px;
	@media (max-width: 736px) {
		grid-template-columns: 1fr 1fr;
	}
`;

const Teams = () => {
	const [addTeamMode, changeAddTeamMode] = useState(false);

	const store = useStore();
	const storeState = store.getState();
	const teams = storeState.teams;
	const user = storeState.user;

	const addTeam = () => {
		changeAddTeamMode(!addTeamMode);
	};

	const teamsToDisplay = (
		teams.map((team, index) => {
			return (
				<TeamBlock key={index} teamData={team}/>
			)
		})
	);

	const addTeamButton = (
		<ActionButton
			onClick={addTeam}>
			{!addTeamMode ? "Add Team" : "Hide"}
		</ActionButton>
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				{addTeamMode ? <ManageTeamForm mode={'add'}/> : <TeamsWrapper>{teamsToDisplay}</TeamsWrapper>}
				{user.length === 0 ? "" : addTeamButton}
			</ComponentRestricted>
		</>
	)
};

export default Teams;
