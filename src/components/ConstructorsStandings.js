import React from 'react';
import NavigationPanel from "./NavigationPanel";

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
                <p>ConstructorsStandings</p>
            </>
        )
    }
}

export default ConstructorsStandings;
