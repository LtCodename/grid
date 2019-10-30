import React from 'react';
import {Form, Label, Properties, Property, Select, SubmitButton, Textarea} from "../SharedStyles";
import {connect} from "react-redux";
import RaceBlueprint from "../blueprints/RaceBlueprint";

declare var firebase;

class ManageRaceForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.race || {};
    }

    submitRace = (event) => {
        event.preventDefault();
        const newRaceData = this.state;

        if (this.props.mode === 'add') {

            newRaceData['season-id'] = this.props.seasonId;
            firebase.firestore().collection('races').add({
                ...newRaceData
            }).then(() => {

            });

            const cleanState = {};
            RaceBlueprint.forEach(race => {
                cleanState[race.db] = "";
            });

            this.setState(cleanState);
        }else {
            firebase.firestore().collection('races').doc(this.props.raceId).update({
                ...newRaceData
            }).then((data) => {
                console.log("Data updated successfully!");
            }).catch(error => {
                console.log(error.message);
            });
        }
    };

    inputValuesChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        }, () => {
            console.log(this.state);
        });
    };

    render() {
        const properties = RaceBlueprint.map((elem, index) => {
            return (
                <Property key={index}>
                    <Label htmlFor={elem.db}>{elem.name}</Label>
                    <Textarea
                        className="form-control"
                        placeholder={elem.name}
                        type="text"
                        rows="1"
                        id={elem.db}
                        value={this.state[elem.db]}
                        onChange={this.inputValuesChange}
                        required>
                    </Textarea>
                </Property>
            )
        });
        /* Pole Position Select */
        let poleOptions;
        if (this.props.season.drivers) {
            poleOptions = ["Not selected", ...this.props.season.drivers].map((driver, index) => {
                let seasonDriver = {name: "Not selected"};
                if (driver !== "Not selected") {
                    seasonDriver = this.props.drivers.find(dr => {
                        return dr.id === driver;
                    });
                }
                return (
                    <option key={index} value={driver}>{seasonDriver.name}</option>
                );
            });
        }

        const pole = (
            <>
                <Property>
                    <Label htmlFor="pole">Pole position</Label>
                    <Select
                        value={this.state['pole']}
                        id="pole"
                        className="custom-select"
                        onChange={this.inputValuesChange}>
                        {poleOptions}
                    </Select>
                </Property>
            </>
        );

        /* Fastest Lap Select */
        let fastestLapOptions;
        if (this.props.season.drivers) {
            fastestLapOptions = ["Not selected", ...this.props.season.drivers].map((driver, index) => {
                let seasonDriver = {name: "Not selected"};
                if (driver !== "Not selected") {
                    seasonDriver = this.props.drivers.find(dr => {
                        return dr.id === driver;
                    });
                }
                return (
                    <option key={index} value={driver}>{seasonDriver.name}</option>
                );
            });
        }

        const fastestLap = (
            <>
                <Property>
                    <Label htmlFor="lap">Fastest lap</Label>
                    <Select
                        value={this.state['lap']}
                        id="lap"
                        className="custom-select"
                        onChange={this.inputValuesChange}>
                        {fastestLapOptions}
                    </Select>
                </Property>
            </>
        );

        return (
            <Form onSubmit={this.submitRace}>
                <Properties>
                    {properties}
                    {this.props.season.drivers ? pole : ''}
                    {this.props.season.drivers ? fastestLap : ''}
                </Properties>
                <SubmitButton className="btn">Submit</SubmitButton>
            </Form>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        race: state.races.find(race => {
            return race.id === props.raceId
        }),
        season: state.seasons.find(season => {
            return season.id === props.seasonId
        }),
        drivers: state.drivers
    }
};

const ManageRaceFormConnected = connect(mapStateToProps, null)(ManageRaceForm);

export default ManageRaceFormConnected;
