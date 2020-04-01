import React, { useState } from 'react';
import NavigationPanel from "../NavigationPanel";
import { ActionButton, ComponentRestricted } from "../../SharedStyles";
import { useStore } from "react-redux";
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

const Drivers = () => {
	const [addDriverMode, changeAddDriverMode] = useState(false);

    const store = useStore();
    const storeState = store.getState();
    const drivers = storeState.drivers;
    const teams = storeState.teams;
    const user = storeState.user;

	const addDriver = () => {
		changeAddDriverMode(!addDriverMode);
	};

	let filteredDrivers = [];

	drivers.forEach(element => {
		const team = teams.find(tm => {
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
			onClick={addDriver}>
			{!addDriverMode ? "Add Driver" : "Hide"}
		</ActionButton>
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				{addDriverMode ? <DriverEditForm mode={'add'}/> : <DriversWrapper>{driversNode}</DriversWrapper>}
				{user.length === 0 ? "" : addDriverButton}
			</ComponentRestricted>
		</>
	)
};

export default Drivers;
