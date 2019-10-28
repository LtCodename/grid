import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted} from "../SharedStyles";
import {connect} from "react-redux";

class SeasonPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <p>{this.props.season.name}</p>
                </ComponentRestricted>
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        season: state.seasons.find(season => {
            return season.id === props.match.params.season_id
        })
    }
};

const SeasonPageConnected = connect(mapStateToProps, null)(SeasonPage);

export default SeasonPageConnected;
