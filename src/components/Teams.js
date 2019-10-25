import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted} from "../sharedStyles";
import styled from "styled-components";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

const TeamButton = styled.button`
    margin: 0;
    padding: 30px;
    cursor: pointer;
    margin: 0 5px;
`;

class Teams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

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
