import React from 'react';
import NavigationPanel from "./NavigationPanel";

class Teams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <>
                <NavigationPanel />
                <p>Teams</p>
            </>
        )
    }
}

export default Teams;
