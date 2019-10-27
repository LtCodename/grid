import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted} from "../sharedStyles";

class Seasons extends React.Component {
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
                    <p>Seasons</p>
                </ComponentRestricted>
            </>
        )
    }
}

export default Seasons;
