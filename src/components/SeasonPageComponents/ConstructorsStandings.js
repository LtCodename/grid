import React, {useEffect, useState} from 'react';
import { useStore } from "react-redux";
import {InformationTable, TD, TH, TR} from "../../SharedStyles";
import PointsSystem from "../../blueprints/PointsSystem";
import styled from "styled-components";

const Name = styled.span`
    font-weight: 900;
`;

const ConstructorsStandings = ({...otherProps}) => {
    const store = useStore();
    const storeState = store.getState();

    const teams = storeState.teams;
    const races = storeState.races;

    const [standings, setStandings] = useState([]);

    useEffect(() => {
        calculateStandings();
    }, [otherProps.seasonData]);

    const calculateStandings = () => {
        const seasonRaces = races.filter(race => race['season-id'] === otherProps.seasonData.id);
        let standingsHash = {};

        seasonRaces.forEach(race => {
            if (race.places) {
                for (let place in race.places) {
                    if (standingsHash[race.places[place].team]) {
                        standingsHash[race.places[place].team] += PointsSystem[place];
                    } else {
                        standingsHash[race.places[place].team] = PointsSystem[place];
                    }
                }
            }

            if (race['lap-team'] && race['lap-team'] !== 'Not selected') {
                standingsHash[race['lap-team']] ++;
            }

            return standingsHash;
        });

        let filteredStandings = [];

        for (let i in standingsHash) {
            filteredStandings.push({
                team: i,
                points: standingsHash[i] || 0
            })
        }

        filteredStandings.sort((a, b) => {
            const pointsA = a.points;
            const pointsB = b.points;

            if (pointsA < pointsB) {
                return 1;
            }
            if (pointsA > pointsB) {
                return -1;
            }
            return 0;
        });

        setStandings(filteredStandings);
    };

    const tableRows = standings.map((elem, index) => {

        let team = teams.find(team => {
            return team.id === elem.team;
        });

        return (
            <TR key={index}>
                <TD><Name>{team.name}</Name></TD>
                <TD>{elem.points}</TD>
            </TR>
        )
    });

    const statistics = (
        <InformationTable>
            <tbody>
            <TR>
                <TH>Driver</TH>
                <TH>Points</TH>
            </TR>
            {tableRows}
            </tbody>
        </InformationTable>
    );

    return (
        <>
            {statistics}
        </>
    )
};

export default ConstructorsStandings;
