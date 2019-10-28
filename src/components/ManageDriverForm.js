import React from 'react';
import {Form, Label, Properties, Property, SubmitButton, Textarea} from "../sharedStyles";
import {connect} from "react-redux";
import styled from "styled-components";

declare var firebase;

const Select = styled.select`
    margin: 5px 0;
`;

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

            this.setState({
                "name": "",
                "team-id": "",
                "date-of-birth": "",
                "debut": "",
                "nationality": "",
                "number": "",
                "wins": "",
                "poles": "",
                "podiums": "",
                "championships": ""
            })
        }else {
            firebase.firestore().collection('drivers').doc(this.props.driverId).update({
                ...newDriverData
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
        }, () => {
            console.log(this.state);
        });
    };

    render() {
        const teamOptions = [{name: "Not selected", value: null}, ...this.props.teams].map((team, index) => {
            return (
                <option key={index} value={team.id}>{team.name}</option>
            );
        });

        return (
            <>
                <Form onSubmit={this.submitDriver}>
                    <Properties>
                        {/*Name*/}
                        <Property>
                            <Label htmlFor="name">Name</Label>
                            <Textarea
                                className="form-control"
                                placeholder="Name"
                                type="text"
                                rows="1"
                                id="name"
                                value={this.state['name']}
                                onChange={this.inputValuesChange}
                                required>
                            </Textarea>
                        </Property>
                        {/*Team*/}
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
                        {/*Birth year*/}
                        <Property>
                            <Label htmlFor="date-of-birth">Birth year</Label>
                            <Textarea
                                className="form-control"
                                placeholder="Birth year"
                                type="text"
                                rows="1"
                                id="date-of-birth"
                                value={this.state['date-of-birth']}
                                onChange={this.inputValuesChange}
                                required>
                            </Textarea>
                        </Property>
                        {/*Debut year*/}
                        <Property>
                            <Label htmlFor="debut">Debut year</Label>
                            <Textarea
                                className="form-control"
                                placeholder="Debut year"
                                type="text"
                                rows="1"
                                id="debut"
                                value={this.state['debut']}
                                onChange={this.inputValuesChange}
                                required>
                            </Textarea>
                        </Property>
                        {/*Nationality*/}
                        <Property>
                            <Label htmlFor="nationality">Nationality</Label>
                            <Textarea
                                className="form-control"
                                placeholder="Nationality"
                                type="text"
                                rows="1"
                                id="nationality"
                                value={this.state['nationality']}
                                onChange={this.inputValuesChange}
                                required>
                            </Textarea>
                        </Property>
                        {/*Car number*/}
                        <Property>
                            <Label htmlFor="number">Car number</Label>
                            <Textarea
                                className="form-control"
                                placeholder="Car number"
                                type="text"
                                rows="1"
                                id="number"
                                value={this.state['number']}
                                onChange={this.inputValuesChange}
                                required>
                            </Textarea>
                        </Property>
                        {/*Grand Prix wins*/}
                        <Property>
                            <Label htmlFor="wins">Grand Prix wins</Label>
                            <Textarea
                                className="form-control"
                                placeholder="Grand Prix wins"
                                type="text"
                                rows="1"
                                id="wins"
                                value={this.state['wins']}
                                onChange={this.inputValuesChange}
                                required>
                            </Textarea>
                        </Property>
                        {/*Pole positions*/}
                        <Property>
                            <Label htmlFor="poles">Pole positions</Label>
                            <Textarea
                                className="form-control"
                                placeholder="Pole positions"
                                type="text"
                                rows="1"
                                id="poles"
                                value={this.state['poles']}
                                onChange={this.inputValuesChange}
                                required>
                            </Textarea>
                        </Property>
                        {/*Podium places*/}
                        <Property>
                            <Label htmlFor="podiums">Podium places</Label>
                            <Textarea
                                className="form-control"
                                placeholder="Podium places"
                                type="text"
                                rows="1"
                                id="podiums"
                                value={this.state['podiums']}
                                onChange={this.inputValuesChange}
                                required>
                            </Textarea>
                        </Property>
                        {/*Championships*/}
                        <Property>
                            <Label htmlFor="championships">Championships</Label>
                            <Textarea
                                className="form-control"
                                placeholder="Championships"
                                type="text"
                                rows="1"
                                id="championships"
                                value={this.state['championships']}
                                onChange={this.inputValuesChange}
                                required>
                            </Textarea>
                        </Property>
                    </Properties>
                    <SubmitButton className="btn btn-warning">Submit</SubmitButton>
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
