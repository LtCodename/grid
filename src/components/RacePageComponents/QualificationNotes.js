import React, { useEffect, useState } from 'react';
import { ActionButton, Col, EditNoteTextarea, Row, Textarea } from "../../SharedStyles";
import { useSelector, useStore } from "react-redux";
import styled from "styled-components";
import fire from "../../fire";

const Note = styled.p`
	color: #774d2b;
	margin-bottom: 0px;
`;
const NoteTextarea = styled(Textarea)`
	color: #784d2b;
`;

const AddNoteButton = styled(ActionButton)`
    margin: 0 10px 10px 0;
`;

const NoteArea = styled(Col)`
    align-items: center;
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

const QualificationNotes = ({...otherProps}) => {

    const store = useStore();
    const storeState = store.getState();
    const user = storeState.user;

    const race = useSelector(storeState => {
        return (
            storeState.races.find(race => {
                return race.id === otherProps.raceId
            })
        )
    });

    const [editMode, setEditMode] = useState(false);
    const [notesData, setNotesData] = useState([]);

    useEffect(() => {
        setNotesData(race.qualiNotes)
    },[race]);

    const [addQualiNoteMode, setAddQualiNoteMode] = useState(false);
    const [addNoteInputValue, setAddNoteInputValue] = useState('');

    const onAddQualiNote = () => {
        if (!addQualiNoteMode) {
            setAddQualiNoteMode(true);
        } else {
            setAddQualiNoteMode(false);
        }
    };

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

    const addQualiNoteButton = (
        <AddNoteButton
            onClick={onAddQualiNote}>
            {!addQualiNoteMode ? "Add Note" : "Hide"}
        </AddNoteButton>
    );

    const inputValuesChange = (event) => {
        setAddNoteInputValue(event.target.value);
    };

    const onAddNote = () => {
        if (!addNoteInputValue) {
            return;
        }

        const raceReference = fire.firestore().collection("races").doc(race.id);
        const note = 'qualiNotes';
        const previousNotes = race['qualiNotes'] || null;

        raceReference.update({
            [note]: previousNotes ? [...race['qualiNotes'], addNoteInputValue] : [addNoteInputValue]
        })
            .then(function () {
                console.log("Document successfully updated!");

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

        setAddNoteInputValue('');
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

    const onEditNote = () => {
        if (editMode) {
            submitNotesToDb();
            return;
        }
        setEditMode(!editMode);
    };

    const editValueChange = (event) => {
        let notes = notesData;
        notes[event.target.id] = event.target.value;
        setNotesData(notes);
    };

    let notesEditing;
    if (race.practiceNotes) {
        notesEditing = race.qualiNotes.map((elem, index) => {
            return (
                <EditNoteTextarea
                    className={'form-control'}
                    key={index}
                    id={index}
                    defaultValue={elem}
                    onChange={editValueChange}/>
            )
        });
    }

    const submitNotesToDb = () => {
        const raceToUpdate = fire.firestore().collection("races").doc(race.id);
        const note = 'qualiNotes';

        raceToUpdate.update({
            [note]: notesData
        })
            .then(function () {
                console.log("Document successfully updated!");
                setEditMode(!editMode);
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    };

    const notesDisplayNode = (
        (race.qualiNotes && race.qualiNotes.length) ? qualiNotes : <Note>{'No Data'}</Note>
    );

    const addEditButton = (
        <AddNoteButton
            onClick={onEditNote}>
            {!editMode ? "Edit" : "Submit"}
        </AddNoteButton>
    );

    return (
        <NoteArea>
            <NoteAreaTitle>Qualification</NoteAreaTitle>
            <Paragraphs>
                {editMode ? notesEditing : notesDisplayNode}
            </Paragraphs>
            <Row>
                {user.length === 0 ? "" : addQualiNoteButton}
                {user.length === 0 ? "" : addEditButton}
            </Row>
            {!addQualiNoteMode ? "" : addNoteForm}
        </NoteArea>
    )
};

export default QualificationNotes;
