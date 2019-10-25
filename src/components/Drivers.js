import React from 'react';
import NavigationPanel from "./NavigationPanel";

class Drivers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <>
                <NavigationPanel />
                <p>Drivers</p>
            </>
        )
    }
}

export default Drivers;
