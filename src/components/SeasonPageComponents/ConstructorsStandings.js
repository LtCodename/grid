import React, {useEffect, useState} from 'react';
import { useStore } from "react-redux";
import {InformationTable, TD, TH, TR} from "../../SharedStyles";
import PointsSystem from "../../blueprints/PointsSystem";

const ConstructorsStandings = ({...otherProps}) => {
    const store = useStore();
    const storeState = store.getState();

    const drivers = storeState.drivers;
    const teams = storeState.teams;
    const races = storeState.races;

    const [standings, setStandings] = useState({});

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

            if (race.lap) {
                let fastestDriver = drivers.find(driver => driver.id === race.lap);
                standingsHash[fastestDriver['team-id']] ++;
            }

            return standingsHash;
        });
        setStandings(standingsHash);
    };

    const tableRows = otherProps.seasonData.drivers.map((elem, index) => {
        let seasonDriver = drivers.find(driver => {
            return driver.id === elem;
        });
        let team = teams.find(team => {
            return team.id === seasonDriver['team-id'];
        });

        return (
            <TR key={index}>
                <TD>{team.name}</TD>
                <TD>{standings[team.id]}</TD>
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
