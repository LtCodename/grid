import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { ComponentRestricted, ActionButton, TR, TH, TD } from "../SharedStyles";
import { useStore } from "react-redux";
import ManageDriverForm from "./ManageDriverForm";
import DriverBlueprint from "../blueprints/DriverBlueprint";
import styled from "styled-components";

const AllInfo = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 20px;
	margin-bottom: 10px;
`;

const PictureWrapper = styled.div`
	height: 400px;
	overflow: hidden;
	border: 10px solid #fde3a7;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
`;

const DriverPicture = styled.img`
	width: 100%;
`;

const DriverTable = styled.table`
	color: #784d2b;
	border: none;
`;

const DriverPage = ({...otherProps}) => {
	const [editDriverMode, changeEditDriverMode] = useState(false);

	const store = useStore();
	const storeState = store.getState();
	const races = storeState.races;

	const calculateWins = (driverData) => {
		let counter = 0;

		races.forEach(race => {
			if (race.places) {
				for (let i = 1; i <= 1; i++) {
					if (race.places[i].driver === driverData.id) {
						counter += 1;
					}
				}
			}
		});

		counter += parseInt(driverData.wins);
		return counter;
	};

	const calculatePoles = (driverData) => {
		let counter = 0;

		races.forEach(race => {
			if (race.pole === driverData.id) {
				counter += 1;
			}
		});

		counter += parseInt(driverData.poles);
		return counter;
	};

	const calculatePodiums = (driverData) => {
		let counter = 0;

		races.forEach(race => {
			if (race.places) {
				for (let i = 1; i <= 3; i++) {
					if (race.places[i].driver === driverData.id) {
						counter += 1;
					}
				}
			}
		});

		counter += parseInt(driverData.podiums);
		return counter;
	};

	const driver = (() => {
		const driverFromStore = storeState.drivers.find(driver => driver.id === otherProps.match.params.driver_id);
		const team = storeState.teams.find((team) => team.id === driverFromStore['team-id']);
		const date = new Date();
		const year = date.getFullYear();
		const age = year - driverFromStore['date-of-birth'];
		const inF1 = year - driverFromStore['debut'];

		const wins = calculateWins(driverFromStore);
		const poles = calculatePoles(driverFromStore);
		const podiums = calculatePodiums(driverFromStore);

		return {
			...driverFromStore,
			'team-name': team ? team.name : 'Not selected',
			'wins': wins,
			'poles': poles,
			'podiums': podiums,
			age,
			inF1
		};
	})();

	const onEditDriver = () => {
		changeEditDriverMode(!editDriverMode);
	};

	const tableRows = DriverBlueprint.map((elem, index) => {
		return (
			<TR key={index}>
				<TH scope="row">{elem.name}</TH>
				<TD>{driver[elem.db]}</TD>
			</TR>
		)
	});

	const driverDataToDisplay = (
		<AllInfo>
			<PictureWrapper>
				<DriverPicture src={driver.picture}/>
			</PictureWrapper>
			<DriverTable>
				<tbody>
					{tableRows}
				</tbody>
			</DriverTable>
		</AllInfo>
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				{editDriverMode ?
					<ManageDriverForm driverId={otherProps.match.params.driver_id} mode={'edit'}/> : driverDataToDisplay}
				<ActionButton
					onClick={onEditDriver}>
					{!editDriverMode ? "Edit Driver" : "Hide"}
				</ActionButton>
			</ComponentRestricted>
		</>
	)
};

export default DriverPage;
