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
        const blueprint = [
            {
                name: "Team name", dbName: "name-full"
            },
            {
                name: "Country", dbName: "country"
            },
            {
                name: "Debut year", dbName: "debut-year"
            },
            {
                name: "Engine manufacturer", dbName: "engine"
            },
            {
                name: "Team principal", dbName: "team-principal"
            },
            {
                name: "Constructors championships", dbName: "constructors-championships"
            },
            {
                name: "Drivers championships", dbName: "drivers-championships"
            },
            {
                name: "Grand Prix wins", dbName: "wins"
            },
            {
                name: "Pole positions", dbName: "poles"
            }
        ];

        const tableRows = blueprint.map((elem, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{elem.name}</th>
                    <td>{this.props.team[elem.dbName]}</td>
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
