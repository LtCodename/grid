import React, { useEffect, useState } from 'react';
import { useStore } from "react-redux";
import { TR, TD, TH, Row, Col } from "../../SharedStyles";
import styled from "styled-components";

const StatisticsTable = styled.table`
    margin: 0 auto 10px auto;
    color: #784d2b;
`;

const Name = styled.span`
    font-weight: 900;
`;

const SVG = styled.svg`
    height: 30px;
    fill: ${props => {
        return ((props.id === props.fltr) ? 'green' : '#784d2b')
    }};
`;

const StatColumn = styled(Col)`
    align-items: center;
`;

const StatTH = styled(TH)`
    padding: 0;
    background: #fde3a6;
    :not(:last-child) {
        border-right: 1px solid #784d2b;
    }
`;

const ButtonTH = styled.button`
    padding: 0 10px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: #784d2b;
    font-weight: ${props => {
        return ((props.id === props.fltr) ? 900 : 500)
    }};
    :focus, :hover {
		outline: none;
	}
	@media (max-width: 736px) {
		padding: 0 2px;
		font-size: 14px;
	}
`;

const FilterButton = styled.button`
    padding: 0;
    margin: 0 5px 5px 5px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    :focus, :hover {
		outline: none;
	}
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
    const [filter, setFilter] = useState('name');
    const [filtering, setFiltering] = useState('asc');

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

        races.forEach(race => {
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

        races.forEach(race => {
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

        races.forEach(race => {
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

        const nameToArray = seasonDriver['name'].split(' ');
        const lastName = nameToArray[1];
        const shortName = lastName.slice(0, 3).toUpperCase();

        return {
            name: shortName,
            podiums: (podiums[seasonDriver.id] === 0) ? '' : podiums[seasonDriver.id],
            podiumsThisSeason: podiumsThisSeason[seasonDriver.id],
            poles: (poles[seasonDriver.id] === 0) ? '' : poles[seasonDriver.id],
            polesThisSeason: polesThisSeason[seasonDriver.id],
            wins: (wins[seasonDriver.id] === 0) ? '' : wins[seasonDriver.id],
            winsThisSeason: winsThisSeason[seasonDriver.id],
            dc: (seasonDriver.championships === '0') ? '' : seasonDriver.championships
        }
    }).sort((a, b) => {
        const elemA = a[filter];
        const elemB = b[filter];

        let modifiedA = (filter !== 'name') ? parseInt(elemA) : elemA;
        let modifiedB = (filter !== 'name') ? parseInt(elemB) : elemB;

        if (isNaN(modifiedA) && filter !== 'name') modifiedA = 0;
        if (isNaN(modifiedB) && filter !== 'name') modifiedB = 0;

        if (modifiedA < modifiedB) {
            return (filtering === 'asc') ? -1 : 1;
        }
        if (modifiedA > modifiedB) {
            return (filtering === 'asc') ? 1 : -1;
        }
        return 0;
    }).map((elem, index) => {
        return (
            <TR key={index}>
                <TD><Name>{elem.name}</Name></TD>
                <TD>{elem.podiums}</TD>
                <TD>{elem.podiumsThisSeason}</TD>
                <TD>{elem.poles}</TD>
                <TD>{elem.polesThisSeason}</TD>
                <TD>{elem.wins}</TD>
                <TD>{elem.winsThisSeason}</TD>
                <TD>{elem.dc}</TD>
            </TR>
        )
    });

    const onFilterClick = (event) => {
        setFilter(event.target.id);
    };

    const onFilteringUpClick = () => {
        setFiltering('asc');
    };

    const onFilteringDownClick = () => {
        setFiltering('desc');
    };

    const filterButton = (
        <Row>
            <FilterButton onClick={onFilteringUpClick}>
                <SVG id={'asc'} fltr={filtering} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-square-up"
                     role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M0 432V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48zm355.515-140.485l-123.03-123.03c-4.686-4.686-12.284-4.686-16.971 0L92.485 291.515c-7.56 7.56-2.206 20.485 8.485 20.485h246.059c10.691 0 16.045-12.926 8.486-20.485z"/>
                </SVG>
            </FilterButton>
            <FilterButton onClick={onFilteringDownClick}>
                <SVG id={'desc'} fltr={filtering} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-square-down"
                     role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zM92.5 220.5l123 123c4.7 4.7 12.3 4.7 17 0l123-123c7.6-7.6 2.2-20.5-8.5-20.5H101c-10.7 0-16.1 12.9-8.5 20.5z"/>
                </SVG>
            </FilterButton>
        </Row>
    );

    const statistics = (
        <StatisticsTable>
            <tbody>
            <TR>
                <StatTH>
                    <ButtonTH
                        id={'name'}
                        fltr={filter}
                        onClick={onFilterClick}>
                        Driver</ButtonTH>
                </StatTH>
                <StatTH>
                    <ButtonTH
                        id={'podiums'}
                        fltr={filter}
                        onClick={onFilterClick}>
                        Podiums</ButtonTH>
                </StatTH>
                <StatTH>
                    <ButtonTH
                        id={'podiumsThisSeason'}
                        fltr={filter}
                        onClick={onFilterClick}>
                        Season</ButtonTH>
                </StatTH>
                <StatTH>
                    <ButtonTH
                        id={'poles'}
                        fltr={filter}
                        onClick={onFilterClick}>
                        Poles</ButtonTH>
                </StatTH>
                <StatTH>
                    <ButtonTH
                        id={'polesThisSeason'}
                        fltr={filter}
                        onClick={onFilterClick}>
                        Season</ButtonTH>
                </StatTH>
                <StatTH>
                    <ButtonTH
                        id={'wins'}
                        fltr={filter}
                        onClick={onFilterClick}>
                        Wins</ButtonTH>
                </StatTH>
                <StatTH>
                    <ButtonTH
                        id={'winsThisSeason'}
                        fltr={filter}
                        onClick={onFilterClick}>
                        Season</ButtonTH>
                </StatTH>
                <StatTH>
                    <ButtonTH
                        id={'dc'}
                        fltr={filter}
                        onClick={onFilterClick}>
                        Champ</ButtonTH>
                </StatTH>
            </TR>
            {tableRows}
            </tbody>
        </StatisticsTable>
    );

    return (
        <StatColumn>
            {filterButton}
            {statistics}
        </StatColumn>
    )
};

export default Statistics;
