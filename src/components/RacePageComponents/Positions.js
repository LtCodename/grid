import React, { useState, useEffect } from 'react';
import { useStore } from "react-redux";
import PositionsBlueprint from "../../blueprints/PositionsBlueprint";

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
    const [positionsDrivers, changePositionsDrivers] = useState({});
    const [positionsTeams, changePositionsTeams] = useState({});

    useEffect(() => {
        console.log(positionsDrivers);
    }, [positionsDrivers]);

    useEffect(() => {
        console.log(positionsTeams);
    }, [positionsTeams]);
    
    const driverInputValuesChange = (event) => {
        changePositionsDrivers({
            ...positionsDrivers,
            [event.target.id]: event.target.value
        });
    };

    const teamInputValuesChange = (event) => {
        changePositionsTeams({
            ...positionsTeams,
            [event.target.id]: event.target.value
        });
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
        return (
            <div key={index}>
                <span>{`${elem.name} (+${elem.points} Points)`}</span><br/>
                <label htmlFor="driver">Driver:</label>
                <select
                    value={undefined}
                    id={elem.points}
                    onChange={driverInputValuesChange}>
                    {driversToAttach}
                </select>
                <label htmlFor="driver">Team:</label>
                <select
                    value={undefined}
                    id={elem.points}
                    onChange={teamInputValuesChange}>
                    {teamsToAttach}
                </select>
            </div>
        )
    });

    //console.log(otherProps);
    
  return (
    <>
        <span>Positions</span>
        <div>
            <button onClick={onAddPlaceForm}>Fill Positions</button>
            {showAddPlace ? addPlaceForm: ""}
        </div>
        <div>
            <button>Submit</button>
        </div>
    </>
  )
};

export default Positions;
