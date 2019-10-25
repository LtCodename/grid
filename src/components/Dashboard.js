import React from 'react';
import NavigationPanel from "./NavigationPanel";
/*import styled from "styled-components";

const NavBar = styled.nav`

`;*/

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
                <p>Dashboard</p>
            </>
        )
    }
}

export default Dashboard;
