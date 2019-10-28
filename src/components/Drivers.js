import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {AddButton, AddButtonWrapper, ComponentRestricted} from "../sharedStyles";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import ManageDriverForm from "./ManageDriverForm";

const DriverButton = styled.button`
    margin: 0;
    padding: 30px;
    cursor: pointer;
    margin: 0 5px 5px 0;
`;

class Drivers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addDriverMode: false
        };
    }

    addDriver = () => {
        if (!this.state.addDriverMode) {
            this.setState({
                addDriverMode: true
            })
        }else {
            this.setState({
                addDriverMode: false
            })
        }
    };

    render() {
        const drivers = (
            this.props.drivers.map((driver, index) => {
                return (
                    <NavLink key={index} to={`/drivers/${driver.id}`}>
                        <DriverButton className="btn">{driver.name}</DriverButton>
                    </NavLink>
                )
            })
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <AddButtonWrapper>
                        <AddButton
                            className="btn btn-warning"
                            onClick={this.addDriver}>
                            {!this.state.addDriverMode ? "Add Driver" : "Hide"}
                        </AddButton>
                    </AddButtonWrapper>
                    {this.state.addDriverMode ? <ManageDriverForm mode={'add'}/> : ""}
                    {drivers}
                </ComponentRestricted>
            </>
        )
    }
}

const mapStateToProps = (state = {}) => {
    return {
        drivers: state.drivers
    }
};


const DriversConnected = connect(mapStateToProps, null)(Drivers);

export default DriversConnected;
