import React from 'react';
import { Col } from "../../SharedStyles";
import { useStore } from "react-redux";
import DriverEditForm from "./DriverEditForm";
import DriverBlueprint from "../../blueprints/DriverBlueprint";
import styled from "styled-components";

const DriverTable = styled.table`
	color: #784d2b;
	border: none;
`;

const InfoTd = styled.td`
    border-bottom: 3px solid #774d2b;
    padding 0 2px;
`;

const InfoTh = styled.th`
    padding: 0 10px;
`;

const DriverName = styled.span`
	color: #784d2b;
    font-size: 24px;
    font-weight: 800;
	text-align: center;
	transition: opacity .2s ease-in-out;
`;

const DriverInfo = ({ driverId, editMode }) => {
    const store = useStore();
    const storeState = store.getState();
    const races = storeState.races;
    const drivers = storeState.drivers;

    const calculateWins = (driverData) => {
        let counter = 0;

        races.forEach(race => {
            if (race.places) {
                for (let i = 1; i <= 1; i++) {
                    if (race.places[i].driver === driverData.id) {
                        counter += 1;
                    }
                }
            }
        });

        counter += parseInt(driverData.wins);
        return counter;
    };

    const calculatePoles = (driverData) => {
        let counter = 0;

        races.forEach(race => {
            if (race.pole === driverData.id) {
                counter += 1;
            }
        });

        counter += parseInt(driverData.poles);
        return counter;
    };

    const calculatePodiums = (driverData) => {
        let counter = 0;

        races.forEach(race => {
            if (race.places) {
                for (let i = 1; i <= 3; i++) {
                    if (race.places[i].driver === driverData.id) {
                        counter += 1;
                    }
                }
            }
        });

        counter += parseInt(driverData.podiums);
        return counter;
    };

    const driver = (() => {
        const driverFromStore = storeState.drivers.find(driver => driver.id === driverId);
        const team = storeState.teams.find((team) => team.id === driverFromStore['team-id']);
        const date = new Date();
        const year = date.getFullYear();
        const age = year - driverFromStore['date-of-birth'];
        const inF1 = year - driverFromStore['debut'];

        const wins = calculateWins(driverFromStore);
        const poles = calculatePoles(driverFromStore);
        const podiums = calculatePodiums(driverFromStore);

        return {
            ...driverFromStore,
            'team-name': team ? team.name : 'Not selected',
            'wins': wins,
            'poles': poles,
            'podiums': podiums,
            age,
            inF1
        };
    })();

    const tableRows = DriverBlueprint.map((elem, index) => {
        if (elem.db !== 'name') {
            return (
                <tr key={index}>
                    <InfoTh scope="row">{elem.name}</InfoTh>
                    <InfoTd>{driver[elem.db]}</InfoTd>
                </tr>
            )
        }
        return <tr key={index} />;
    });

    const driverDataToDisplay = (
        <Col>
            <DriverName>{drivers.find(driver => driver.id === driverId).name}</DriverName>
            <DriverTable>
                <tbody>
                    {tableRows}
                </tbody>
            </DriverTable>
        </Col>
    );

    return (
        <>
            {editMode ? <DriverEditForm driverId={driverId} mode={'edit'}/> : driverDataToDisplay}
        </>
    )
};

export default DriverInfo;
