import React, { useEffect, useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { ComponentRestricted, ActionButton, InformationTable, TR, TH, TD, Col } from "../SharedStyles";
import { useSelector, useStore } from "react-redux";
import RaceBlueprint from "../blueprints/RaceBlueprint";
import { NavLink } from "react-router-dom";
import ManageRaceForm from "./ManageRaceForm";
import styled from "styled-components";
import FillPositions from './RacePageComponents/FillPositions';
import DisplayPositions from "./RacePageComponents/DisplayPositions";
import Notes from "./RacePageComponents/Notes";

const RaceData = styled(Col)`
	align-items: center;
`;

const EditButton = styled(ActionButton)`
    margin: 0 0 10px 0;
`;

const BackButton = styled(ActionButton)`
    margin: 0 0 10px 0;
`;

const RacePage = ({...otherProps}) => {
	const [editRaceMode, setEditRaceMode] = useState(false);

	const store = useStore();
	const storeState = store.getState();
	const drivers = storeState.drivers;
	const user = storeState.user;

	const race = useSelector(storeState => {
		return (
			storeState.races.find(race => {
				return race.id === otherProps.match.params.race_id
			})
		)
	});

	useEffect(() => {
	},[store]);

	const onEditRace = () => {
		setEditRaceMode(!editRaceMode);
	};

	const tableRows = RaceBlueprint.map((elem, index) => {
		return (
			<TR key={index}>
				<TH scope="row">{elem.name}</TH>
				<TD>{race[elem.db]}</TD>
			</TR>
		)
	});

	/* Pole Position */
	let poleDriver = '';
	if (race.pole) {
		poleDriver = drivers.find(driver => {
			return driver.id === race.pole;
		});
	}

	const polePosition = (
		<TR>
			<TH scope="row">Pole position</TH>
			<TD>{poleDriver.name}</TD>
		</TR>
	);

	/* Fastest Lap */
	let lapDriver = '';
	if (race.lap) {
		lapDriver = drivers.find(driver => {
			return driver.id === race.lap;
		});
	}

	// let lapTeam = '';
	// if (race['lap-team']) {
	// 	lapTeam = teams.find(team => {
	// 		return team.id === race['lap-team'];
	// 	});
	// }

	let fastestLap = '';
	if (lapDriver) {
		fastestLap = (
			<TR>
				<TH scope="row">Fastest Lap</TH>
				<TD>{lapDriver.name}</TD>
			</TR>
		);
	}


	// const fastestLapTeam = (
	// 	<TR>
	// 		<TH scope="row">Fastest Team</TH>
	// 		<TD>{lapTeam.name}</TD>
	// 	</TR>
	// );

	/* All Race Data */
	const raceDataToDisplay = (
		<InformationTable>
			<tbody>
				{tableRows}
				{race.pole ? polePosition : null}
				{race.lap ? fastestLap : null}
				{/*{race['lap-team'] ? fastestLapTeam : null}*/}
			</tbody>
		</InformationTable>
	);

	const editGrandPrixButton = (
		<EditButton
			onClick={onEditRace}>
			{!editRaceMode ? "Edit Grand Prix" : "Hide"}
		</EditButton>
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				<NavLink to={`/seasons/${otherProps.match.params.season_id}`}>
					<BackButton>
						{`Back`}
					</BackButton>
				</NavLink>
				{user.length === 0 ? "" : editGrandPrixButton}
				<RaceData>
					{editRaceMode ?
						<ManageRaceForm
							raceId={otherProps.match.params.race_id}
							seasonId={otherProps.match.params.season_id}
							mode={'edit'}
						/> : raceDataToDisplay}
					<DisplayPositions 	raceId={otherProps.match.params.race_id}
										 seasonId={otherProps.match.params.season_id}/>
					<FillPositions raceId={otherProps.match.params.race_id}
								   seasonId={otherProps.match.params.season_id}/>
					<Notes raceId={otherProps.match.params.race_id}/>
				</RaceData>
			</ComponentRestricted>
		</>
	)
};

export default RacePage;
