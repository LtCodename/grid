import React from 'react';
import {ActionButton, Label, Select, SmallItem, Wrapper} from "../../SharedStyles";
import {connect} from "react-redux";

declare var firebase;

class AttachDrivers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            driverSelectMode: false,
            selectedDriver: ""
        };
    }

    inputValuesChange = (event) => {
        this.setState({
            selectedDriver: event.target.value
        }, () => {
            //console.log(this.state.selectedDriver);
        });
    };

    onAttachDriver = () => {
        if (!this.state.driverSelectMode) {
            this.setState({
                driverSelectMode: true
            })
        }else {
            this.setState({
                driverSelectMode: false
            })
        }
    };

    onAttachDriverConfirm = () => {
        if (!this.state.selectedDriver) {
            console.log("Nothing selected!")
            return;
        }

        const seasonDrivers = this.props.season.drivers || [];
        const driverToAdd = this.state.selectedDriver;
        const newDriversData = [...seasonDrivers, driverToAdd];
        //console.log(newDriversData);

        firebase.firestore().collection('seasons').doc(this.props.seasonId).update({
            'drivers': newDriversData
        }).then((data) => {
            console.log("Data updated successfully!");
        }).catch(error => {
            console.log(error.message);
        });
    };

    render() {

        const driversForOptions = this.props.drivers.filter((driver) => {
            return !this.props.season.drivers || this.props.season.drivers.indexOf(driver.id) === -1
        });

        const drivers = [{name: "Not selected", value: undefined}, ...driversForOptions].map((driver, index) => {
            return (
                <option key={index} value={driver.id}>{driver.name}</option>
            );
        });

        const attachForm = (
            <div>
                <Label htmlFor="driver">Select driver</Label>
                <Select
                    value={undefined}
                    id="driver"
                    className="custom-select"
                    onChange={this.inputValuesChange}>
                    {drivers}
                </Select>
                <Wrapper>
                    <ActionButton
                        className="btn btn-warning"
                        onClick={this.onAttachDriverConfirm}>
                        Attach driver
                    </ActionButton>
                </Wrapper>
            </div>
        );

        let seasonDrivers = "";
        if (this.props.season.drivers) {
            seasonDrivers = this.props.season.drivers.map((driver, index) => {
                return (
                    <span key={index}>
                        <SmallItem className="btn">{this.props.drivers.find(dr => dr.id === driver).name}</SmallItem>
                    </span>
                )
            })
        }

       return (
            <>
                <Wrapper>
                    <ActionButton
                        className="btn btn-warning"
                        onClick={this.onAttachDriver}>
                        {!this.state.driverSelectMode ? "Select driver" : "Hide"}
                    </ActionButton>
                </Wrapper>
                {this.state.driverSelectMode ? attachForm : ""}
                <Wrapper>
                    {seasonDrivers}
                </Wrapper>
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        drivers: state.drivers,
        season: state.seasons.find(season => {
            return season.id === props.seasonId
        })
    }
};

const AttachDriversConnected = connect(mapStateToProps, null)(AttachDrivers);

export default AttachDriversConnected;
