import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted, EditButton, InformationTable} from "../sharedStyles";
import {connect} from "react-redux";
import ManageDriverForm from "./ManageDriverForm";

class DriverPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editDriverMode: false
        };
    }

    onEditDriver = () => {
        if (!this.state.editDriverMode) {
            this.setState({
                editDriverMode: true
            })
        }else {
            this.setState({
                editDriverMode: false
            })
        }
    };

    render() {
        const date = new Date();
        const year = date.getFullYear();

        let teamsObject = {};
        for (let i = 0; i < this.props.teams.length; i++) {
            teamsObject[this.props.teams[i].id] = this.props.teams[i].name;
        }

        const driverDataToDisplay = (
            <InformationTable className="table">
                <tbody>
                    <tr>
                        <th scope="row">Name</th>
                        <td>{this.props.driver['name']}</td>
                    </tr>
                    <tr>
                        <th scope="row">Team</th>
                        <td>{this.props.driver['team-id'] ? teamsObject[this.props.driver['team-id']] : "Not selected"}</td>
                    </tr>
                    <tr>
                        <th scope="row">Age</th>
                        <td>{year - this.props.driver['date-of-birth']}</td>
                    </tr>
                    <tr>
                        <th scope="row">In F1</th>
                        <td>{year - this.props.driver['debut']}</td>
                    </tr>
                    <tr>
                        <th scope="row">Nationality</th>
                        <td>{this.props.driver['nationality']}</td>
                    </tr>
                    <tr>
                        <th scope="row">Car number</th>
                        <td>{this.props.driver['number']}</td>
                    </tr>
                    <tr>
                        <th scope="row">Grand Prix wins</th>
                        <td>{this.props.driver['wins']}</td>
                    </tr>
                    <tr>
                        <th scope="row">Pole positions</th>
                        <td>{this.props.driver['poles']}</td>
                    </tr>
                    <tr>
                        <th scope="row">Podium places</th>
                        <td>{this.props.driver['podiums']}</td>
                    </tr>
                    <tr>
                        <th scope="row">Championships</th>
                        <td>{this.props.driver['championships']}</td>
                    </tr>
                </tbody>
            </InformationTable>
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <EditButton
                        className="btn btn-warning"
                        onClick={this.onEditDriver}>
                        {!this.state.editDriverMode ? "Edit Driver" : "Hide"}
                    </EditButton>
                    {this.state.editDriverMode ? <ManageDriverForm driverId={this.props.match.params.driver_id} mode={'edit'}/>  : driverDataToDisplay}
                </ComponentRestricted>
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        driver: state.drivers.find(driver => {
            return driver.id === props.match.params.driver_id
        }),
        teams: state.teams
    }
};


const DriverPageConnected = connect(mapStateToProps, null)(DriverPage);

export default DriverPageConnected;
