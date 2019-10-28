import React from 'react';
import {Form, Label, Properties, Property, SubmitButton, Textarea} from "../sharedStyles";
import {connect} from "react-redux";

declare var firebase;

class ManageDriverForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.driver || {};
    }

    submitDriver = (event) => {
        event.preventDefault();
        //const newDriverData = this.state;

        if (this.props.mode === 'add') {
            /*firebase.firestore().collection('teams').add({
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
            })*/
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
                    </Properties>
                    <SubmitButton className="btn btn-warning">Submit</SubmitButton>
                </Form>
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        driver: state.drivers.find(driver => { return driver.id === props.driverId })
    }
};


const ManageDriverFormConnected = connect(mapStateToProps, null)(ManageDriverForm);

export default ManageDriverFormConnected;
