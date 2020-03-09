import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { useStore } from "react-redux";
import { NavLink } from "react-router-dom";
import ManageTeamForm from "./ManageTeamForm";
import { ActionButton, ComponentRestricted, Wrapper } from "../SharedStyles";
import styled from "styled-components";

const TeamsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 10px;
	margin-bottom: 10px;
`;

const TeamLink = styled(NavLink)`
	transition: all .2s;
	background: #fde3a7;
	overflow: hidden;
	:hover {
		text-decoration: none;
	}
`;

const ColorAndName = styled.div` {
	display: flex;
	align-items: center;
`;

const ColorBlock = styled.div` {
	background: ${props => props.bg ? props.bg : 'transparent'}
	padding: 0 15px;
	height: 80px;
	transition: padding .2s;
	a:hover & {
		padding: 0 20px;
	}
`;

const TeamName = styled.span`
	color: #784d2b;
    margin-left: 10px;
    font-size: 24px;
    font-weight: 800;
	text-align: center;
	transition: opacity .2s ease-in-out;
	a:hover > & {
		text-decoration: none;
	}
`;

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
				<TeamLink key={index} to={`/teams/${team.id}`}>
					<ColorAndName>
						<ColorBlock bg={team.color}/>
						<TeamName>{team['name']}</TeamName>
					</ColorAndName>
				</TeamLink>
			)
		})
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				<TeamsWrapper>{teamsToDisplay}</TeamsWrapper>
				{addTeamMode ? <ManageTeamForm mode={'add'}/> : ""}
				<Wrapper>
					<ActionButton
						onClick={addTeam}>
						{!addTeamMode ? "Add Team" : "Hide"}
					</ActionButton>
				</Wrapper>
			</ComponentRestricted>
		</>
	)
};

export default Teams;
