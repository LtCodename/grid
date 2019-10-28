import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {AddButton, AddButtonWrapper, ComponentRestricted, Item} from "../SharedStyles";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

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
                        <Item className="btn">{season.name}</Item>
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
