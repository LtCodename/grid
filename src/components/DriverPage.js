import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { ComponentRestricted, ActionButton, InformationTable } from "../SharedStyles";
import { useStore } from "react-redux";
import ManageDriverForm from "./ManageDriverForm";
import DriverBlueprint from "../blueprints/DriverBlueprint";

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
		<InformationTable className="table">
			<tbody>
			{tableRows}
			</tbody>
		</InformationTable>
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				<ActionButton
					className="btn btn-warning"
					onClick={onEditDriver}>
					{!editDriverMode ? "Edit Driver" : "Hide"}
				</ActionButton>
				{editDriverMode ?
					<ManageDriverForm driverId={otherProps.match.params.driver_id} mode={'edit'}/> : driverDataToDisplay}
			</ComponentRestricted>
		</>
	)
};

export default DriverPage;
