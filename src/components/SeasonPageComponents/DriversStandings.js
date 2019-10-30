import React from 'react';
import {connect} from "react-redux";
import {InformationTable} from "../../SharedStyles";

class DriversStandings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const tableRows = this.props.seasonDrivers.map((elem, index) => {
            let seasonDriver = this.props.drivers.find(driver => {
                return driver.id === elem;
            });

            return (
                <tr key={index}>
                    <td>{seasonDriver.name}</td>
                    <td>{'No data'}</td>
                </tr>
            )
        });

        const statistics = (
            <InformationTable className="table">
                <tbody>
                <tr>
                    <th>Driver</th>
                    <th>Points</th>
                </tr>
                {tableRows}
                </tbody>
            </InformationTable>
        );

        return (
            <>
                {statistics}
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        drivers: state.drivers
    }
};

const DriversStandingsConnected = connect(mapStateToProps, null)(DriversStandings);

export default DriversStandingsConnected;
