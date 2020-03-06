import React, { useState, useEffect } from 'react';
import { useStore } from "react-redux";
import PositionsBlueprint from "../../blueprints/PositionsBlueprint";
import fire from "../../fire";

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
            <div key={index}>
                <span>{`${elem.name} (+${elem.points} Points)`}</span><br/>
                <label htmlFor="driver">Driver:</label>
                <select
                    value={sortedPositions[elem.place].driver}
                    id={elem.place}
                    onChange={driverInputValuesChange}>
                    {driversToAttach}
                </select>
                <label htmlFor="driver">Team:</label>
                <select
                    value={sortedPositions[elem.place].team}
                    id={elem.place}
                    onChange={teamInputValuesChange}>
                    {teamsToAttach}
                </select>
            </div>
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
        <div>
            {addPlaceForm}
            <div>
                <button onClick={submitPlaces}>Submit</button>
            </div>
        </div>
    );
    
  return (
    <>
        <span>Fill Positions</span>
        <div>
            <button onClick={onAddPlaceForm}>Fill Positions</button>
            {showAddPlace ? addPlaceSection: ""}
        </div>
    </>
  )
};

export default FillPositions;
