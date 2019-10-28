import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted, EditButton, InformationTable} from "../sharedStyles";
import {connect} from "react-redux";
import ManageDriverForm from "./ManageDriverForm";
import DriverBlueprint from "../blueprints/DriverBlueprint";

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

        const tableRows = DriverBlueprint.map((elem, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{elem.name}</th>
                    <td>{this.props.driver[elem.db]}</td>
                </tr>
            )
        });

        const manualRows = (
            <>
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
            </>
        )

        const driverDataToDisplay = (
            <InformationTable className="table">
                <tbody>
                    {tableRows}
                    {manualRows}
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
