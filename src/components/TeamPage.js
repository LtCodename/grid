import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted} from "../sharedStyles";
import {connect} from "react-redux";
import styled from "styled-components";

const TeamInformationTable = styled.table`
    margin: 0 auto;
    width: 50%;
`;

class TeamPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamData: []
        };
    }

    componentDidMount() {
        this.getTeamData(this.props.match.params.team_id);
    }

    getTeamData = (teamId) => {
        const teamData = this.props.teams.find(team => {
            return team.id === teamId;
        });

        this.setState(
            {
                teamData
            }
        );
    };

    render() {
        const teamDataToDisplay = (
            <TeamInformationTable className="table teamInformationTable">
                <tbody>
                <tr>
                    <th scope="row">Team name</th>
                    <td className="makeItFlex">{this.state.teamData['name-full']}</td>
                </tr>
                <tr>
                    <th scope="row">Country</th>
                    <td className="makeItFlex">{this.state.teamData.country}</td>
                </tr>
                <tr>
                    <th scope="row">Debut year</th>
                    <td className="makeItFlex">{this.state.teamData['debut-year']}</td>
                </tr>
                <tr>
                    <th scope="row">Engine manufacturer</th>
                    <td className="makeItFlex">{this.state.teamData.engine}</td>
                </tr>
                <tr>
                    <th scope="row">Team principal</th>
                    <td className="makeItFlex">{this.state.teamData['team-principal']}</td>
                </tr>
                <tr>
                    <th scope="row">Constructors championships</th>
                    <td className="makeItFlex">{this.state.teamData['constructors-championships']}</td>
                </tr>
                <tr>
                    <th scope="row">Drivers championships</th>
                    <td className="makeItFlex">{this.state.teamData['drivers-championships']}</td>
                </tr>
                <tr>
                    <th scope="row">Wins</th>
                    <td className="makeItFlex">{this.state.teamData.wins}</td>
                </tr>
                <tr>
                    <th scope="row">Pole positions</th>
                    <td className="makeItFlex">{this.state.teamData.poles}</td>
                </tr>
                </tbody>
            </TeamInformationTable>
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    {teamDataToDisplay}
                </ComponentRestricted>
            </>
        )
    }
}

const mapStateToProps = (state = {}) => {
    return {
        teams: state.teams
    }
};


const TeamPageConnected = connect(mapStateToProps, null)(TeamPage);

export default TeamPageConnected;
