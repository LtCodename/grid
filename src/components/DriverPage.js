import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted, EditButton, InformationTable} from "../sharedStyles";
import {connect} from "react-redux";

class DriverPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editDriverMode: false
        };
    }

    render() {
        const driverDataToDisplay = (
            <InformationTable className="table">
                <tbody>
                <tr>
                    <th scope="row">Driver name</th>
                    <td className="makeItFlex">{this.props.driver['name']}</td>
                </tr>
                {/*<tr>
                    <th scope="row">Country</th>
                    <td className="makeItFlex">{this.props.team.country}</td>
                </tr>
                <tr>
                    <th scope="row">Debut year</th>
                    <td className="makeItFlex">{this.props.team['debut-year']}</td>
                </tr>
                <tr>
                    <th scope="row">Engine manufacturer</th>
                    <td className="makeItFlex">{this.props.team.engine}</td>
                </tr>
                <tr>
                    <th scope="row">Team principal</th>
                    <td className="makeItFlex">{this.props.team['team-principal']}</td>
                </tr>
                <tr>
                    <th scope="row">Constructors championships</th>
                    <td className="makeItFlex">{this.props.team['constructors-championships']}</td>
                </tr>
                <tr>
                    <th scope="row">Drivers championships</th>
                    <td className="makeItFlex">{this.props.team['drivers-championships']}</td>
                </tr>
                <tr>
                    <th scope="row">Wins</th>
                    <td className="makeItFlex">{this.props.team.wins}</td>
                </tr>
                <tr>
                    <th scope="row">Pole positions</th>
                    <td className="makeItFlex">{this.props.team.poles}</td>
                </tr>*/}
                </tbody>
            </InformationTable>
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <EditButton
                        className="btn btn-warning"
                        onClick={this.onEditTeam}>
                        {!this.state.editDriverMode ? "Edit Driver" : "Hide"}
                    </EditButton>
                    {this.state.editDriverMode ? "" : driverDataToDisplay}
                </ComponentRestricted>
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        driver: state.drivers.find(driver => {
            return driver.id === props.match.params.driver_id
        })
    }
};


const DriverPageConnected = connect(mapStateToProps, null)(DriverPage);

export default DriverPageConnected;
