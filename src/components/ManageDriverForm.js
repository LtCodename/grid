import React from 'react';
import {Form, Label, Properties, Property, Select, SubmitButton, Textarea} from "../SharedStyles";
import {connect} from "react-redux";
import DriverEditBlueprint from "../blueprints/DriverEditBlueprint";

declare var firebase;

class ManageDriverForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.driver || {};
    }

    submitDriver = (event) => {
        event.preventDefault();
        const newDriverData = this.state;

        if (this.props.mode === 'add') {
            firebase.firestore().collection('drivers').add({
                ...newDriverData
            }).then(() => {

            });

            const cleanState = {"team-id": ""};
            DriverEditBlueprint.forEach(driver => {
                cleanState[driver.db] = "";
            });

            this.setState(cleanState);
        }else {
            firebase.firestore().collection('drivers').doc(this.props.driverId).update({
                ...newDriverData
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
            //console.log(this.state);
        });
    };

    render() {
        const teamOptions = [{name: "Not selected", value: null}, ...this.props.teams].map((team, index) => {
            return (
                <option key={index} value={team.id}>{team.name}</option>
            );
        });

        const properties = DriverEditBlueprint.map((elem, index) => {
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

        const team = (
          <>
              <Property>
                  <Label htmlFor="team-id">Team</Label>
                  <Select
                      value={this.state['team-id']}
                      id="team-id"
                      className="custom-select"
                      onChange={this.inputValuesChange}>
                      {teamOptions}
                  </Select>
              </Property>
          </>
        );

        return (
            <>
                <Form onSubmit={this.submitDriver}>
                    <Properties>
                        {properties}
                        {team}
                    </Properties>
                    <SubmitButton className="btn">Submit</SubmitButton>
                </Form>
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        driver: state.drivers.find(driver => { return driver.id === props.driverId }),
        teams: state.teams
    }
};


const ManageDriverFormConnected = connect(mapStateToProps, null)(ManageDriverForm);

export default ManageDriverFormConnected;
