import React from 'react';
import {Form, Label, Properties, Property, SubmitButton, Textarea} from "../SharedStyles";
import {connect} from "react-redux";
import TeamEditBlueprint from "../blueprints/TeamEditBlueprint";

declare var firebase;

class ManageTeamForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.team || {};
    }

    submitTeam = (event) => {
        event.preventDefault();
        const newTeamData = this.state;

        if (this.props.mode === 'add') {
            firebase.firestore().collection('teams').add({
                ...newTeamData
            }).then(() => {

            });

            const cleanState = {};
            TeamEditBlueprint.forEach(team => {
                cleanState[team.db] = "";
            });

            this.setState(cleanState);
        }else {
            firebase.firestore().collection('teams').doc(this.props.teamId).update({
                ...newTeamData
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
        const properties = TeamEditBlueprint.map((elem, index) => {
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
            <Form onSubmit={this.submitTeam}>
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
        team: state.teams.find(team => { return team.id === props.teamId })
    }
};


const ManageTeamFormConnected = connect(mapStateToProps, null)(ManageTeamForm);

export default ManageTeamFormConnected;
