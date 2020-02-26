import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { ComponentRestricted, ActionButton, InformationTable } from "../SharedStyles";
import { useStore } from "react-redux";
import ManageDriverForm from "./ManageDriverForm";
import DriverBlueprint from "../blueprints/DriverBlueprint";
import styled from "styled-components";

const AllInfo = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 20px;
	margin-bottom: 20px;
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
    margin: 10px auto;
    width: 50%;
	color: #784d2b;
	border: none;
`;

const DriverPage = ({...otherProps}) => {
	const [editDriverMode, changeEditDriverMode] = useState(false);

	const store = useStore();
	const storeState = store.getState();

	const driver = (() => {
		const driverFromStore = storeState.drivers.find(driver => driver.id === otherProps.match.params.driver_id);
		const team = storeState.teams.find((team) => team.id === driverFromStore['team-id']);
		const date = new Date();
		const year = date.getFullYear();
		const age = year - driverFromStore['date-of-birth'];
		const inF1 = year - driverFromStore['debut'];

		return {
			...driverFromStore,
			'team-name': team ? team.name : 'Not selected',
			age,
			inF1
		};
	})();

	const onEditDriver = () => {
		changeEditDriverMode(!editDriverMode);
	};

	const tableRows = DriverBlueprint.map((elem, index) => {
		return (
			<tr key={index}>
				<th scope="row">{elem.name}</th>
				<td>{driver[elem.db]}</td>
			</tr>
		)
	});

	const driverDataToDisplay = (
		<AllInfo>
			<PictureWrapper>
				<DriverPicture src={driver.picture}></DriverPicture>
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
					className="btn btn-warning"
					onClick={onEditDriver}>
					{!editDriverMode ? "Edit Driver" : "Hide"}
				</ActionButton>
			</ComponentRestricted>
		</>
	)
};

export default DriverPage;
