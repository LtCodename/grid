import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { ComponentRestricted, ActionButton, InformationTable, TR, TH, TD } from "../SharedStyles";
import ManageTeamForm from "./ManageTeamForm";
import TeamBlueprint from "../blueprints/TeamBlueprint";
import { useStore } from 'react-redux';
import { withRouter } from "react-router";

const TeamPage = ({...otherProps}) => {
    const [editTeamMode, changeEditTeamMode] = useState(false);

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
        const teamFromStore = storeState.teams.find(team => team.id === otherProps.match.params.team_id);
        const wins = calculateWins(teamFromStore);
        const poles = calculatePoles(teamFromStore);

        return {
            ...teamFromStore,
            'wins': wins,
            'poles': poles
        };
    })();

    const onEditTeam = () => {
        changeEditTeamMode(!editTeamMode);
    };

    const tableRows = TeamBlueprint.map((elem, index) => {
        return (
            <TR key={index}>
                <TH scope="row">{elem.name}</TH>
                <TD>{team[elem.db]}</TD>
            </TR>
        )
    });

    const teamDataToDisplay = (
        <InformationTable>
            <tbody>
            {tableRows}
            </tbody>
        </InformationTable>
    );

    return (
        <>
            <NavigationPanel/>
            <ComponentRestricted>
                <div>
                    {editTeamMode ? <ManageTeamForm teamId={otherProps.match.params.team_id} mode={'edit'}/> : teamDataToDisplay}
                </div>
                <ActionButton
                    onClick={onEditTeam}>
                    {!editTeamMode ? "Edit Team" : "Hide"}
                </ActionButton>
            </ComponentRestricted>
        </>
    )
};

export default withRouter(TeamPage);
