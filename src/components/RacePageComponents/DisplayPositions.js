import React, { useState, useEffect } from 'react';
import { useStore } from "react-redux";
import PositionsBlueprint from "../../blueprints/PositionsBlueprint";
import { Col, InformationTable, TD, TR } from "../../SharedStyles";
import styled from "styled-components";

const ResultsHeader = styled.span`
    text-align: center;
    color: #774d2b;
    font-size: 18px;
    font-weight: 800;
`;

const Table = styled(InformationTable)`
    margin: 10px 0 0 0;
`;

const NoData = styled.span`
    color: #774d2b;
    text-align: center;
    margin-top: 5px;
`;

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
            <TR key={index}>
                <TD scope="row">{driversTable[race.places[elem.place].driver]}</TD>
                <TD>{teamsTable[race.places[elem.place].team]}</TD>
                <TD>{`${elem.points} points`}</TD>
            </TR>
        )
    });

    const places = (
        <Table>
            <tbody>
            {tableRows}
            </tbody>
        </Table>
    );

    return (
        <Col>
            <ResultsHeader>Race Results</ResultsHeader>
            {race.places ? places : <NoData>No Data</NoData>}
        </Col>
    )
};

export default DisplayPositions;
