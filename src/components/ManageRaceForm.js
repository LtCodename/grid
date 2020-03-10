import React, { useEffect, useState } from 'react';
import {ActionButton, Form, Label, Properties, Textarea} from "../SharedStyles";
import { useStore } from "react-redux";
import RaceBlueprint from "../blueprints/RaceBlueprint";
import fire from "../fire";

const ManageRaceForm = ({...otherProps}) => {
	const store = useStore();
	const storeState = store.getState();

	const race = storeState.races.find(race => {
		return race.id === otherProps.raceId
	});

	const season = storeState.seasons.find(season => {
		return season.id === otherProps.seasonId
	});

	const drivers = storeState.drivers;

	const [raceData, changeRaceData] = useState(race || {});

	useEffect(() => {
		changeRaceData(raceData);
	}, [raceData]);

	const submitRace = (event) => {
		event.preventDefault();
		const newRaceData = raceData;

		if (otherProps.mode === 'add') {
			newRaceData['season-id'] = otherProps.seasonId;
			fire.firestore().collection('races').add({
				...newRaceData
			}).then(() => {

			});

			const cleanState = {};
			RaceBlueprint.forEach(race => {
				cleanState[race.db] = "";
			});

			changeRaceData(cleanState);
		} else {
			fire.firestore().collection('races').doc(otherProps.raceId).update({
				...newRaceData
			}).then(() => {
				console.log("Data updated successfully!");
			}).catch(error => {
				console.log(error.message);
			});
		}
	};

	const inputValuesChange = (event) => {
		changeRaceData({
			...raceData,
			[event.target.id]: event.target.value
		});
	};

	const properties = RaceBlueprint.map((elem, index) => {
		return (
			<div key={index}>
				<Label htmlFor={elem.db}>{elem.name}</Label>
				<Textarea
					className="form-control"
					placeholder={elem.name}
					type="text"
					rows="1"
					id={elem.db}
					value={raceData[elem.db]}
					onChange={inputValuesChange}
					required>
				</Textarea>
			</div>
		)
	});

	/* Pole Position Select */
	let poleOptions;
	if (season.drivers) {
		poleOptions = ["Not selected", ...season.drivers].map((driver, index) => {
			let seasonDriver = {name: "Not selected"};
			if (driver !== "Not selected") {
				seasonDriver = drivers.find(dr => {
					return dr.id === driver;
				});
			}
			return (
				<option key={index} value={driver}>{seasonDriver.name}</option>
			);
		});
	}

	const pole = (
		<div>
			<Label htmlFor="pole">Pole position</Label>
			<select
				value={raceData['pole']}
				id="pole"
				className="custom-select"
				onChange={inputValuesChange}>
				{poleOptions}
			</select>
		</div>
	);

	/* Fastest Lap Select */
	let fastestLapOptions;
	if (season.drivers) {
		fastestLapOptions = ["Not selected", ...season.drivers].map((driver, index) => {
			let seasonDriver = {name: "Not selected"};
			if (driver !== "Not selected") {
				seasonDriver = drivers.find(dr => {
					return dr.id === driver;
				});
			}
			return (
				<option key={index} value={driver}>{seasonDriver.name}</option>
			);
		});
	}

	const fastestLap = (
		<div>
			<Label htmlFor="lap">Fastest lap</Label>
			<select
				value={raceData['lap']}
				id="lap"
				className="custom-select"
				onChange={inputValuesChange}>
				{fastestLapOptions}
			</select>
		</div>
	);

	return (
		<Form onSubmit={submitRace}>
			<Properties>
				{properties}
				{season.drivers ? pole : ''}
				{season.drivers ? fastestLap : ''}
			</Properties>
			<ActionButton>Submit</ActionButton>
		</Form>
	)
};

export default ManageRaceForm;
