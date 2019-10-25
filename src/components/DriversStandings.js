import React from 'react';
import NavigationPanel from "./NavigationPanel";

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
                <p>DriverStandings</p>
            </>
        )
    }
}

export default DriversStandings;
