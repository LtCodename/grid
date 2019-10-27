import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted} from "../sharedStyles";
import {connect} from "react-redux";
import styled from "styled-components";
import ManageTeamForm from "./ManageTeamForm";

const TeamInformationTable = styled.table`
    margin: 0 auto;
    width: 50%;
`;

const EditTeamButton = styled.button`
    margin: 0;
    padding: 5px;
    cursor: pointer;
    margin: 0 5px 5px 0;
`;

class TeamPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamData: [],
            editTeamMode: false
        };
    }

    onEditTeam = () => {
        if (!this.state.editTeamMode) {
            this.setState({
                editTeamMode: true
            })
        }else {
            this.setState({
                editTeamMode: false
            })
        }
    }

    render() {
        const teamDataToDisplay = (
            <TeamInformationTable className="table teamInformationTable">
                <tbody>
                <tr>
                    <th scope="row">Team name</th>
                    <td className="makeItFlex">{this.props.team['name-full']}</td>
                </tr>
                <tr>
                    <th scope="row">Country</th>
                    <td className="makeItFlex">{this.props.team.country}</td>
                </tr>
                <tr>
                    <th scope="row">Debut year</th>
                    <td className="makeItFlex">{this.props.team['debut-year']}</td>
                </tr>
                <tr>
                    <th scope="row">Engine manufacturer</th>
                    <td className="makeItFlex">{this.props.team.engine}</td>
                </tr>
                <tr>
                    <th scope="row">Team principal</th>
                    <td className="makeItFlex">{this.props.team['team-principal']}</td>
                </tr>
                <tr>
                    <th scope="row">Constructors championships</th>
                    <td className="makeItFlex">{this.props.team['constructors-championships']}</td>
                </tr>
                <tr>
                    <th scope="row">Drivers championships</th>
                    <td className="makeItFlex">{this.props.team['drivers-championships']}</td>
                </tr>
                <tr>
                    <th scope="row">Wins</th>
                    <td className="makeItFlex">{this.props.team.wins}</td>
                </tr>
                <tr>
                    <th scope="row">Pole positions</th>
                    <td className="makeItFlex">{this.props.team.poles}</td>
                </tr>
                </tbody>
            </TeamInformationTable>
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <EditTeamButton
                        className="btn btn-warning"
                        onClick={this.onEditTeam}>
                        {!this.state.editTeamMode ? "Edit Team" : "Hide"}
                    </EditTeamButton>
                    {this.state.editTeamMode ? <ManageTeamForm teamId={this.props.match.params.team_id} mode={'edit'}/> : teamDataToDisplay}
                </ComponentRestricted>
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        team: state.teams.find(team => { return team.id === props.match.params.team_id })
    }
};


const TeamPageConnected = connect(mapStateToProps, null)(TeamPage);

export default TeamPageConnected;
