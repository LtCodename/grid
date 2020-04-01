import React, { useState } from 'react';
import NavigationPanel from "../NavigationPanel";
import {ActionButton, Col, ComponentRestricted} from "../../SharedStyles";
import { useStore } from "react-redux";
import ManageDriverForm from "./ManageDriverForm";
import styled from "styled-components";
import DriverInfo from "./DriverInfo";

const DriverImage = styled.img`
	width: 100%;
`;

const DriverData = styled(Col)`
    display: flex;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    left: 50%;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    opacity: 0;
    color: #784d2b;
    background: #fff9de;
    border: 10px solid #fde3a7;
    transition: opacity .2s ease-in-out;
    
	align-items: center;
    justify-content: center;
	a:hover > & {
		opacity: 1;
	}
`;

const DriversWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr
	grid-gap: 10px;
	@media (max-width: 736px) {
		grid-template-columns: 1fr 1fr;
	}
`;

const DriverLink = styled.a`
	position: relative;
	border: 10px solid #fde3a7;
	transition: all .2s;
	overflow: hidden;
	:hover {
		border: 0px solid #fde3a7;
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
				<DriverLink key={index}>
					<DriverImage src={`${process.env.PUBLIC_URL}/assets/drivers/${driver.id}.jpg`}/>
					<DriverData>
						<DriverInfo driverId={driver.id}/>
					</DriverData>
				</DriverLink>
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
				{addDriverMode ? <ManageDriverForm mode={'add'}/> : <DriversWrapper>{driversNode}</DriversWrapper>}
				{user.length === 0 ? "" : addDriverButton}
			</ComponentRestricted>
		</>
	)
};

export default Drivers;
