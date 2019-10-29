import React from 'react';
import {Form, Label, Properties, Property, SubmitButton, Textarea} from "../SharedStyles";
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

        return (
            <Form onSubmit={this.submitRace}>
                <Properties>
                    {properties}
                </Properties>
                <SubmitButton className="btn btn-warning">Submit</SubmitButton>
            </Form>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        race: state.races.find(race => {
            return race.id === props.raceId
        })
    }
};

const ManageRaceFormConnected = connect(mapStateToProps, null)(ManageRaceForm);

export default ManageRaceFormConnected;
