import React, { useState } from 'react';
import {ActionButton, Form, Label, Textarea} from "../SharedStyles";
import { useStore } from "react-redux";
import SeasonBlueprint from "../blueprints/SeasonBlueprint";
import fire from "../fire";

const ManageSeasonForm = ({...otherProps}) => {
	const store = useStore();
	const storeState = store.getState();

	const season = storeState.seasons.find(season => {
		return season.id === otherProps.seasonId
	});

	const [seasonData, changeSeasonData] = useState(season || {});

	const submitSeason = (event) => {
		event.preventDefault();
		const newSeasonData = seasonData;

		if (otherProps.mode === 'add') {
			fire.firestore().collection('seasons').add({
				...newSeasonData
			}).then(() => {

			});

			const cleanState = {};
			SeasonBlueprint.forEach(season => {
				cleanState[season.db] = "";
			});

			changeSeasonData(cleanState);
		} else {
			fire.firestore().collection('seasons').doc(otherProps.seasonId).update({
				...newSeasonData
			}).then(() => {
				console.log("Data updated successfully!");
			}).catch(error => {
				console.log(error.message);
			});
		}
	};

	const inputValuesChange = (event) => {
		changeSeasonData({
			...seasonData,
			[event.target.id]: event.target.value
		});
	};

	const properties = SeasonBlueprint.map((elem, index) => {
		return (
			<div key={index}>
				<Label htmlFor={elem.db}>{elem.name}</Label>
				<Textarea
					className="form-control"
					placeholder={elem.name}
					type="text"
					rows="1"
					id={elem.db}
					value={seasonData[elem.db]}
					onChange={inputValuesChange}
					required>
				</Textarea>
			</div>
		)
	});

	return (
		<Form onSubmit={submitSeason}>
			{properties}
			<ActionButton>Submit</ActionButton>
		</Form>
	)
};

export default ManageSeasonForm;
