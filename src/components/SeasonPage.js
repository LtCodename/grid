import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted, EditButton, InformationTable, Item} from "../SharedStyles";
import {connect} from "react-redux";
import ManageSeasonForm from "./ManageSeasonForm";
import SeasonBlueprint from "../blueprints/SeasonBlueprint";
import {NavLink} from "react-router-dom";

class SeasonPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editSeasonMode: false
        };
    }

    onEditSeason = () => {
        if (!this.state.editSeasonMode) {
            this.setState({
                editSeasonMode: true
            })
        }else {
            this.setState({
                editSeasonMode: false
            })
        }
    };

    render() {
        const tableRows = SeasonBlueprint.map((elem, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{elem.name}</th>
                    <td>{this.props.season[elem.db]}</td>
                </tr>
            )
        });

        const seasonDataToDisplay = (
            <InformationTable className="table">
                <tbody>
                {tableRows}
                </tbody>
            </InformationTable>
        );

        const racesToDisplay = (

            this.props.races.filter(r => {
                return (
                    r['season-id'] === this.props.match.params.season_id
                )
            }).map((race, index) => {
                return (
                    <NavLink key={index} to={`/races/${race.id}`}>
                        <Item className="btn">{race.name}</Item>
                    </NavLink>
                )
            })
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <EditButton
                        className="btn btn-warning"
                        onClick={this.onEditSeason}>
                        {!this.state.editSeasonMode ? "Edit Season" : "Hide"}
                    </EditButton>
                    {this.state.editSeasonMode ? <ManageSeasonForm seasonId={this.props.match.params.season_id} mode={'edit'}/> : seasonDataToDisplay}
                    {racesToDisplay}
                </ComponentRestricted>
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        season: state.seasons.find(season => {
            return season.id === props.match.params.season_id
        }),
        races: state.races
    }
};

const SeasonPageConnected = connect(mapStateToProps, null)(SeasonPage);

export default SeasonPageConnected;
