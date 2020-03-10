import React, { useEffect, useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted, ActionButton, InformationTable, Textarea, TR, TH, TD, Col} from "../SharedStyles";
import { useSelector, useStore } from "react-redux";
import RaceBlueprint from "../blueprints/RaceBlueprint";
import { NavLink } from "react-router-dom";
import ManageRaceForm from "./ManageRaceForm";
import styled from "styled-components";
import fire from "../fire";
import FillPositions from './RacePageComponents/FillPositions';
import DisplayPositions from "./RacePageComponents/DisplayPositions";

const NotesWrapper = styled(Col)`
	background: #FFFFFF;
	padding: 10px 20px 0 20px;
	max-width: 400px;
`;

const NoteArea = styled(Col)`
    align-items: center;
`;

const NoteTextarea = styled(Textarea)`
	font-size: 20px;
`;

const NoteAreaTitle = styled.span`
    color: #784d2b;
	text-align: center;
	text-transform: uppercase;
    font-weight: 800;
`;

const Paragraphs = styled.div`
	border-bottom: 10px solid #fde3a6;
	padding: 5px;
	width: 100%;
`;

const SummaryElement = styled.p`
	font-weight: 800;
	color: #774d2b;
	margin-bottom: 0px;
`;

const Note = styled.p`
	color: #774d2b;
	margin-bottom: 0px;
`;

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
	const [addPracticeNoteMode, setAddPracticeNoteMode] = useState(false);
	const [addQualiNoteMode, setAddQualiNoteMode] = useState(false);
	const [addRaceNoteMode, setAddRaceNoteMode] = useState(false);
	const [addSummaryMode, setAddSummaryMode] = useState(false);
	const [addNoteInputValue, setAddNoteInputValue] = useState('');
	const [noteType, setNoteType] = useState('');

	const store = useStore();
	const storeState = store.getState();

	const race = useSelector(storeState => {
		return (
			storeState.races.find(race => {
				return race.id === otherProps.match.params.race_id
			})
		)
	});

	const drivers = storeState.drivers;
	const teams = storeState.teams;

	useEffect(() => {
	},[store]);

	const onEditRace = () => {
		setEditRaceMode(!editRaceMode);
	};

	const onAddPracticeNote = () => {
		if (!addPracticeNoteMode) {
			setAddPracticeNoteMode(true);
			setNoteType('practiceNotes');
			setAddNoteInputValue('');
			setAddQualiNoteMode(false);
			setAddRaceNoteMode(false);
			setAddSummaryMode(false);
		} else {
			setAddPracticeNoteMode(false);
			setNoteType('');
			setAddNoteInputValue('');
		}
	};

	const onAddQualiNote = () => {
		if (!addQualiNoteMode) {
			setAddQualiNoteMode(true);
			setNoteType('qualiNotes');
			setAddNoteInputValue('');
			setAddPracticeNoteMode(false);
			setAddRaceNoteMode(false);
			setAddSummaryMode(false);
		} else {
			setAddQualiNoteMode(false);
			setNoteType('');
			setAddNoteInputValue('');
		}
	};

	const onAddRaceNote = () => {
		if (!addRaceNoteMode) {
			setAddRaceNoteMode(true);
			setNoteType('raceNotes');
			setAddNoteInputValue('');
			setAddPracticeNoteMode(false);
			setAddQualiNoteMode(false);
			setAddSummaryMode(false);
		} else {
			setAddRaceNoteMode(false);
			setNoteType('');
			setAddNoteInputValue('');
		}
	};

	const onAddSummary = () => {
		if (!addSummaryMode) {
			setAddSummaryMode(true);
			setNoteType('summary');
			setAddNoteInputValue('');
			setAddPracticeNoteMode(false);
			setAddQualiNoteMode(false);
			setAddRaceNoteMode(false);
		} else {
			setAddSummaryMode(false);
			setNoteType('');
			setAddNoteInputValue('');
		}
	};

	const inputValuesChange = (event) => {
		setAddNoteInputValue(event.target.value);
	};

	const onAddNote = () => {
		if (!addNoteInputValue) {
			return;
		}

		const raceReference = fire.firestore().collection("races").doc(race.id);
		const note = noteType;
		const previousNotes = race[noteType] || null;

		raceReference.update({
			[note]: previousNotes ? [...race[noteType], addNoteInputValue] : [addNoteInputValue]
		})
			.then(function () {
				console.log("Document successfully updated!");

			})
			.catch(function (error) {
				// The document probably doesn't exist.
				console.error("Error updating document: ", error);
			});

		setNoteType('');
		setAddPracticeNoteMode(false);
		setAddQualiNoteMode(false);
		setAddRaceNoteMode(false);
		setAddSummaryMode(false);
		setAddNoteInputValue('');
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

	let driversTeam = teams.find(tm => tm.id === lapDriver['team-id']);

	const fastestLap = (
		<TR>
			<TH scope="row">Fastest Lap</TH>
			<TD>{lapDriver.name}</TD>
		</TR>
	);

	const fastestLapTeam = (
		<TR>
			<TH scope="row">Fastest Team</TH>
			<TD>{driversTeam.name}</TD>
		</TR>
	);

	/* All Race Data */
	const raceDataToDisplay = (
		<InformationTable>
			<tbody>
				{tableRows}
				{race.pole ? polePosition : null}
				{race.lap ? fastestLap : null}
				{race['lap-team'] ? fastestLapTeam : null}
			</tbody>
		</InformationTable>
	);

	let practiceNotes;
	if (race.practiceNotes) {
		practiceNotes = race.practiceNotes.map((elem, index) => {
			return (
				<Note key={index}>
					{elem}
				</Note>
			)
		});
	}

	let qualiNotes;
	if (race.qualiNotes) {
		qualiNotes = race.qualiNotes.map((elem, index) => {
			return (
				<Note key={index}>
					{elem}
				</Note>
			)
		});
	}

	let raceNotes;
	if (race.raceNotes) {
		raceNotes = race.raceNotes.map((elem, index) => {
			return (
				<Note key={index}>
					{elem}
				</Note>
			)
		});
	}

	let summary;
	if (race.summary) {
		summary = race.summary.map((elem, index) => {
			return (
				<SummaryElement key={index}>
					{elem}
				</SummaryElement>
			)
		});
	}

	const addNoteForm = (
		<>
			<NoteTextarea
				className="form-control"
				placeholder={''}
				type="text"
				rows="3"
				value={addNoteInputValue}
				onChange={inputValuesChange}
				required>
			</NoteTextarea>
			<ActionButton
				onClick={onAddNote}>
				{"Add note"}
			</ActionButton>
		</>
	);

	const notes = (
		<NotesWrapper>
			<NoteArea>
				<NoteAreaTitle>Practice</NoteAreaTitle>
				<Paragraphs>
					{(race.practiceNotes && race.practiceNotes.length) ? practiceNotes : <Note>{'No Data'}</Note>}
				</Paragraphs>
				<ActionButton
					onClick={onAddPracticeNote}>
					{!addPracticeNoteMode ? "Add Note" : "Hide"}
				</ActionButton>
				{!addPracticeNoteMode ? "" : addNoteForm}
			</NoteArea>
			<NoteArea>
				<NoteAreaTitle>Qualification</NoteAreaTitle>
				<Paragraphs>
					{(race.qualiNotes && race.qualiNotes.length) ? qualiNotes : <Note>{'No Data'}</Note>}
				</Paragraphs>
				<ActionButton
					onClick={onAddQualiNote}>
					{!addQualiNoteMode ? "Add Note" : "Hide"}
				</ActionButton>
				{!addQualiNoteMode ? "" : addNoteForm}
			</NoteArea>
			<NoteArea>
				<NoteAreaTitle>Race</NoteAreaTitle>
				<Paragraphs>
					{(race.raceNotes && race.raceNotes.length) ? raceNotes : <Note>{'No Data'}</Note>}
				</Paragraphs>
				<ActionButton
					onClick={onAddRaceNote}>
					{!addRaceNoteMode ? "Add Note" : "Hide"}
				</ActionButton>
				{!addRaceNoteMode ? "" : addNoteForm}
			</NoteArea>
			<NoteArea>
				<NoteAreaTitle>Summary</NoteAreaTitle>
				<Paragraphs>
					{(race.summary && race.summary.length) ? summary : <Note>{'No Data'}</Note>}
				</Paragraphs>
				<ActionButton
					onClick={onAddSummary}>
					{!addSummaryMode ? "Add Summary" : "Hide"}
				</ActionButton>
				{!addSummaryMode ? "" : addNoteForm}
			</NoteArea>
		</NotesWrapper>
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
				<EditButton
					onClick={onEditRace}>
					{!editRaceMode ? "Edit Grand Prix" : "Hide"}
				</EditButton>
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
					{notes}
				</RaceData>
			</ComponentRestricted>
		</>
	)
};

export default RacePage;
