import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted} from "../sharedStyles";

class Season2019 extends React.Component {
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
                    <p>Season 2019</p>
                </ComponentRestricted>
            </>
        )
    }
}

export default Season2019;
