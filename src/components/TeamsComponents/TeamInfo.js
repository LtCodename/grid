import React from 'react';
import { InformationTable, Col } from "../../SharedStyles";
import ManageTeamForm from "./TeamEditForm";
import TeamBlueprint from "../../blueprints/TeamBlueprint";
import { useStore } from 'react-redux';
import styled from "styled-components";

const InfoColumn = styled(Col)`
    align-items: center;
`;

const TeamInfoTable = styled(InformationTable)`
    margin:0px 10px 20px 10px;
`;

const InfoTh = styled.th`
    padding: 0 10px;
`;

const InfoTd = styled.td`
    border-bottom: 3px solid #774d2b;
`;

const TeamInfo = ({ teamId, editMode }) => {
    const store = useStore();
    const storeState = store.getState();
    const races = storeState.races;

    const calculateWins = (teamData) => {
        let counter = 0;

        races.forEach(race => {
            if (race.places) {
                for (let i = 1; i <= 1; i++) {
                    if (race.places[i].team === teamData.id) {
                        counter += 1;
                    }
                }
            }
        });

        counter += parseInt(teamData.wins);
        return counter;
    };

    const calculatePoles = (teamData) => {
        let counter = 0;

        races.forEach(race => {
            if (race.pole) {
                const driverInfo = storeState.drivers.find(driver => driver.id === race.pole);
                if (teamData.id === driverInfo['team-id']) {
                    counter += 1;
                }
            }
        });

        counter += parseInt(teamData.poles);
        return counter;
    };

    const team = (() => {
        //console.log(teamId);
        const teamFromStore = storeState.teams.find(team => team.id === teamId);
        const wins = calculateWins(teamFromStore);
        const poles = calculatePoles(teamFromStore);

        return {
            ...teamFromStore,
            'wins': wins,
            'poles': poles
        };
    })();

    const tableRows = TeamBlueprint.map((elem, index) => {
        return (
            <tr key={index}>
                <InfoTh scope="row">{elem.name}</InfoTh>
                <InfoTd>{team[elem.db]}</InfoTd>
            </tr>
        )
    });

    const teamDataToDisplay = (
        <TeamInfoTable>
            <tbody>
                {tableRows}
            </tbody>
        </TeamInfoTable>
    );

    return (
        <InfoColumn>
            <div>
                {editMode ? <ManageTeamForm teamId={teamId} mode={'edit'}/> : teamDataToDisplay}
            </div>
        </InfoColumn>
    )
};

export default TeamInfo;
