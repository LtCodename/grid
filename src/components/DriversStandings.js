import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted} from "../sharedStyles";

class DriversStandings extends React.Component {
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
                    <p>Driver Standings</p>
                </ComponentRestricted>
            </>
        )
    }
}

export default DriversStandings;
