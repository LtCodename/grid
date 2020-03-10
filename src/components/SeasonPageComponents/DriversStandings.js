import React, {useEffect, useState} from 'react';
import { useStore } from "react-redux";
import { InformationTable, TD, TH, TR } from "../../SharedStyles";
import PointsSystem from "../../blueprints/PointsSystem";
import styled from "styled-components";

const Name = styled.span`
    font-weight: 900;
`;

const DriversStandings = ({...otherProps}) => {
    const store = useStore();
    const storeState = store.getState();

    const drivers = storeState.drivers;
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
                    if (standingsHash[race.places[place].driver]) {
                        standingsHash[race.places[place].driver] += PointsSystem[place];
                    } else {
                        standingsHash[race.places[place].driver] = PointsSystem[place];
                    }
                }
            }

            if (race.lap) {
                standingsHash[race.lap] ++;
            }

            return standingsHash;
        });
        setStandings(standingsHash);
    };

    const tableRows = otherProps.seasonData.drivers.map((elem, index) => {
        let seasonDriver = drivers.find(driver => {
            return driver.id === elem;
        });

        const nameToArray = seasonDriver['name'].split(' ');
        const lastName = nameToArray[1];
        const shortName = lastName.slice(0, 3).toUpperCase();

        return (
            <TR key={index}>
                <TD><Name>{shortName}</Name></TD>
                <TD>{standings[seasonDriver.id]}</TD>
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
        <div>
            {statistics}
        </div>
    )
};

export default DriversStandings;
