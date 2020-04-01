import React, { useState } from 'react';
import { ActionButton, Col, Label, Row } from "../../SharedStyles";
import { useStore } from "react-redux";
import TeamEditBlueprint from "../../blueprints/TeamEditBlueprint";
import fire from "../../fire";
import styled from "styled-components";

const SubmitButton = styled(ActionButton)`
    background: #fff9de;
    width: fit-content;
    border-radius: 50%;
    height: auto;
    padding: 3px 8px 6px 8px;
    margin: 10px 0 10px 0;
`;

const EditProps = styled(Col)`
`;

const FormColumn = styled(Col)`
	align-items: center;
	width: fit-content;
	background: #fde3a6;
	padding-top: 10px;
`;

const PropRow = styled(Row)`
	justify-content: space-between;
`;

const EditForm = styled.form`
	margin: 10px 0 0 0;
`;

const TeamEditLabel = styled(Label)`
	padding: 0 10px;
	font-weight: 700;
	margin-bottom: 0px;
`;

const SVG = styled.svg`
    height: 20px;
    fill: #784d2b;
`;

const FormRow = styled(Row)`
	justify-content: center;
`;

const TeamEditTextarea = styled.textarea`
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

const TeamEditForm = ({...otherProps}) => {
	const store = useStore();
	const storeState = store.getState();

	const team = storeState.teams.find(team => {
		return team.id === otherProps.teamId
	});

	const [teamData, changeTeamData] = useState(team || {});

	const submitTeam = (event) => {
		event.preventDefault();
		const newTeamData = teamData;

		if (otherProps.mode === 'add') {
			fire.firestore().collection('teams').add({
				...newTeamData
			}).then(() => {

			});

			const cleanState = {};
			TeamEditBlueprint.forEach(team => {
				cleanState[team.db] = "";
			});

			changeTeamData(cleanState);
		} else {
			fire.firestore().collection('teams').doc(otherProps.teamId).update({
				...newTeamData
			}).then(() => {
				console.log("Data updated successfully!");
			}).catch(error => {
				console.log(error.message);
			});
		}
	};

	const inputValuesChange = (event) => {
		changeTeamData({
			...teamData,
			[event.target.id]: event.target.value
		});
	};

	const properties = TeamEditBlueprint.map((elem, index) => {
		return (
			<PropRow key={index}>
				<TeamEditLabel htmlFor={elem.db}>{elem.name}</TeamEditLabel>
				<TeamEditTextarea
					placeholder={elem.name}
					type="text"
					rows={elem.db === 'name-full' ? 2 : 1}
					id={elem.db}
					value={teamData[elem.db]}
					onChange={inputValuesChange}
					required>
				</TeamEditTextarea>
			</PropRow>
		)
	});

	return (
		<FormRow>
			<EditForm onSubmit={submitTeam}>
				<FormColumn>
					<EditProps>
						{properties}
					</EditProps>
					<SubmitButton>
						<SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-square"
							 role="img" xmlns="http://www.w3.org/2000/svg"
							 viewBox="0 0 448 512">
							<path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"/>
						</SVG>
					</SubmitButton>
				</FormColumn>
			</EditForm>
		</FormRow>
	)
};

export default TeamEditForm;
