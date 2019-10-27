import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted} from "../sharedStyles";

class Dashboard extends React.Component {
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
                    <p>Dashboard</p>
                </ComponentRestricted>
            </>
        )
    }
}

export default Dashboard;
