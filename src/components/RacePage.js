import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted, ActionButton, InformationTable, Wrapper} from "../SharedStyles";
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

        /* Pole Position */
        let poleDriver = '';
        if (this.props.race.pole) {
            poleDriver = this.props.drivers.find(driver=> {
                return driver.id === this.props.race.pole;
            });
        }

        const polePosition = (
            <tr>
                <th scope="row">Pole position</th>
                <td>{poleDriver.name}</td>
            </tr>
        );

        /* Fastest Lap */
        let lapDriver = '';
        if (this.props.race.lap) {
            lapDriver = this.props.drivers.find(driver=> {
                return driver.id === this.props.race.lap;
            });
        }

        const fastestLap = (
            <tr>
                <th scope="row">Fastest lap</th>
                <td>{lapDriver.name}</td>
            </tr>
        );

        /* All Race Data */
        const raceDataToDisplay = (
            <InformationTable className="table">
                <tbody>
                {tableRows}
                {this.props.race.pole ? polePosition : null}
                {this.props.race.lap ? fastestLap : null}
                </tbody>
            </InformationTable>
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <NavLink to={`/seasons/${this.props.match.params.season_id}`}>
                        <Wrapper>
                            <ActionButton
                                className="btn btn-warning">
                                {`Back to ${this.props.season.name}`}
                            </ActionButton>
                        </Wrapper>
                    </NavLink>
                    <ActionButton
                        className="btn btn-warning"
                        onClick={this.onEditRace}>
                        {!this.state.editRaceMode ? "Edit Grand Prix" : "Hide"}
                    </ActionButton>
                    <br/>
                    {this.state.editRaceMode ? <ManageRaceForm
                        raceId={this.props.match.params.race_id}
                        seasonId={this.props.match.params.season_id}
                        mode={'edit'}/> : raceDataToDisplay}
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
        }),
        drivers: state.drivers
    }
};

const RacePageConnected = connect(mapStateToProps, null)(RacePage);

export default RacePageConnected;
