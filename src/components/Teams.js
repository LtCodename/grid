import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted} from "../sharedStyles";
import styled from "styled-components";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import AddTeamForm from "./AddTeamForm";

const TeamButton = styled.button`
    margin: 0;
    padding: 30px;
    cursor: pointer;
    margin: 0 5px 5px 0;
`;

const AddTeamButtonWrapper = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const AddTeamButton = styled.button`
    margin: 0;
    padding: 5px;
    cursor: pointer;
    margin: 0 5px 0 0;
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
        //console.log(this.props.teams);
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
                    <AddTeamButtonWrapper>
                        <AddTeamButton
                            className="btn btn-warning"
                            onClick={this.addTeam}>
                            {!this.state.addTeamMode ? "Add Team" : "Hide"}
                        </AddTeamButton>
                    </AddTeamButtonWrapper>

                    {this.state.addTeamMode ? <AddTeamForm/> : ""}
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
