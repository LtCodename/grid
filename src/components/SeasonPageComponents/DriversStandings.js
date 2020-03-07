import React, {useEffect, useState} from 'react';
import { useStore } from "react-redux";
import { InformationTable } from "../../SharedStyles";
import PointsSystem from "../../blueprints/PointsSystem";

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
            return standingsHash;
        });
        setStandings(standingsHash);
    };

    const tableRows = otherProps.seasonData.drivers.map((elem, index) => {
        let seasonDriver = drivers.find(driver => {
            return driver.id === elem;
        });

        return (
            <tr key={index}>
                <td>{seasonDriver.name}</td>
                <td>{standings[seasonDriver.id]}</td>
            </tr>
        )
    });

    const statistics = (
        <InformationTable className="table">
            <tbody>
            <tr>
                <th>Driver</th>
                <th>Points</th>
            </tr>
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

export default DriversStandings;
