import React, { useState } from 'react';
import { Form, Label, Properties, Property, SubmitButton, Textarea } from "../SharedStyles";
import { useStore } from "react-redux";
import TeamEditBlueprint from "../blueprints/TeamEditBlueprint";
import fire from "../fire";

const ManageTeamForm = ({...otherProps}) => {
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
			<Property key={index}>
				<Label htmlFor={elem.db}>{elem.name}</Label>
				<Textarea
					className="form-control"
					placeholder={elem.name}
					type="text"
					rows="1"
					id={elem.db}
					value={teamData[elem.db]}
					onChange={inputValuesChange}
					required>
				</Textarea>
			</Property>
		)
	});

	return (
		<Form onSubmit={submitTeam}>
			<Properties>
				{properties}
			</Properties>
			<SubmitButton className="btn">Submit</SubmitButton>
		</Form>
	)
};

export default ManageTeamForm;
