import React from 'react';
import NavigationPanel from "../NavigationPanel";
import ManageTeamForm from "./TeamEditForm";
import { ActionButton, ComponentRestricted } from "../../SharedStyles";
import styled from "styled-components";
import TeamBlock from "./TeamBlock";
import { connect } from "react-redux";

const TeamsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 10px;
	@media (max-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (max-width: 500px) {
		grid-template-columns: 1fr;
	}
`;

class Teams extends React.Component  {
	constructor(props) {
		super(props);

		this.state = {
			addTeamMode: false
		};
	}

	addTeam = () => {
		this.setState({
			addTeamMode: !this.state.addTeamMode
		})
	};

	render () {
		const teamsToDisplay = (
			this.props.teams.map((team, index) => {
				return (
					<TeamBlock key={index} teamData={team}/>
				)
			})
		);

		const addTeamButton = (
			<ActionButton
				onClick={this.addTeam}>
				{!this.state.addTeamMode ? "Add Team" : "Hide"}
			</ActionButton>
		);

		return (
			<>
				<NavigationPanel/>
				<ComponentRestricted>
					<TeamsWrapper>{teamsToDisplay}</TeamsWrapper>
					{this.state.addTeamMode ? <ManageTeamForm mode={'add'}/> : ""}
					{this.props.user.length === 0 ? "" : addTeamButton}
				</ComponentRestricted>
			</>
		)
	}
}

const stateToProps = (state) => {
	return {
		teams: state.teams,
		user: state.user,
	}
};

const TeamsConnected = connect(stateToProps, null)(Teams);

export default TeamsConnected;
