import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted, EditButton, InformationTable} from "../SharedStyles";
import {connect} from "react-redux";
import RaceBlueprint from "../blueprints/RaceBlueprint";
import {NavLink} from "react-router-dom";
import ManageRaceForm from "./ManageRaceForm";

class RacePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editRaceMode: false
        };
    }

    onEditRace = () => {
        if (!this.state.editRaceMode) {
            this.setState({
                editRaceMode: true
            })
        }else {
            this.setState({
                editRaceMode: false
            })
        }
    };

    render() {
        const tableRows = RaceBlueprint.map((elem, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{elem.name}</th>
                    <td>{this.props.race[elem.db]}</td>
                </tr>
            )
        });

        const raceDataToDisplay = (
            <InformationTable className="table">
                <tbody>
                {tableRows}
                </tbody>
            </InformationTable>
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <NavLink to={`/seasons/${this.props.match.params.season_id}`}>
                        <EditButton
                            className="btn btn-warning">
                            {`Back to ${this.props.season.name}`}
                        </EditButton>
                    </NavLink>
                    <br/>
                    <EditButton
                        className="btn btn-warning"
                        onClick={this.onEditRace}>
                        {!this.state.editRaceMode ? "Edit Race" : "Hide"}
                    </EditButton>
                    <br/>
                    {this.state.editRaceMode ? <ManageRaceForm raceId={this.props.match.params.race_id} mode={'edit'}/> : raceDataToDisplay}
                </ComponentRestricted>
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        race: state.races.find(race => {
            return race.id === props.match.params.race_id
        }),
        season: state.seasons.find(season => {
            return season.id === props.match.params.season_id
        })
    }
};

const RacePageConnected = connect(mapStateToProps, null)(RacePage);

export default RacePageConnected;
