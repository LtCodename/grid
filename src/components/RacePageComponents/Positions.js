import React, { useState } from 'react';
import styled from "styled-components";
import { useStore } from "react-redux";

const Positions = ({...otherProps}) => {

    const store = useStore();
    const storeState = store.getState();

    const drivers = storeState.drivers;
    const teams = storeState.teams;
    const season = storeState.seasons.find(season => {
        return season.id === otherProps.seasonId
    });

    const onAddPlaceForm = () => {
		setShowAddPlace(!showAddPlace);
	};

    const [showAddPlace, setShowAddPlace] = useState(false);
    const [selectedDriver, changeSelectedDriver] = useState('');
    const [selectedTeam, changeSelectedTeam] = useState('');
    
    const driverInputValuesChange = (event) => {
        changeSelectedDriver(event.target.value);
    };

    const teamInputValuesChange = (event) => {
        changeSelectedTeam(event.target.value);
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

	const addPlaceForm = (
		<div>
            <label htmlFor="driver">Select Driver</label>
            <select
                value={undefined}
                id="driver"
                onChange={driverInputValuesChange}>
                {driversToAttach}
            </select>
            <label htmlFor="driver">Select Team</label>
            <select
                value={undefined}
                id="team"
                onChange={teamInputValuesChange}>
                {teamsToAttach}
            </select>
        </div>
    );

    console.log(otherProps);
    
  return (
    <>
        <span>Positions</span>
        <div>
            <button onClick={onAddPlaceForm}>Add Place</button>
            {showAddPlace ? addPlaceForm: ""}
        </div>
        <div>
            <button>Sumbit</button>
        </div>
    </>
  )
};

export default Positions;
