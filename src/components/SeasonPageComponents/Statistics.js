import React, {useEffect, useState} from 'react';
import { useStore } from "react-redux";
import { TR, TD, TH } from "../../SharedStyles";
import styled from "styled-components";

const StatisticsTable = styled.table`
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
            <TR key={index}>
                <TD>{seasonDriver.name}</TD>
                <TD>{podiums[seasonDriver.id]}</TD>
                <TD>{podiumsThisSeason[seasonDriver.id]}</TD>
                <TD>{poles[seasonDriver.id]}</TD>
                <TD>{polesThisSeason[seasonDriver.id]}</TD>
                <TD>{wins[seasonDriver.id]}</TD>
                <TD>{winsThisSeason[seasonDriver.id]}</TD>
                <TD>{seasonDriver.championships}</TD>
            </TR>
        )
    });

    const statistics = (
        <StatisticsTable>
            <tbody>
            <tr>
                <TH>Driver</TH>
                <TH>Podiums</TH>
                <TH>Podiums this season</TH>
                <TH>Poles</TH>
                <TH>Poles this season</TH>
                <TH>Wins</TH>
                <TH>Wins this season</TH>
                <TH>World Championships</TH>
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
