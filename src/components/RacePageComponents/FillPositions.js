import React, { useState, useEffect } from 'react';
import { useStore } from "react-redux";
import PositionsBlueprint from "../../blueprints/PositionsBlueprint";
import fire from "../../fire";
import { ActionButton, Col, Row } from "../../SharedStyles";
import styled from "styled-components";

const Column = styled(Col)`
    align-items: center;
`;

const FormRow = styled(Row)`
    color: #784d2b;
`;

const Place = styled.span`
    text-align: center;
    font-weight: 800;
    margin-bottom: 5px;
`;

const PlaceColumn = styled(Col)`
    border: 1px solid #784d2b;
    padding: 10px;
    margin-bottom: 10px;
`;

const Label = styled.label`
    margin: 0 5px;
`;

const SubmitButton = styled(ActionButton)`
    margin: 0 0 10px 0;
`;

const FillPositions = ({...otherProps}) => {
    const store = useStore();
    const storeState = store.getState();

    const drivers = storeState.drivers;
    const teams = storeState.teams;
    const season = storeState.seasons.find(season => {
        return season.id === otherProps.seasonId
    });
    const race = storeState.races.find(race => {
        return race.id === otherProps.raceId
    });

    const onAddPlaceForm = () => {
		setShowAddPlace(!showAddPlace);
	};

    const [showAddPlace, setShowAddPlace] = useState(false);
    const [sortedPositions, changeSortedPositions] = useState({});


    useEffect(() => {
        let temporaryPlaces = {};
        for (let i = 1; i <= 10; i++) {
            if (race.places && race.places[i]) {
                temporaryPlaces[i] = race.places[i];
            } else {
                temporaryPlaces[i] = {
                    driver: '',
                    team: ''
                }
            }

        }
        changeSortedPositions(temporaryPlaces);
    }, [race]);
    
    const driverInputValuesChange = (event) => {
        let clone = {};

        for (let key in sortedPositions) {
            clone[key] = sortedPositions[key];
        }

        clone[event.target.id].driver = event.target.value;
        changeSortedPositions(clone);
    };

    const teamInputValuesChange = (event) => {
        let clone = {};

        for (let key in sortedPositions) {
            clone[key] = sortedPositions[key];
        }

        clone[event.target.id].team = event.target.value;
        changeSortedPositions(clone);
    };

    const driversForOptions = drivers.filter((driver) => {
        return season.drivers.indexOf(driver.id) !== -1;
    });

    const teamsForOptions = teams;

    const driversToAttach = [{name: "Not selected", value: undefined}, ...driversForOptions].map((driver, index) => {
        return (
            <option key={index} value={driver.id}>{driver.name}</option>
        );
    });

    const teamsToAttach = [{name: "Not selected", value: undefined}, ...teamsForOptions].map((team, index) => {
        return (
            <option key={index} value={team.id}>{team.name}</option>
        );
    });

    const addPlaceForm = PositionsBlueprint.map((elem, index) => {
        if (Object.entries(sortedPositions).length === 0) return '';
        return (
            <FormRow key={index}>
                <PlaceColumn>
                    <Place>{elem.name}</Place>
                    <Row>
                        <Label htmlFor="driver">Driver:</Label>
                        <select
                            value={sortedPositions[elem.place].driver}
                            id={elem.place}
                            onChange={driverInputValuesChange}>
                            {driversToAttach}
                        </select>
                        <Label htmlFor="team">Team:</Label>
                        <select
                            value={sortedPositions[elem.place].team}
                            id={elem.place}
                            onChange={teamInputValuesChange}>
                            {teamsToAttach}
                        </select>
                    </Row>
                </PlaceColumn>
            </FormRow>
        )
    });

    const submitPlaces = () => {
        race.places = sortedPositions;

        fire.firestore().collection('races').doc(otherProps.raceId).update({
            ...race
        }).then(() => {
            console.log("Data updated successfully!");
        }).catch(error => {
            console.log(error.message);
        });
    };

    const addPlaceSection = (
        <Column>
            {addPlaceForm}
            <SubmitButton onClick={submitPlaces}>Submit</SubmitButton>
        </Column>
    );
    
  return (
      <Column>
          <ActionButton onClick={onAddPlaceForm}>Fill Positions</ActionButton>
          {showAddPlace ? addPlaceSection: ""}
      </Column>
  )
};

export default FillPositions;
