import React, { useEffect, useState } from 'react';
import { ActionButton, Form, Label, Properties, Textarea } from "../../SharedStyles";
import { useStore } from "react-redux";
import DriverEditBlueprint from "../../blueprints/DriverEditBlueprint";
import fire from "../../fire";
import styled from "styled-components";

const SubmitButton = styled(ActionButton)`
    margin: 10px 0 0 0;
`;

const ManageDriverForm = ({...otherProps}) => {
	const store = useStore();
	const storeState = store.getState();

	const driver = storeState.drivers.find(driver => {
		return driver.id === otherProps.driverId
	});
	const teams = storeState.teams;

	const [driverData, changeDriverData] = useState(driver || {});

	useEffect(() => {
		changeDriverData(driverData);
	},[driverData]);


	const submitDriver = (event) => {
		event.preventDefault();
		const newDriverData = driverData;

		if (otherProps.mode === 'add') {
			fire.firestore().collection('drivers').add({
				...newDriverData
			}).then(() => {

			});

			const cleanState = {"team-id": ""};
			DriverEditBlueprint.forEach(driver => {
				cleanState[driver.db] = "";
			});

			changeDriverData(cleanState);
		} else {
			fire.firestore().collection('drivers').doc(otherProps.driverId).update({
				...newDriverData
			}).then(() => {
				console.log("Data updated successfully!");
			}).catch(error => {
				console.log(error.message);
			});
		}
	};

	const inputValuesChange = (event) => {
		changeDriverData({...driverData,
			[event.target.id]: event.target.value
		});
	};

	const teamOptions = [{name: "Not selected", value: null}, ...teams].map((team, index) => {
		return (
			<option key={index} value={team.id}>{team.name}</option>
		);
	});

	const properties = DriverEditBlueprint.map((elem, index) => {
		return (
			<div key={index}>
				<Label htmlFor={elem.db}>{elem.name}</Label>
				<Textarea
					className="form-control"
					placeholder={elem.name}
					type="text"
					rows="1"
					id={elem.db}
					value={driverData[elem.db]}
					onChange={inputValuesChange}
					required>
				</Textarea>
			</div>
		)
	});

	const team = (
		<div>
			<Label htmlFor="team-id">Team</Label>
			<select
				value={driverData['team-id']}
				id="team-id"
				className="custom-select"
				onChange={inputValuesChange}>
				{teamOptions}
			</select>
		</div>
	);

	return (
		<Form onSubmit={submitDriver}>
			<Properties>
				{properties}
				{team}
			</Properties>
			<SubmitButton>Submit</SubmitButton>
		</Form>
	)
};

export default ManageDriverForm;
