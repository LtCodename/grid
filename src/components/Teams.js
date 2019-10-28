import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {AddButton, AddButtonWrapper, ComponentRestricted} from "../sharedStyles";
import styled from "styled-components";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import ManageTeamForm from "./ManageTeamForm";

const TeamButton = styled.button`
    margin: 0;
    padding: 30px;
    cursor: pointer;
    margin: 0 5px 5px 0;
`;

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
                        <TeamButton className="btn">{team.name}</TeamButton>
                    </NavLink>
                )
            })
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <AddButtonWrapper>
                        <AddButton
                            className="btn btn-warning"
                            onClick={this.addTeam}>
                            {!this.state.addTeamMode ? "Add Team" : "Hide"}
                        </AddButton>
                    </AddButtonWrapper>
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
