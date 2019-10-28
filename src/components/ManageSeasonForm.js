import React from 'react';
import {Form, Label, Properties, Property, SubmitButton, Textarea} from "../SharedStyles";
import {connect} from "react-redux";
import SeasonBlueprint from "../blueprints/SeasonBlueprint";

declare var firebase;

class ManageSeasonForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.season || {};
    }

    submitSeason = (event) => {
        event.preventDefault();
        const newSeasonData = this.state;

        if (this.props.mode === 'add') {
            firebase.firestore().collection('seasons').add({
                ...newSeasonData
            }).then(() => {

            });

            this.setState({
                "name": "",
            })
        }else {
            /*firebase.firestore().collection('teams').doc(this.props.teamId).update({
                ...newTeamData
            }).then((data) => {
                console.log("Team data updated successfully!");
            }).catch(error => {
                console.log(error.message);
            });*/
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
                <SubmitButton className="btn btn-warning">Submit</SubmitButton>
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
