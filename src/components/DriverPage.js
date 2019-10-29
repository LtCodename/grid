import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted, ActionButton, InformationTable} from "../SharedStyles";
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
        const tableRows = DriverBlueprint.map((elem, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{elem.name}</th>
                    <td>{this.props.driver[elem.db]}</td>
                </tr>
            )
        });

        const driverDataToDisplay = (
            <InformationTable className="table">
                <tbody>
                    {tableRows}
                </tbody>
            </InformationTable>
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <ActionButton
                        className="btn btn-warning"
                        onClick={this.onEditDriver}>
                        {!this.state.editDriverMode ? "Edit Driver" : "Hide"}
                    </ActionButton>
                    {this.state.editDriverMode ? <ManageDriverForm driverId={this.props.match.params.driver_id} mode={'edit'}/> : driverDataToDisplay}
                </ComponentRestricted>
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        driver: (() => {
            const driverFromStore = state.drivers.find(driver => driver.id === props.match.params.driver_id);
            const team = state.teams.find((team) => team.id === driverFromStore['team-id']);
            const date = new Date();
            const year = date.getFullYear();
            const age = year - driverFromStore['date-of-birth'];
            const inF1 = year - driverFromStore['debut'];

            return {
                ...driverFromStore,
                'team-name': team ? team.name : 'Not selected',
                age,
                inF1
            };
        })(),
        teams: state.teams
    }
};

const DriverPageConnected = connect(mapStateToProps, null)(DriverPage);

export default DriverPageConnected;
