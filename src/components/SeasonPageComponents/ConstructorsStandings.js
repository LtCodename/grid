import React, {useEffect, useState} from 'react';
import { useStore } from "react-redux";
import { InformationTable } from "../../SharedStyles";
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
            <tr key={index}>
                <td>{team.name}</td>
                <td>{standings[team.id]}</td>
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

export default ConstructorsStandings;
