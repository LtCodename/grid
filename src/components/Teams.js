import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { useStore } from "react-redux";
import { NavLink } from "react-router-dom";
import ManageTeamForm from "./ManageTeamForm";
import { ActionButton, ComponentRestricted, Item, Wrapper } from "../SharedStyles";

const Teams = () => {
	const [addTeamMode, changeAddTeamMode] = useState(false);

	const store = useStore();
	const storeState = store.getState();

	const teams = storeState.teams;

	const addTeam = () => {
		changeAddTeamMode(!addTeamMode);
	};

	const teamsToDisplay = (
		teams.map((team, index) => {
			return (
				<NavLink key={index} to={`/teams/${team.id}`}>
					<Item className="btn">{team.name}</Item>
				</NavLink>
			)
		})
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				<Wrapper>
					<ActionButton
						className="btn btn-warning"
						onClick={addTeam}>
						{!addTeamMode ? "Add Team" : "Hide"}
					</ActionButton>
				</Wrapper>
				{addTeamMode ? <ManageTeamForm mode={'add'}/> : ""}
				{teamsToDisplay}
			</ComponentRestricted>
		</>
	)
};

export default Teams;
