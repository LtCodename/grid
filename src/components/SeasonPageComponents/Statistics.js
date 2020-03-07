import React, {useEffect, useState} from 'react';
import { useStore } from "react-redux";
import styled from "styled-components";

export const StatisticsTable = styled.table`
    margin: 10px auto;
    color: #784d2b;
`;

const Statistics = ({...otherProps}) => {
    const store = useStore();
    const storeState = store.getState();

    const drivers = storeState.drivers;
    const races = storeState.races;

    const seasonRaces = races.filter(race => race['season-id'] === otherProps.seasonData.id);
    const seasonDrivers = otherProps.seasonData.drivers;

    const [podiums, setPodiums] = useState({});
    const [podiumsThisSeason, setPodiumsThisSeason] = useState({});
    const [poles, setPoles] = useState({});
    const [polesThisSeason, setPolesThisSeason] = useState({});
    const [wins, setWins] = useState({});
    const [winsThisSeason, setWinsThisSeason] = useState({});

    useEffect(() => {
        calculatePodiums();
        calculatePodiumsThisSeason();
        calculatePoles();
        calculatePolesThisSeason();
        calculateWins();
        calculateWinsThisSeason();
    }, [otherProps.seasonData]);

    const calculatePodiums = () => {
        let hash = {};

        seasonDrivers.forEach(driver => {
            const dr = drivers.find(element => element.id === driver);
            if (hash[driver]) {
                hash[driver] += parseInt(dr['podiums']);
            } else {
                hash[driver] = parseInt(dr['podiums']);
            }
            return hash;
        });

        seasonRaces.forEach(race => {
            if (race.places) {
                for (let i = 1; i <= 3; i++) {
                    if (hash[race.places[i].driver]) {
                        hash[race.places[i].driver] += 1;
                    } else {
                        hash[race.places[i].driver] = 1;
                    }
                }
            }
            return hash;
        });

        setPodiums(hash);
    };

    const calculatePodiumsThisSeason = () => {
        let hash = {};

        seasonRaces.forEach(race => {
            if (race.places) {
                for (let i = 1; i <= 3; i++) {
                    if (hash[race.places[i].driver]) {
                        hash[race.places[i].driver] += 1;
                    } else {
                        hash[race.places[i].driver] = 1;
                    }
                }
            }
            return hash;
        });

        setPodiumsThisSeason(hash);
    };

    const calculatePoles = () => {
        let hash = {};

        seasonDrivers.forEach(driver => {
            const dr = drivers.find(element => element.id === driver);
            if (hash[driver]) {
                hash[driver] += parseInt(dr['poles']);
            } else {
                hash[driver] = parseInt(dr['poles']);
            }
            return hash;
        });

        seasonRaces.forEach(race => {
            if (hash[race.pole]) {
                hash[race.pole] += 1;
            } else {
                hash[race.pole] = 1;
            }

            return hash;
        });

        setPoles(hash);
    };

    const calculatePolesThisSeason = () => {
        let hash = {};

        seasonRaces.forEach(race => {
            if (hash[race.pole]) {
                hash[race.pole] += 1;
            } else {
                hash[race.pole] = 1;
            }

            return hash;
        });

        setPolesThisSeason(hash);
    };

    const calculateWins = () => {
        let hash = {};

        seasonDrivers.forEach(driver => {
            const dr = drivers.find(element => element.id === driver);
            if (hash[driver]) {
                hash[driver] += parseInt(dr['wins']);
            } else {
                hash[driver] = parseInt(dr['wins']);
            }
            return hash;
        });

        seasonRaces.forEach(race => {
            if (race.places) {
                for (let i = 1; i <= 1; i++) {
                    if (hash[race.places[i].driver]) {
                        hash[race.places[i].driver] += 1;
                    } else {
                        hash[race.places[i].driver] = 1;
                    }
                }
            }
            return hash;
        });

        setWins(hash);
    };

    const calculateWinsThisSeason = () => {
        let hash = {};

        seasonRaces.forEach(race => {
            if (race.places) {
                for (let i = 1; i <= 1; i++) {
                    if (hash[race.places[i].driver]) {
                        hash[race.places[i].driver] += 1;
                    } else {
                        hash[race.places[i].driver] = 1;
                    }
                }
            }
            return hash;
        });

        setWinsThisSeason(hash);
    };

    const tableRows = otherProps.seasonData.drivers.map((elem, index) => {
        let seasonDriver = drivers.find(driver => {
            return driver.id === elem;
        });

        return (
            <tr key={index}>
                <td>{seasonDriver.name}</td>
                <td>{podiums[seasonDriver.id]}</td>
                <td>{podiumsThisSeason[seasonDriver.id]}</td>
                <td>{poles[seasonDriver.id]}</td>
                <td>{polesThisSeason[seasonDriver.id]}</td>
                <td>{wins[seasonDriver.id]}</td>
                <td>{winsThisSeason[seasonDriver.id]}</td>
                <td>{seasonDriver.championships}</td>
            </tr>
        )
    });

    const statistics = (
        <StatisticsTable className="table">
            <tbody>
            <tr>
                <th>Driver</th>
                <th>Podiums</th>
                <th>Podiums this season</th>
                <th>Poles</th>
                <th>Poles this season</th>
                <th>Wins</th>
                <th>Wins this season</th>
                <th>World Championships</th>
            </tr>
            {tableRows}
            </tbody>
        </StatisticsTable>
    );

    return (
        <>
            {statistics}
        </>
    )
};

export default Statistics;
