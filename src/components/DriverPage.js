import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted} from "../sharedStyles";

class DriverPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <p>Driver Page</p>
                    <p>{this.props.match.params.driver_id}</p>
                </ComponentRestricted>
            </>
        )
    }
}

export default DriverPage;
