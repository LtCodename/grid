import React from 'react';
import styled from "styled-components";
import {connect} from "react-redux";

declare var firebase;

const Form = styled.form`
    padding: 10px 0;
`;

const Textarea = styled.textarea`
    margin: 5px 0;
    resize: none;
`;

const Label = styled.label`
    margin: 0;
    padding: 0;
`;

const Property = styled.div`
    
`;

const SubmitButton = styled.button`
    margin: 5px auto;
`;

const Properties = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
`;

class EditTeamForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.team;
    }

    updateTeam = (event) => {
        event.preventDefault();
        const newTeamData = this.state;
        firebase.firestore().collection('teams').doc(this.props.teamId).update({
            ...newTeamData
        }).then((data) => {
            console.log("Team data updated successfully!");
        }).catch(error => {
            console.log(error.message);
        });
    };

    inputValuesChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    render() {
        const form = (
            <Form id="loginForm" onSubmit={this.updateTeam}>
                <Properties>
                    {/*Full Name*/}
                    <Property>
                        <Label htmlFor="name-full">Full Name</Label>
                        <Textarea
                            className="form-control"
                            placeholder="Full Name"
                            type="text"
                            rows="1"
                            id="name-full"
                            value={this.state['name-full']}
                            onChange={this.inputValuesChange}
                            required>
                        </Textarea>
                    </Property>
                    {/*Short Name*/}
                    <Property>
                        <Label htmlFor="name">Short Name</Label>
                        <Textarea
                            className="form-control"
                            placeholder="Short Name"
                            type="text"
                            rows="1"
                            id="name"
                            value={this.state.name}
                            onChange={this.inputValuesChange}
                            required>
                        </Textarea>
                    </Property>
                    {/*Country*/}
                    <Property>
                        <Label htmlFor="country">Country</Label>
                        <Textarea
                            className="form-control"
                            placeholder="Country"
                            type="text"
                            rows="1"
                            id="country"
                            value={this.state.country}
                            onChange={this.inputValuesChange}
                            required>
                        </Textarea>
                    </Property>
                    {/*Debut Year*/}
                    <Property>
                        <Label htmlFor="debut-year">Debut Year</Label>
                        <Textarea
                            className="form-control"
                            placeholder="Debut Year"
                            type="text"
                            rows="1"
                            id="debut-year"
                            value={this.state['debut-year']}
                            onChange={this.inputValuesChange}
                            required>
                        </Textarea>
                    </Property>
                    {/*Engine Manufacturer*/}
                    <Property>
                        <Label htmlFor="engine">Engine Manufacturer</Label>
                        <Textarea
                            className="form-control"
                            placeholder="Engine Manufacturer"
                            type="text"
                            rows="1"
                            id="engine"
                            value={this.state.engine}
                            onChange={this.inputValuesChange}
                            required>
                        </Textarea>
                    </Property>
                    {/*Team Principal*/}
                    <Property>
                        <Label htmlFor="team-principal">Team Principal</Label>
                        <Textarea
                            className="form-control"
                            placeholder="Team Principal"
                            type="text"
                            rows="1"
                            id="team-principal"
                            value={this.state['team-principal']}
                            onChange={this.inputValuesChange}
                            required>
                        </Textarea>
                    </Property>
                    {/*Constructors Championships*/}
                    <Property>
                        <Label htmlFor="constructors-championships">Constructors Championships</Label>
                        <Textarea
                            className="form-control"
                            placeholder="Constructors Championships"
                            type="text"
                            rows="1"
                            id="constructors-championships"
                            value={this.state['constructors-championships']}
                            onChange={this.inputValuesChange}
                            required>
                        </Textarea>
                    </Property>
                    {/*Drivers Championships*/}
                    <Property>
                        <Label htmlFor="drivers-championships">Drivers Championships</Label>
                        <Textarea
                            className="form-control"
                            placeholder="Drivers Championships"
                            type="text"
                            rows="1"
                            id="drivers-championships"
                            value={this.state['drivers-championships']}
                            onChange={this.inputValuesChange}
                            required>
                        </Textarea>
                    </Property>
                    {/*Wins*/}
                    <Property>
                        <Label htmlFor="wins">Wins</Label>
                        <Textarea
                            className="form-control"
                            placeholder="Wins"
                            type="text"
                            rows="1"
                            id="wins"
                            value={this.state.wins}
                            onChange={this.inputValuesChange}
                            required>
                        </Textarea>
                    </Property>
                    {/*Pole Positions*/}
                    <Property>
                        <Label htmlFor="poles">Pole Positions</Label>
                        <Textarea
                            className="form-control"
                            placeholder="Pole Positions"
                            type="text"
                            rows="1"
                            id="poles"
                            value={this.state.poles}
                            onChange={this.inputValuesChange}
                            required>
                        </Textarea>
                    </Property>
                </Properties>
                <SubmitButton className="btn btn-warning">Submit</SubmitButton>
            </Form>
        );

        return (
            <>
                {form}
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        team: state.teams.find(team => { return team.id === props.teamId })
    }
};


const EditTeamFormConnected = connect(mapStateToProps, null)(EditTeamForm);

export default EditTeamFormConnected;
