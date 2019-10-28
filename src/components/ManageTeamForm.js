import React from 'react';
import {Form, Label, Properties, Property, SubmitButton, Textarea} from "../sharedStyles";
import {connect} from "react-redux";

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

            this.setState({
                "constructors-championships": "",
                "country": "",
                "debut-year": "",
                "drivers-championships": "",
                "engine": "",
                "name": "",
                "name-full": "",
                "poles": "",
                "team-principal": "",
                "wins": ""
            })
        }else {
            firebase.firestore().collection('teams').doc(this.props.teamId).update({
                ...newTeamData
            }).then((data) => {
                console.log("Team data updated successfully!");
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
        const blueprint = [
            {
                name: "Full name", dbName: "name-full"
            },
            {
                name: "Short name", dbName: "name"
            },
            {
                name: "Country", dbName: "country"
            },
            {
                name: "Debut year", dbName: "debut-year"
            },
            {
                name: "Engine manufacturer", dbName: "engine"
            },
            {
                name: "Team principal", dbName: "team-principal"
            },
            {
                name: "Constructors championships", dbName: "constructors-championships"
            },
            {
                name: "Drivers championships", dbName: "drivers-championships"
            },
            {
                name: "Grand Prix wins", dbName: "wins"
            },
            {
                name: "Pole positions", dbName: "poles"
            }
        ];

        const properties = blueprint.map((elem, index) => {
            return (
                <Property>
                    <Label htmlFor={elem.dbName}>{elem.name}</Label>
                    <Textarea
                        className="form-control"
                        placeholder={elem.name}
                        type="text"
                        rows="1"
                        id={elem.dbName}
                        value={this.state[elem.dbName]}
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
