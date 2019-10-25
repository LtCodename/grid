import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted} from "../sharedStyles";
import {connect} from "react-redux";

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
        console.log(this.props.teams)
        const teamData = this.props.teams.filter(team => {
            return team.id === teamId;
        });

        this.setState(
            {
                teamData
            }, () => {
                //console.log(this.state.teamData)
            }
        );
    };

    render() {
        const teamDataToDisplay = (
            this.state.teamData.map((elem, index) => {
                return (
                    <p key={index}>Bla</p>
                )
            })
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <p>{`Team Name: ${this.props.match.params.team_id}`}</p>
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
