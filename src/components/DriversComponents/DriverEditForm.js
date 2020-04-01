import React, { useEffect, useState } from 'react';
import { ActionButton, Col, Form, Label } from "../../SharedStyles";
import { useStore } from "react-redux";
import DriverEditBlueprint from "../../blueprints/DriverEditBlueprint";
import fire from "../../fire";
import styled from "styled-components";

const Props = styled.div`
	display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5px;

`;

const DriverInfoLabel = styled.label`
	font-weight: 700;
	margin-bottom: 0px;
`;

const PropCol = styled(Col)`
	justify-content: center;
`;

const DriverEditTextarea = styled.textarea`
    resize: none;
    outline: none;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 3px solid #774d2b;
    margin: 0 10px 0 0;
    background: inherit;
    color: #774d2b;
    ::-webkit-input-placeholder {
		color: #774d2b;
	}
`;

const SVG = styled.svg`
    height: 20px;
    fill: #fff9de;
`;

const SubmitButton = styled(ActionButton)`
    background: #784d2b;
    width: fit-content;
    border-radius: 50%;
    height: auto;
    padding: 3px 8px 6px 8px;
    margin: 10px 0 0 0;
`;

const FormColumn = styled(Col)`
	align-items: center;
`;

const DriverEditForm = ({...otherProps}) => {
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
			<PropCol key={index}>
				<DriverInfoLabel htmlFor={elem.db}>{elem.name}</DriverInfoLabel>
				<DriverEditTextarea
					placeholder={elem.name}
					type="text"
					rows="1"
					id={elem.db}
					value={driverData[elem.db]}
					onChange={inputValuesChange}
					required>
				</DriverEditTextarea>
			</PropCol>
		)
	});

	const team = (
		<PropCol>
			<Label htmlFor="team-id">Team</Label>
			<select
				value={driverData['team-id']}
				id="team-id"
				onChange={inputValuesChange}>
				{teamOptions}
			</select>
		</PropCol>
	);

	return (
		<Form onSubmit={submitDriver}>
			<FormColumn>
				<Props>
					{properties}
					{team}
				</Props>
				<SubmitButton>
					<SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-square"
						 role="img" xmlns="http://www.w3.org/2000/svg"
						 viewBox="0 0 448 512">
						<path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"/>
					</SVG>
				</SubmitButton>
			</FormColumn>
		</Form>
	)
};

export default DriverEditForm;
