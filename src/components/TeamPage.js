import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted, ActionButton, InformationTable} from "../SharedStyles";
import {connect} from "react-redux";
import ManageTeamForm from "./ManageTeamForm";
import TeamBlueprint from "../blueprints/TeamBlueprint";

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
        const tableRows = TeamBlueprint.map((elem, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{elem.name}</th>
                    <td>{this.props.team[elem.db]}</td>
                </tr>
            )
        });

        const teamDataToDisplay = (
            <InformationTable className="table">
                <tbody>
                    {tableRows}
                </tbody>
            </InformationTable>
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <ActionButton
                        className="btn btn-warning"
                        onClick={this.onEditTeam}>
                        {!this.state.editTeamMode ? "Edit Team" : "Hide"}
                    </ActionButton>
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
