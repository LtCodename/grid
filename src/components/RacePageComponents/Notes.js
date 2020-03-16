import React from 'react';
import styled from "styled-components";
import { Col } from "../../SharedStyles";
import { useSelector, useStore } from "react-redux";
import PracticeNotes from "./PracticeNotes";
import QualificationNotes from "./QualificationNotes";
import RaceNotes from "./RaceNotes";
import Summary from "./Summary";

const NotesWrapper = styled(Col)`
	background: #FFFFFF;
	padding: 10px 20px 0 20px;
	max-width: 400px;
	min-width: 400px;
`;

const Notes = ({...otherProps}) => {
    const store = useStore();
    const storeState = store.getState();

    const race = useSelector(storeState => {
        return (
            storeState.races.find(race => {
                return race.id === otherProps.raceId
            })
        )
    });

    return (
        <NotesWrapper>
            <PracticeNotes raceId={race.id}/>
            <QualificationNotes raceId={race.id}/>
            <RaceNotes raceId={race.id}/>
            <Summary raceId={race.id}/>
        </NotesWrapper>
    )
};

export default Notes;
