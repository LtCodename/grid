import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted} from "../sharedStyles";

class ConstructorsStandings extends React.Component {
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
                    <p>Constructors Standings</p>
                </ComponentRestricted>
            </>
        )
    }
}

export default ConstructorsStandings;
