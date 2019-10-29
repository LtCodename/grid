import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ActionButton, ComponentRestricted, Item, Wrapper} from "../SharedStyles";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import ManageDriverForm from "./ManageDriverForm";

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
                        <Item className="btn">{driver.name}</Item>
                    </NavLink>
                )
            })
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <Wrapper>
                        <ActionButton
                            className="btn btn-warning"
                            onClick={this.addDriver}>
                            {!this.state.addDriverMode ? "Add Driver" : "Hide"}
                        </ActionButton>
                    </Wrapper>
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
