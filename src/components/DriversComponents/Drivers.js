import React from 'react';
import NavigationPanel from "../NavigationPanel";
import { ActionButton, ComponentRestricted } from "../../SharedStyles";
import { connect } from "react-redux";
import DriverEditForm from "./DriverEditForm";
import styled from "styled-components";
import DriverBlock from "./DriverBlock";

const DriversWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 10px;
	@media (max-width: 1500px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (max-width: 1000px) {
		grid-template-columns: 1fr;
	}
`;

class Drivers extends React.Component  {
	constructor(props) {
		super(props);

		this.state = {
			addDriverMode: false
		};
	}

	addDriver = () => {
		this.setState({
			addDriverMode: !this.state.addDriverMode
		})
	};

	render () {
		let filteredDrivers = [];

		this.props.drivers.forEach(element => {
			const team = this.props.teams.find(tm => {
				return tm.id === element['team-id']
			});

			filteredDrivers.push({
				id: element.id,
				picture: element.picture,
				name: element.name,
				teamName: team.name
			})
		});

		filteredDrivers.sort((a, b) => {
			const driverA = a.teamName;
			const driverB = b.teamName;

			if (driverA < driverB) {
				return -1;
			}
			if (driverA > driverB) {
				return 1;
			}
			return 0;
		});

		const driversNode = (
			filteredDrivers.map((driver, index) => {
				return (
					<DriverBlock key={index} driverId={driver.id}/>
				)
			})
		);

		const addDriverButton = (
			<ActionButton
				onClick={this.addDriver}>
				{!this.state.addDriverMode ? "Add Driver" : "Hide"}
			</ActionButton>
		);

		return (
			<>
				<NavigationPanel/>
				<ComponentRestricted>
					<DriversWrapper>{driversNode}</DriversWrapper>
					{this.state.addDriverMode ? <DriverEditForm mode={'add'}/> : ""}
					{this.props.user.length === 0 ? "" : addDriverButton}
				</ComponentRestricted>
			</>
		)

	}
}

const stateToProps = (state) => {
	return {
		teams: state.teams,
		drivers: state.drivers,
		user: state.user,
	}
};

const DriversConnected = connect(stateToProps, null)(Drivers);

export default DriversConnected;
