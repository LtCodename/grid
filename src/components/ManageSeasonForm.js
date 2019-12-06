import React from 'react';
import {Form, Label, Properties, Property, SubmitButton, Textarea} from "../SharedStyles";
import {connect} from "react-redux";
import SeasonBlueprint from "../blueprints/SeasonBlueprint";
import fire from "../fire";

class ManageSeasonForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.season || {};
    }

    submitSeason = (event) => {
        event.preventDefault();
        const newSeasonData = this.state;

        if (this.props.mode === 'add') {
            fire.firestore().collection('seasons').add({
                ...newSeasonData
            }).then(() => {

            });

            const cleanState = {};
            SeasonBlueprint.forEach(season => {
                cleanState[season.db] = "";
            });

            this.setState(cleanState);
        }else {
            fire.firestore().collection('seasons').doc(this.props.seasonId).update({
                ...newSeasonData
            }).then(() => {
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
        const properties = SeasonBlueprint.map((elem, index) => {
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
            <Form onSubmit={this.submitSeason}>
                <Properties>
                    {properties}
                </Properties>
                <SubmitButton className="btn">Submit</SubmitButton>
            </Form>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        season: state.seasons.find(season => {
            return season.id === props.seasonId
        })
    }
};

const ManageSeasonFormConnected = connect(mapStateToProps, null)(ManageSeasonForm);

export default ManageSeasonFormConnected;
