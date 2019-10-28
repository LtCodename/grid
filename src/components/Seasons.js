import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {AddButton, AddButtonWrapper, ComponentRestricted} from "../sharedStyles";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import styled from "styled-components";

const SeasonButton = styled.button`
    margin: 0;
    padding: 30px;
    cursor: pointer;
    margin: 0 5px 5px 0;
`;

class Seasons extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addSeasonMode: false
        };
    }

    addSeason = () => {
        if (!this.state.addSeasonMode) {
            this.setState({
                addSeasonMode: true
            })
        }else {
            this.setState({
                addSeasonMode: false
            })
        }
    };

    render() {
        const seasonsToDisplay = (
            this.props.seasons.map((season, index) => {
                return (
                    <NavLink key={index} to={`/seasons/${season.id}`}>
                        <SeasonButton className="btn">{season.name}</SeasonButton>
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
                            onClick={this.addSeason}>
                            {!this.state.addSeasonMode ? "Add Season" : "Hide"}
                        </AddButton>
                    </AddButtonWrapper>
                    {seasonsToDisplay}
                </ComponentRestricted>
            </>
        )
    }
}

const mapStateToProps = (state = {}) => {
    return {
        seasons: state.seasons
    }
};

const SeasonsConnected = connect(mapStateToProps, null)(Seasons);

export default SeasonsConnected;
