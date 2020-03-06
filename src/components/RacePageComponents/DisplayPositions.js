import React, { useState, useEffect } from 'react';
import { useStore } from "react-redux";
import PositionsBlueprint from "../../blueprints/PositionsBlueprint";
import {InformationTable} from "../../SharedStyles";

const DisplayPositions = ({...otherProps}) => {
    const store = useStore();
    const storeState = store.getState();

    const drivers = storeState.drivers;
    const teams = storeState.teams;
    const race = storeState.races.find(race => {
        return race.id === otherProps.raceId
    });

    const [driversTable, setDriversTable] = useState({});
    const [teamsTable, setTeamsTable] = useState({});

    useEffect(() => {
        composeDriversTable();
    }, [drivers]);

    useEffect(() => {
        composeTeamsTable();
    }, [teams]);

    const composeDriversTable = () => {
        let driversTable = {};
        drivers.forEach(element => {
            return driversTable[element.id] = element.name;
        });
        setDriversTable(driversTable);
    };

    const composeTeamsTable = () => {
        let teamsTable = {};
        teams.forEach(element => {
            return teamsTable[element.id] = element.name;
        });
        setTeamsTable(teamsTable);
    };

    const tableRows = PositionsBlueprint.map((elem, index) => {
        if (race.places === undefined) return <tr key={index}/>;
        return (
            <tr key={index}>
                <th scope="row">{driversTable[race.places[elem.place].driver]}</th>
                <td>{teamsTable[race.places[elem.place].team]}</td>
                <td>{`${elem.points} points`}</td>
            </tr>
        )
    });

    const places = (
        <InformationTable className="table">
            <tbody>
            {tableRows}
            </tbody>
        </InformationTable>
    );

    return (
        <div>
            <span>Display Positions</span>
            {places}
        </div>
    )
};

export default DisplayPositions;
