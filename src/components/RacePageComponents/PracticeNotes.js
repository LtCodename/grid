import React, { useEffect, useState } from 'react';
import {
    ActionButton, AddNoteColumn,
    Col,
    DeleteButton,
    DeleteIcon,
    EditNoteTextarea,
    NoteRow, NoteTextarea,
    Row
} from "../../SharedStyles";
import { useSelector, useStore } from "react-redux";
import styled from "styled-components";
import fire from "../../fire";

const Note = styled.p`
	color: #774d2b;
	margin-bottom: 5px;
`;

const SystemButton = styled(ActionButton)`
    margin: 0 10px 10px 0;
`;

const AddButton = styled(ActionButton)`
    margin: 10px 0 5px 0;
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

const PracticeNotes = ({...otherProps}) => {

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

    const [addPracticeNoteMode, setAddPracticeNoteMode] = useState(false);
    const [addNoteInputValue, setAddNoteInputValue] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [notesData, setNotesData] = useState([]);
    const [deleting, setDeleting] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(999);

    useEffect(() => {
        setNotesData(race.practiceNotes)
    },[race]);

    const inputValuesChange = (event) => {
        setAddNoteInputValue(event.target.value);
    };

    const editValueChange = (event) => {
        let notes = notesData;
        notes[event.target.id] = event.target.value;
        setNotesData(notes);
    };

    const onAddPracticeNote = () => {
        if (!addPracticeNoteMode) {
            setAddPracticeNoteMode(true);
            setAddNoteInputValue('');
        } else {
            setAddPracticeNoteMode(false);
            setAddNoteInputValue('');
        }
    };

    const onDeleteNote = (index) => {
        setDeleteIndex(index);
        setDeleting(true);
    };

    const onConfirmDelete = () => {
        let array = notesData;
        array.splice(deleteIndex, 1);
        setNotesData(array);
        submitNotesToDb(true);
        setDeleteIndex(999);
    };

    const onAbortDelete = () => {
        setDeleting(false);
    };

    const confirm = (
        <Row>
            <DeleteButton onClick={onConfirmDelete}>
                <DeleteIcon aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle"
                     role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/>
                </DeleteIcon>
            </DeleteButton>
            <DeleteButton onClick={onAbortDelete}>
                <DeleteIcon aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ban"
                     role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <path d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"/>
                </DeleteIcon>
            </DeleteButton>
        </Row>
    );

    let practiceNotes;
    if (race.practiceNotes) {
        practiceNotes = race.practiceNotes.map((elem, index) => {
            const deleteButton = (
                <DeleteButton onClick={() => onDeleteNote(index)}>
                    <DeleteIcon aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash"
                         role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                        <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/>
                    </DeleteIcon>
                </DeleteButton>
            );
            return (
                <NoteRow key={index}>
                    <Note>
                        {elem}
                    </Note>
                    {(deleting && index === deleteIndex) ? confirm : deleteButton}
                </NoteRow>
            )
        });
    }

    let notesEditing;
    if (race.practiceNotes) {
        notesEditing = notesData.map((elem, index) => {
            return (
                <EditNoteTextarea
                    key={index}
                    className={'form-control'}
                    id={index}
                    defaultValue={elem}
                    onChange={editValueChange}/>
            )
        });
    }

    const onEditNote = () => {
        if (editMode) {
            submitNotesToDb();
            return;
        }
        setEditMode(!editMode);
    };

    const submitNotesToDb = (deleting = false) => {
        const raceToUpdate = fire.firestore().collection("races").doc(race.id);
        const note = 'practiceNotes';

        raceToUpdate.update({
            [note]: notesData
        })
            .then(function () {
                console.log("Document successfully updated!");
                if (!deleting) setEditMode(!editMode);
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    };

    const addPracticeNoteButton = (
        <SystemButton
            onClick={onAddPracticeNote}>
            {!addPracticeNoteMode ? "Add Note" : "Hide"}
        </SystemButton>
    );

    const addEditButton = (
        <SystemButton
            onClick={onEditNote}>
            {!editMode ? "Edit" : "Submit"}
        </SystemButton>
    );

    const onAddNote = () => {
        if (!addNoteInputValue) {
            return;
        }

        const raceReference = fire.firestore().collection("races").doc(race.id);
        const note = 'practiceNotes';
        const previousNotes = race['practiceNotes'] || null;

        raceReference.update({
            [note]: previousNotes ? [...race['practiceNotes'], addNoteInputValue] : [addNoteInputValue]
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

    const practiceNotesDisplayNode = (
        (race.practiceNotes && race.practiceNotes.length) ? practiceNotes : <Note>{'No Data'}</Note>
    );

    const addNoteForm = (
        <AddNoteColumn>
            <NoteTextarea
                className="form-control"
                placeholder={''}
                type="text"
                rows="3"
                value={addNoteInputValue}
                onChange={inputValuesChange}
                required>
            </NoteTextarea>
            <AddButton
                onClick={onAddNote}>
                {"Add"}
            </AddButton>
        </AddNoteColumn>
    );

    const editButtonNode = ((race.practiceNotes && race.practiceNotes.length) ? addEditButton : '');

    return (
        <NoteArea>
            <NoteAreaTitle>Practice</NoteAreaTitle>
            <Paragraphs>
                {editMode ? notesEditing : practiceNotesDisplayNode}
                {!addPracticeNoteMode ? "" : addNoteForm}
            </Paragraphs>
            <Row>
                {user.length === 0 ? "" : addPracticeNoteButton}
                {user.length === 0 ? "" : editButtonNode}
            </Row>
        </NoteArea>
    )
};

export default PracticeNotes;
