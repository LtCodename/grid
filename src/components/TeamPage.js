import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted, EditButton, InformationTable} from "../sharedStyles";
import {connect} from "react-redux";
import ManageTeamForm from "./ManageTeamForm";

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
    };

    render() {
        const teamDataToDisplay = (
            <InformationTable className="table">
                <tbody>
                    <tr>
                        <th scope="row">Team name</th>
                        <td>{this.props.team['name-full']}</td>
                    </tr>
                    <tr>
                        <th scope="row">Country</th>
                        <td>{this.props.team.country}</td>
                    </tr>
                    <tr>
                        <th scope="row">Debut year</th>
                        <td>{this.props.team['debut-year']}</td>
                    </tr>
                    <tr>
                        <th scope="row">Engine manufacturer</th>
                        <td>{this.props.team.engine}</td>
                    </tr>
                    <tr>
                        <th scope="row">Team principal</th>
                        <td>{this.props.team['team-principal']}</td>
                    </tr>
                    <tr>
                        <th scope="row">Constructors championships</th>
                        <td>{this.props.team['constructors-championships']}</td>
                    </tr>
                    <tr>
                        <th scope="row">Drivers championships</th>
                        <td>{this.props.team['drivers-championships']}</td>
                    </tr>
                    <tr>
                        <th scope="row">Wins</th>
                        <td>{this.props.team.wins}</td>
                    </tr>
                    <tr>
                        <th scope="row">Pole positions</th>
                        <td>{this.props.team.poles}</td>
                    </tr>
                </tbody>
            </InformationTable>
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <EditButton
                        className="btn btn-warning"
                        onClick={this.onEditTeam}>
                        {!this.state.editTeamMode ? "Edit Team" : "Hide"}
                    </EditButton>
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
