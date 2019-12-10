import React, { useEffect, useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { ComponentRestricted, ActionButton, InformationTable, Wrapper, H4, Textarea } from "../SharedStyles";
import { useSelector, useStore } from "react-redux";
import RaceBlueprint from "../blueprints/RaceBlueprint";
import { NavLink } from "react-router-dom";
import ManageRaceForm from "./ManageRaceForm";
import styled from "styled-components";
import fire from "../fire";

const NotesWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Notes = styled.span`
    min-width: 400px;
`;

const SummaryElement = styled.p`
    font-weight: 500;
`;

const NoteTextarea = styled(Textarea)`
    min-width: 400px;
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

	const season = storeState.seasons.find(season => {
		return season.id === otherProps.match.params.season_id
	});

	const drivers = storeState.drivers;

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
			<tr key={index}>
				<th scope="row">{elem.name}</th>
				<td>{race[elem.db]}</td>
			</tr>
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
		<tr>
			<th scope="row">Pole position</th>
			<td>{poleDriver.name}</td>
		</tr>
	);

	/* Fastest Lap */
	let lapDriver = '';
	if (race.lap) {
		lapDriver = drivers.find(driver => {
			return driver.id === race.lap;
		});
	}

	const fastestLap = (
		<tr>
			<th scope="row">Fastest lap</th>
			<td>{lapDriver.name}</td>
		</tr>
	);

	/* All Race Data */
	const raceDataToDisplay = (
		<InformationTable className="table">
			<tbody>
			{tableRows}
			{race.pole ? polePosition : null}
			{race.lap ? fastestLap : null}
			</tbody>
		</InformationTable>
	);

	let practiceNotes;
	if (race.practiceNotes) {
		practiceNotes = race.practiceNotes.map((elem, index) => {
			return (
				<p key={index}>
					{elem}
				</p>
			)
		});
	}

	let qualiNotes;
	if (race.qualiNotes) {
		qualiNotes = race.qualiNotes.map((elem, index) => {
			return (
				<p key={index}>
					{elem}
				</p>
			)
		});
	}

	let raceNotes;
	if (race.raceNotes) {
		raceNotes = race.raceNotes.map((elem, index) => {
			return (
				<p key={index}>
					{elem}
				</p>
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
				className="btn btn-warning"
				onClick={onAddNote}>
				{"Add note"}
			</ActionButton>
		</>
	);

	const notes = (
		<NotesWrapper>
			<Notes>
				<H4>Practice:</H4>
				{practiceNotes}
				<ActionButton
					className="btn btn-warning"
					onClick={onAddPracticeNote}>
					{!addPracticeNoteMode ? "Add Practice Note" : "Hide"}
				</ActionButton>
				{!addPracticeNoteMode ? "" : addNoteForm}
				<H4>Qualification:</H4>
				{qualiNotes}
				<ActionButton
					className="btn btn-warning"
					onClick={onAddQualiNote}>
					{!addQualiNoteMode ? "Add Qualification Note" : "Hide"}
				</ActionButton>
				{!addQualiNoteMode ? "" : addNoteForm}
				<H4>Race:</H4>
				{raceNotes}
				<ActionButton
					className="btn btn-warning"
					onClick={onAddRaceNote}>
					{!addRaceNoteMode ? "Add Race Note" : "Hide"}
				</ActionButton>
				{!addRaceNoteMode ? "" : addNoteForm}
				<H4>Summary:</H4>
				{summary}
				<ActionButton
					className="btn btn-warning"
					onClick={onAddSummary}>
					{!addSummaryMode ? "Add Summary" : "Hide"}
				</ActionButton>
				{!addSummaryMode ? "" : addNoteForm}
			</Notes>
		</NotesWrapper>
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				<NavLink to={`/seasons/${otherProps.match.params.season_id}`}>
					<Wrapper>
						<ActionButton
							className="btn btn-warning">
							{`Back to ${season.name}`}
						</ActionButton>
					</Wrapper>
				</NavLink>
				<ActionButton
					className="btn btn-warning"
					onClick={onEditRace}>
					{!editRaceMode ? "Edit Grand Prix" : "Hide"}
				</ActionButton>
				<br/>
				{editRaceMode ?
					<ManageRaceForm
						raceId={otherProps.match.params.race_id}
						seasonId={otherProps.match.params.season_id}
						mode={'edit'}
					/> : raceDataToDisplay}
				{notes}
			</ComponentRestricted>
		</>
	)
};

export default RacePage;
