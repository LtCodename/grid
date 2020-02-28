import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { useStore } from "react-redux";
import { NavLink } from "react-router-dom";
import ManageTeamForm from "./ManageTeamForm";
import { ActionButton, ComponentRestricted, Item, Wrapper } from "../SharedStyles";
import styled from "styled-components";

const TeamsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 20px;
	margin-bottom: 20px;
`;

const TeamLink = styled(NavLink)`
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
	border: 10px solid #fde3a7;
	transition: all .2s;
	overflow: hidden;
	height: 100px;
	:hover {
		text-decoration: none;
		box-shadow: 9px 9px 9px rgba(0, 0, 0, 0.5);
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
	a:hover > & {
		padding: 0 20px;
	}
`;

const TeamName = styled.span`
	color: #784d2b;
    margin-left: 10px;
    font-size: 25px;
    font-weight: 900;
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
						<ColorBlock bg={team.color}></ColorBlock>
						<TeamName>{team.name}</TeamName>
					</ColorAndName>
				</TeamLink>
			)
		})
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				{addTeamMode ? <ManageTeamForm mode={'add'}/> : ""}
				<TeamsWrapper>{teamsToDisplay}</TeamsWrapper>
				<Wrapper>
					<ActionButton
						className="btn btn-warning"
						onClick={addTeam}>
						{!addTeamMode ? "Add Team" : "Hide"}
					</ActionButton>
				</Wrapper>
			</ComponentRestricted>
		</>
	)
};

export default Teams;
