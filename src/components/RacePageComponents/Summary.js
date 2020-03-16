import React, { useState } from 'react';
import { ActionButton, Col, Textarea } from "../../SharedStyles";
import { useSelector, useStore } from "react-redux";
import styled from "styled-components";
import fire from "../../fire";

const Note = styled.p`
	color: #774d2b;
	margin-bottom: 0px;
`;

const SummaryElement = styled.p`
	font-weight: 800;
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

const Summary = ({...otherProps}) => {

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

    const [addSummaryMode, setAddSummaryMode] = useState(false);
    const [addNoteInputValue, setAddNoteInputValue] = useState('');

    const onAddSummary = () => {
        if (!addSummaryMode) {
            setAddSummaryMode(true);
            setAddNoteInputValue('');
        } else {
            setAddSummaryMode(false);
            setAddNoteInputValue('');
        }
    };

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

    const addSummaryButton = (
        <AddNoteButton
            onClick={onAddSummary}>
            {!addSummaryMode ? "Add Summary" : "Hide"}
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
        const note = 'summary';
        const previousNotes = race['summary'] || null;

        raceReference.update({
            [note]: previousNotes ? [...race['summary'], addNoteInputValue] : [addNoteInputValue]
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

    return (
        <NoteArea>
            <NoteAreaTitle>Summary</NoteAreaTitle>
            <Paragraphs>
                {(race.summary && race.summary.length) ? summary : <Note>{'No Data'}</Note>}
            </Paragraphs>
            {user.length === 0 ? "" : addSummaryButton}
            {!addSummaryMode ? "" : addNoteForm}
        </NoteArea>
    )
};

export default Summary;