import React, { useState } from 'react';
import styled from "styled-components";
import { ActionButton, Row, Col, Textarea } from "../../SharedStyles";
import fire from "../../fire";
import { useSelector, useStore } from "react-redux";

const AddNoteButton = styled(ActionButton)`
    margin: 0 10px 10px 0;
`;

const NotesWrapper = styled(Col)`
	background: #FFFFFF;
	padding: 10px 20px 0 20px;
	max-width: 400px;
	min-width: 400px;
`;

const NoteArea = styled(Col)`
    align-items: center;
`;

const NoteTextarea = styled(Textarea)`
	color: #784d2b;
`;

const NoteAreaTitle = styled.span`
    color: #784d2b;
	text-align: center;
	text-transform: uppercase;
    font-weight: 800;
`;

const Paragraphs = styled.div`
	border-bottom: 10px solid #fde3a6;
	margin-bottom: 10px;
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

const Notes = ({...otherProps}) => {
    const store = useStore();
    const storeState = store.getState();
    const user = storeState.user;
    console.log (otherProps);

    const race = useSelector(storeState => {
        return (
            storeState.races.find(race => {
                return race.id === otherProps.raceId
            })
        )
    });

    const [addPracticeNoteMode, setAddPracticeNoteMode] = useState(false);
    const [addQualiNoteMode, setAddQualiNoteMode] = useState(false);
    const [addRaceNoteMode, setAddRaceNoteMode] = useState(false);
    const [addSummaryMode, setAddSummaryMode] = useState(false);
    const [addNoteInputValue, setAddNoteInputValue] = useState('');
    const [noteType, setNoteType] = useState('');

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

    let practiceNotesEditing;
    if (race.practiceNotes) {
        practiceNotesEditing = race.practiceNotes.map((elem, index) => {
            return (
                <textarea key={index} defaultValue={elem}>

				</textarea>
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
                    {`- ${elem}`}
                </SummaryElement>
            )
        });
    }

    const [editPracticeMode, setEditPracticeMode] = useState(false);

    const onEditPracticeNote = () => {
        setEditPracticeMode(!editPracticeMode);
        console.log('here')
    };

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
                {"Add"}
            </ActionButton>
        </>
    );

    const addPracticeNoteButton = (
        <AddNoteButton
            onClick={onAddPracticeNote}>
            {!addPracticeNoteMode ? "Add Note" : "Hide"}
        </AddNoteButton>
    );


    const addEditPracticeNoteButton = (
        <AddNoteButton
            onClick={onEditPracticeNote}>
            {!editPracticeMode ? "Edit" : "Submit"}
        </AddNoteButton>
    );

    const addQualiNoteButton = (
        <AddNoteButton
            onClick={onAddQualiNote}>
            {!addQualiNoteMode ? "Add Note" : "Hide"}
        </AddNoteButton>
    );

    const addRaceNoteButton = (
        <AddNoteButton
            onClick={onAddRaceNote}>
            {!addRaceNoteMode ? "Add Note" : "Hide"}
        </AddNoteButton>
    );

    const addSummaryButton = (
        <AddNoteButton
            onClick={onAddSummary}>
            {!addSummaryMode ? "Add Summary" : "Hide"}
        </AddNoteButton>
    );

    const practiceNotesDisplayNode = (
        (race.practiceNotes && race.practiceNotes.length) ? practiceNotes : <Note>{'No Data'}</Note>
    );

    return (
        <NotesWrapper>
            <NoteArea>
                <NoteAreaTitle>Practice</NoteAreaTitle>
                <Paragraphs>
                    {editPracticeMode ? practiceNotesEditing : practiceNotesDisplayNode}
                </Paragraphs>
                <Row>
                    {user.length === 0 ? "" : addPracticeNoteButton}
                    {user.length === 0 ? "" : addEditPracticeNoteButton}
                </Row>
                {!addPracticeNoteMode ? "" : addNoteForm}
            </NoteArea>
            <NoteArea>
                <NoteAreaTitle>Qualification</NoteAreaTitle>
                <Paragraphs>
                    {(race.qualiNotes && race.qualiNotes.length) ? qualiNotes : <Note>{'No Data'}</Note>}
                </Paragraphs>
                {user.length === 0 ? "" : addQualiNoteButton}
                {!addQualiNoteMode ? "" : addNoteForm}
            </NoteArea>
            <NoteArea>
                <NoteAreaTitle>Race</NoteAreaTitle>
                <Paragraphs>
                    {(race.raceNotes && race.raceNotes.length) ? raceNotes : <Note>{'No Data'}</Note>}
                </Paragraphs>
                {user.length === 0 ? "" : addRaceNoteButton}
                {!addRaceNoteMode ? "" : addNoteForm}
            </NoteArea>
            <NoteArea>
                <NoteAreaTitle>Summary</NoteAreaTitle>
                <Paragraphs>
                    {(race.summary && race.summary.length) ? summary : <Note>{'No Data'}</Note>}
                </Paragraphs>
                {user.length === 0 ? "" : addSummaryButton}
                {!addSummaryMode ? "" : addNoteForm}
            </NoteArea>
        </NotesWrapper>
    )
};

export default Notes;
