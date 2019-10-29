import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ActionButton, ComponentRestricted, Item, Wrapper} from "../SharedStyles";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import ManageSeasonForm from "./ManageSeasonForm";

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
                    <Wrapper>
                        <ActionButton
                            className="btn btn-warning"
                            onClick={this.addSeason}>
                            {!this.state.addSeasonMode ? "Add Season" : "Hide"}
                        </ActionButton>
                    </Wrapper>
                    {this.state.addSeasonMode ? <ManageSeasonForm mode={'add'}/> : ""}
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
