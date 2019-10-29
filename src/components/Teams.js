import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import ManageTeamForm from "./ManageTeamForm";
import {ActionButton, ButtonWrapper, ComponentRestricted, Item} from "../SharedStyles";

class Teams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addTeamMode: false
        };
    }

    addTeam = () => {
        if (!this.state.addTeamMode) {
            this.setState({
                addTeamMode: true
            })
        }else {
            this.setState({
                addTeamMode: false
            })
        }
    };

    render() {
        const teamsToDisplay = (
            this.props.teams.map((team, index) => {
                return (
                    <NavLink key={index} to={`/teams/${team.id}`}>
                        <Item className="btn">{team.name}</Item>
                    </NavLink>
                )
            })
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <ButtonWrapper>
                        <ActionButton
                            className="btn btn-warning"
                            onClick={this.addTeam}>
                            {!this.state.addTeamMode ? "Add Team" : "Hide"}
                        </ActionButton>
                    </ButtonWrapper>
                    {this.state.addTeamMode ? <ManageTeamForm mode={'add'}/> : ""}
                    {teamsToDisplay}
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

const TeamsConnected = connect(mapStateToProps, null)(Teams);

export default TeamsConnected;
